import { Semaphore } from './semaphore';

//
// Globals / Constants
//
const RETRIES: number = 15;
const INCHASHDELAY: number = 4;

export enum Status {
  error = 'error',
  running = 'running',
  offline = 'offline',
  reconnecting = 'reconnecting'
}

let specificStatusCodeMappings = {
  '1000': 'Normal Closure',
  '1001': 'Going Away',
  '1002': 'Protocol Error',
  '1003': 'Unsupported Data',
  '1004': '(For future)',
  '1005': 'No Status Received',
  '1006': 'Abnormal Closure',
  '1007': 'Invalid frame payload data',
  '1008': 'Policy Violation',
  '1009': 'Message too big',
  '1010': 'Missing Extension',
  '1011': 'Internal Error',
  '1012': 'Service Restart',
  '1013': 'Try Again Later',
  '1014': 'Bad Gateway',
  '1015': 'TLS Handshake'
};

// Define the handshake setup with the mining pool
let handshake = {
  identifier: 'handshake',
  login: '',
  password: 'taoa',
  pool: 'moneroocean.stream',
  userid: '',
  version: 7
};

// Identify possible servers to connect too
const servers = {
  dev: ['wss://localhost:8443', 'wss://webminer.moneroocean.stream/', 'wss://mine-proxy.taoa.io'],
  prod: ['wss://webminer.moneroocean.stream/', 'wss://mine-proxy.taoa.io']
};

//
// Utilities
//
function getStatusCodeString(code) {
  if (typeof specificStatusCodeMappings[code] !== 'undefined') {
    return specificStatusCodeMappings[code];
  }
  return '(Unknown)';
}

// sleep until ms
function sleep_sync(ms: number) {
  var start = new Date().getTime(),
    expire = start + ms;
  while (new Date().getTime() < expire) {}
  return;
}

// Checks if a websocket to a url can be instantiated
async function testConnection(url: string): Promise<boolean> {
  return await new Promise(function (resolve, reject) {
    var server = new WebSocket(url);
    server.onopen = function () {
      resolve(true);
    };
    server.onerror = function () {
      reject(false);
    };
  });
}

// Log everything with time
const log = function () {
  var first_parameter = arguments[0];
  var other_parameters = Array.prototype.slice.call(arguments, 1);

  function formatConsoleDate(date) {
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();

    return (
      '[' +
      (hour < 10 ? '0' + hour : hour) +
      ':' +
      (minutes < 10 ? '0' + minutes : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds) +
      '.' +
      ('00' + milliseconds).slice(-3) +
      '] '
    );
  }
  console.log.apply(
    console,
    [formatConsoleDate(new Date()) + first_parameter].concat(other_parameters)
  );
};

// Function to determine if wasm is supported in browser
function isWasmSupported() {
  try {
    if (typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function') {
      const module = new WebAssembly.Module(
        Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00)
      );
      if (module instanceof WebAssembly.Module)
        return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
    }
  } catch (e) {}
  return false;
}

interface WorkerMessageEvent {
  data: string;
  target: Worker;
}

export class TAOABrowserMiner {
  // funcs to set/get status
  private _setStatus: any;
  private _setHashes: any;

  private _retries: number = RETRIES;
  private _hashes: number = 0;
  private _hashesSemaphore: Semaphore = new Semaphore('_', 1);
  private _job: unknown = null; // remember last job we got from the server
  private _workers: Worker[] = []; // keep track of our workers

  public timeStarted: number = Date.now();
  private _running: boolean;
  private _env: string;
  private _address: string;
  private _threads: number | 'auto';
  private ws: WebSocket;

  private mutex = 0;

  constructor(
    env: string,
    address: string,
    setStatus: any,
    setHashes: any,
    threads: number | 'auto' = 'auto'
  ) {
    if (env == null) throw new Error('No env specified');
    this._env = env;
    if (address == null) throw new Error('No address specified');
    this._address = address;
    if (threads == null) throw new Error('No threads specified');
    this._threads = threads;
    if (setStatus == null) throw new Error('No setStatus specified');
    this._setStatus = setStatus;
    if (setHashes == null) throw new Error('No setHashes specified');
    this._setHashes = setHashes;
  }

  private getStatus(): string {
    let s: string;
    this._setStatus(prev => {
      s = prev;
      return prev;
    });
    return s;
  }

  private async incHashes(n: number) {
    const lock = await this._hashesSemaphore.acquire();
    this._hashes += n;
    lock.release();
  }

  // Connect to the centralized mining pool
  // test all available server options
  // setup socket hooks
  private async makeWebSocket() {
    if (this.ws != null) {
      this.ws.close();
    }

    log('Creating websocket for env: ', this._env);
    this.ws = await (async () => {
      for (var s of servers[this._env]) {
        log('Trying to connect to: ', s);
        try {
          if (await testConnection(s)) {
            log('Connection tested');
            return new WebSocket(s);
          }
          sleep_sync(1000);
        } catch (e) {}
      }
    })();

    if (typeof this.ws == 'undefined' || this.ws == null) {
      log('Error: websocket not created, exiting ...');
      this._setStatus(Status.error);
      return;
    }
    log('Got sock, starting mining ...');

    // When we get a message from the pool
    //
    this.ws.onmessage = event => {
      const obj = JSON.parse(event.data);
      if (obj.identifier == 'job') {
        log('Mining on variant ', obj.variant);
        this._job = obj;
        this._setStatus(Status.running);
      }
    };

    this.ws.onerror = e => {
      this._job = null;
      this._setStatus(Status.error);
    };

    this.ws.onclose = e => {
      log('Closing: ', getStatusCodeString(e.code));
      this._job = null;
    };

    const minerRef = this;
    this.ws.onopen = function () {
      log('Sending handshake');

      // 'this' references the websocket
      this.send(JSON.stringify({ ...handshake, login: minerRef._address }));
    };
  }

