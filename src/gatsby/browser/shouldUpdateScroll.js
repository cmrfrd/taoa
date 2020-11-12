/* eslint-disable */

const { scrollTimeoutMilliseconds } = require('../../../gatsby-config').siteMetadata.transition;

module.exports = ({ routerProps, prevRouterProps, getSavedScrollPosition }) => {
  // By default, ensure every new navigation results in the position of the
  // next page being at position [0, 0]
  window.setTimeout(() => window.scroll({ top: 0, left: 0 }), scrollTimeoutMilliseconds);
  return false;
};
