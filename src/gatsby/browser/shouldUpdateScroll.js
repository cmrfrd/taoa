/* eslint-disable */

const { scrollTimeoutMilliseconds } = require('../../../gatsby-config').siteMetadata.transition;

module.exports = ({ routerProps, prevRouterProps, getSavedScrollPosition }) => {
  // This condition is a small micro interaction that will smooth scroll the
  // page to the top to [0, 0] when a user clicks on a link to the same page
  // they are currently on
  if (typeof prevRouterProps !== 'undefined') {
    if (routerProps.location.pathname === prevRouterProps.location.pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  // By default, ensure every new navigation results in the position of the
  // next page being at position [0, 0]
  window.setTimeout(() => window.scroll({ top: 0, left: 0 }), scrollTimeoutMilliseconds);
  return false;
};