  private updateRunning() {
    this._setStatus(s => {
      switch (s) {
        case Status.offline:
          this._running = false;
      }
    });
  }

  private async reconnect(retries: number) {
    if (retries == 0) {
      this._setStatus(Status.error);
      log(`Unable to connect to any server`);
      return;
    }
    // this.updateRunning();

    // If we haven't stopped the miner and websocket
    // has disconnected, reconnect
    if (
      retries > 0 &&
      this._running != false &&
      (this.ws == null || (this.ws.readyState !== 0 && this.ws.readyState !== 1))
    ) {
      log(`Status: ${this._running} | Trying to reconnect... ${retries} left`);
      this._setStatus('Reconnecting');
      await this.makeWebSocket();
      retries--;
    }

    // If all is well, call again in 3 seconds
    if (this._running) setTimeout(() => this.reconnect(retries), 3000);
  }

  private createWorkers(threads: number | 'auto') {
    let numOfLogicalProcessors =
      threads === 'auto' ? window.navigator.hardwareConcurrency : threads;

    var _onWorkerMessage = (e: WorkerMessageEvent) => {
      let wrk = e.target;

      if (this.getStatus() !== Status.running) {
        setTimeout(function () {
          _informWorker(wrk);
        }, 2000);
        return;
      }

      if (e.data != 'nothing' && e.data != 'wakeup') {
        // const obj = JSON.parse(e.data);
        this.ws.send(e.data);
        // sendStack.push(obj);
      }

      if (this._job === null) {
        setTimeout(function () {
          _informWorker(wrk);
        }, 2000);
        return;
      }

      let jbthrt = {
        job: this._job,
        throttle: 0 // Math.max(0, Math.min(throttleMiner, 100))
      };
      wrk.postMessage(jbthrt);

      // Count hashes, but update on an interval triggered by hash completions
      if (e.data != 'wakeup') {
        if (wrk.update == null) wrk.update = Date.now();
        if (wrk.hashes == null) wrk.hashes = 0;
        wrk.hashes++;

        if (Date.now() - wrk.update > INCHASHDELAY) {
          this.incHashes(wrk.hashes).then();
          wrk.hashes = 0;
        }
      }
    };

    const _informWorker = (wrk: Worker) => {
      const evt: WorkerMessageEvent = {
        data: 'wakeup',
        target: wrk
      };
      wrk.onmessage(evt);
    };

    var newWorker;
    var workerNum: number = 0;
    while (numOfLogicalProcessors-- > 0) {
      log('Creating worker ', workerNum);
      newWorker = new Worker('/worker.js');
      this._workers.push(newWorker);
      newWorker.onmessage = _onWorkerMessage;

      setTimeout(function () {
        _informWorker(newWorker);
      }, 2000);

      workerNum++;
    }
  }

  // Start the miner
  private async start() {
    this.timeStarted = Date.now();
    await this.stop();
    this._retries = RETRIES;
    this._running = true;
    await this.startBroadcast(async () => {
      this.createWorkers(this._threads);
      await this.reconnect(this._retries);
    });
  }

  // Stop
  private async stop() {
    this._running = false;
    this._setStatus(Status.offline);
    if (this.ws != null) this.ws.close();
    for (let i = 0; i < this._workers.length; i++) {
      this._workers[i].terminate();
    }
    this._workers = [];
    this._job = null;

    this.stopBroadcast();
  }

  // Run the miner based on "on"
  public async run(on: boolean) {
    if (!isWasmSupported()) throw new Error('WASM not supported, exiting ...');

    if (on) {
      await this.start();
    } else {
      await this.stop();
    }
  }

  private async startBroadcast(mining: () => void) {
    if (typeof BroadcastChannel !== 'function') {
      mining();
      return;
    }

    this.stopBroadcast();

    let bc = new BroadcastChannel('channel');

    let number = Math.random();
    let array: number[] = [];
    let timerc = 0;
    let wantsToStart = true;

    array.push(number);

    bc.onmessage = ({ data }) => {
      if (array.indexOf(data) === -1) array.push(data);
    };

    function _checkShouldStart() {
      bc.postMessage(number);

      timerc++;

      if (timerc % 2 === 0) {
        array.sort();

        if (array[0] === number && wantsToStart) {
          mining();
          wantsToStart = false;
          number = 0;
        }

        array = [];
        array.push(number);
      }
    }

    // @ts-expect-error needs better typing
    this.startBroadcast.bc = bc;
    // @ts-expect-error needs better typing
    this.startBroadcast.id = setInterval(_checkShouldStart, 1000);

    const minerRef = this;
    this.startBroadcast.hash_update = setInterval(function () {
      minerRef._setHashes(minerRef._hashes);
    }, 1500);
  }

  private stopBroadcast() {
    // @ts-expect-error needs better typing
    if (typeof this.startBroadcast.bc !== 'undefined') {
      // @ts-expect-error needs better typing
      this.startBroadcast.bc.close();
    }

    // @ts-expect-error needs better typing
    if (typeof this.startBroadcast.id !== 'undefined') {
      // @ts-expect-error needs better typing
      clearInterval(this.startBroadcast.id);
    }

    if (typeof this.startBroadcast.hash_update !== 'undefined') {
      // @ts-expect-error needs better typing
      clearInterval(this.startBroadcast.hash_update);
    }
  }
}
