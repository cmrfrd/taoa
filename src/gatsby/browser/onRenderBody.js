const React = require('react');

const preBody = [
  <noscript>
    <img
      src="/please-enable-javascript.gif"
      alt="please enable javascript"
      style={{
        position: 'relative',
        zIndex: 9999
      }}
    />
  </noscript>
];

// setPreBodyComponents
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(preBody);
};
