/* eslint-disable */

module.exports = ({ config, stage }) => {
  if (stage === 'build-javascript') {
    config._config.entry.app = ['babel-polyfill', config._config.entry.app];
  }
  return config;
};
