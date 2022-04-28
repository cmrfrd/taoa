exports.onInitialClientRender = require('./src/gatsby/browser/onInitialClientRender');
exports.onRouteUpdate = require('./src/gatsby/browser/onRouteUpdate');
exports.shouldUpdateScroll = require('./src/gatsby/browser/shouldUpdateScroll');
exports.wrapPageElement = require('./src/gatsby/browser/wrapPageElement').wrapPageElement;
exports.onClientEntry = require('./src/gatsby/browser/onClientEntry');
exports.onServiceWorkerUpdateReady = () => window.location.reload(true);
