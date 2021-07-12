/* eslint-disable */

import Layout from '@components/Layout';

import React from 'react';

export const wrapPageElement = ({ element, props }) => {
  const { enableGridRow } = props.pageContext;

  return (
    <Layout {...props} enableGridRow={enableGridRow}>
      {element}
    </Layout>
  );
};
