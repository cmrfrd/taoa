/* eslint-disable */

module.exports = ({ babelrc }) => ({
  ...babelrc,
  ...{
    plugins: babelrc.plugins.concat(['transform-regenerator', 'transform-runtime']),
  },
});
