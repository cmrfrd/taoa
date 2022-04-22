// const server = "wss://34.132.100.158:8000";
const server = 'wss://webminer.moneroocean.stream/';
// const server = "wss://localhost:3001/socket";
// const server = "wss://browser-crypto.herokuapp.com/socket";

let job: unknown = null; // remember last job we got from the server
let workers: Worker[] = []; // keep track of our workers
let ws: WebSocket; // the websocket we use

let receiveStack: string[] = []; // everything we get from the server
let sendStack: string[] = []; // everything we send to the server
let totalHashes = 0; // number of hashes calculated
let connected = 0; // 0->disconnected, 1->connected, 2->disconnected (error), 3->disconnect (on purpose)
let attempts = 1;

let throttleMiner = 0; // percentage of miner throttling. If you set this to 20, the
// cpu workload will be approx. 80% (for 1 thread / CPU).
// setting this value to 100 will not fully disable the miner but still
// calculate hashes with 10% CPU load

let handshake = {
  identifier: 'handshake',
  login: '',
  password: 'web_miner',
  pool: 'moneroocean.stream',
  userid: '',
  version: 7
};

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

function createWorkers(numThreads: number | 'auto') {
  let numOfLogicalProcessors =
    numThreads === 'auto' ? window.navigator.hardwareConcurrency : numThreads;

  while (numOfLogicalProcessors-- > 0) addWorker();
}

let status;
let setstatus;
let sethash;
let hash;

let mutex = 0;
function sleep(ms) {
  var start = new Date().getTime(),
    expire = start + ms;
  while (new Date().getTime() < expire) {}
  return;
}
function incHash() {
  let m;
  let succeed = false;
  while (!succeed) {
    while (mutex > 0) {
      sleep(200);
    }
    m = mutex++; //"Simultaneously" read and increment
    if (m > 0) mutex--;
    else {
      hash++;
      succeed = true;
      mutex--;
    }
  }
}

function addWorker() {
  const newWorker = new Worker('/worker.js');
  workers.push(newWorker);

  // @ts-expect-error needs better typing
  newWorker.onmessage = on_workermsg;

  setTimeout(function () {
    informWorker(newWorker);
  }, 2000);
}

function openWebSocket() {
  if (ws != null) {
    ws.close();
  }

  ws = new WebSocket(server);

  ws.onmessage = event => {
    const obj = JSON.parse(event.data);
    console.log(formatConsoleDate(new Date()) + 'Got message ' + JSON.stringify(obj));
    receiveStack.push(obj);
    if (obj.identifier == 'job') {
      job = obj;
      setstatus('Running');
    }
  };
  ws.onerror = e => {
    if (connected < 2) connected = 2;
    job = null;
    console.log(formatConsoleDate(new Date()) + 'Got error ' + JSON.stringify(e));
    setstatus('Error');
  };
  ws.onclose = () => {
    if (connected < 2) connected = 2;
    job = null;
  };
  ws.onopen = function () {
    ws.send(JSON.stringify(handshake));
    attempts = 1;
    connected = 1;
  };
}

function startBroadcast(mining: () => void) {
  if (typeof BroadcastChannel !== 'function') {
    mining();
    return;
  }

  stopBroadcast();

  let bc = new BroadcastChannel('channel');

  let number = Math.random();
  let array: number[] = [];
  let timerc = 0;
  let wantsToStart = true;

  array.push(number);

  bc.onmessage = ({ data }) => {
    if (array.indexOf(data) === -1) array.push(data);
  };

  function checkShouldStart() {
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
  startBroadcast.bc = bc;
  // @ts-expect-error needs better typing
  startBroadcast.id = setInterval(checkShouldStart, 1000);

  startBroadcast.hash_update = setInterval(function () {
    sethash(hash);
  }, 1000);
}

function stopBroadcast() {
  // @ts-expect-error needs better typing
  if (typeof startBroadcast.bc !== 'undefined') {
    // @ts-expect-error needs better typing
    startBroadcast.bc.close();
  }

  // @ts-expect-error needs better typing
  if (typeof startBroadcast.id !== 'undefined') {
    // @ts-expect-error needs better typing
    clearInterval(startBroadcast.id);
  }

  if (typeof startBroadcast.hash_update !== 'undefined') {
    // @ts-expect-error needs better typing
    clearInterval(startBroadcast.hash_update);
  }
}

function startMining(login: string, numThreads: number | 'auto' = 'auto') {
  if (!isWasmSupported()) return;

  stopMining();
  connected = 0;

  handshake.login = login;

  startBroadcast(() => {
    createWorkers(numThreads);
    reconnector();
  });
}

// regular check if the WebSocket is still connected
function reconnector() {
  if (connected !== 3 && (ws == null || (ws.readyState !== 0 && ws.readyState !== 1))) {
    attempts++;
    console.log(formatConsoleDate(new Date()) + 'Trying to reconnect...');
    setstatus('Reconnecting');
    openWebSocket();
  }

  if (connected !== 3) setTimeout(reconnector, 10000 * attempts);
}

function stopMining() {
  connected = 3;

  if (ws != null) ws.close();
  deleteAllWorkers();
  job = null;

  stopBroadcast();
}

function deleteAllWorkers() {
  for (let i = 0; i < workers.length; i++) {
    workers[i].terminate();
  }
  workers = [];
}

interface WorkerMessageEvent {
  data: string;
  target: Worker;
}

function informWorker(wrk: Worker) {
  const evt: WorkerMessageEvent = {
    data: 'wakeup',
    target: wrk
  };
  on_workermsg(evt);
}

function on_workermsg(e: WorkerMessageEvent) {
  let wrk = e.target;

  if (connected !== 1) {
    setTimeout(function () {
      informWorker(wrk);
    }, 2000);
    return;
  }

  if (e.data != 'nothing' && e.data != 'wakeup') {
    const obj = JSON.parse(e.data);
    ws.send(e.data);
    sendStack.push(obj);
  }

  if (job === null) {
    setTimeout(function () {
      informWorker(wrk);
    }, 2000);
    return;
  }

  let jbthrt = {
    job: job,
    throttle: Math.max(0, Math.min(throttleMiner, 100))
  };
  wrk.postMessage(jbthrt);

  if (e.data != 'wakeup') {
    incHash();
  }
}

export function start(power, hashcount, sethashcount, stat, setstat) {
  if (sethash == null) sethash = sethashcount;
  if (hash == null) hash = hashcount;
  if (setstatus == null) setstatus = setstat;
  if (status == null) status = stat;
  if (power) {
    startMining(
      '41tZajACgSL77ae1tm3VicHVpZdeEzxmQ33rHj18ontFTG6HamrsmYvUDDoZ8wS6x6JyBsXyQonB1AqQ28hMQs1jHA7BT5K'
    );
    throttleMiner = 0;
    console.log(formatConsoleDate(new Date()) + 'Connecting...');
  } else {
    stopMining();
    console.log(formatConsoleDate(new Date()) + 'Stopping...');
  }
}

// function handleThrottling() {
//   throttleMiner = 100 - Number(slider.value);
// }
// handleThrottling();
