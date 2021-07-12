/* eslint-disable */

const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = ({ stage, actions, getConfig }) => {
  actions.setWebpackConfig({
    plugins: [new LoadablePlugin()],
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, '../../components/'),
        '@icons': path.resolve(__dirname, '../../icons/'),
        '@styles': path.resolve(__dirname, '../../styles/'),
        '@utils': path.resolve(__dirname, '../../utils/'),
        '@types': path.resolve(__dirname, '../../types/')
      },
      extensions: ['.js', '.json', '.ts', '.tsx']
    }
  });
};
