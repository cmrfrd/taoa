import { Icon } from '@types';

import React from 'react';

const ShellIcon: React.FC<Icon> = ({ fill, invFill }: Icon) => (
  <svg height="24" version="1.1" width="24">
    <g transform="translate(0 -1028.4)">
      <path
        d="m3 1030.4c-1.1046 0-2 0.9-2 2v7 2 7c0 1.1 0.8954 2 2 2h9 9c1.105 0 2-0.9 2-2v-7-2-7c0-1.1-0.895-2-2-2h-9-9z"
        fill={fill}
      />
      <path d="m3 1049.4c-1.1046 0-2-0.9-2-2v-7-2-3h22v3 2 7c0 1.1-0.895 2-2 2h-9-9z" fill={fill} />
      <path d="m4 1032.9v1.1l2 2.4-2 2.3v1.1l3-3.4-3-3.5z" fill={invFill} />
      <path
        d="m4 5.125v1.125l3 1.75-3 1.75v1.125l5-2.875-5-2.875zm5 4.875v1h5v-1h-5z"
        fill={invFill}
        transform="translate(0 1028.4)"
      />
    </g>
  </svg>
);

export default ShellIcon;
