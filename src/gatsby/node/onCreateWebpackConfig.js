/* eslint-disable */

const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
// const DynamicImportPlugin = require('babel-plugin-dynamic-import-node');

module.exports = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [new MonacoWebpackPlugin()],
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
