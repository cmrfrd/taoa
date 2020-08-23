/* eslint-disable */

import Layout from '@components/Layout';

import { TransitionProvider, TransitionViews } from 'gatsby-plugin-transitions';
import React from 'react';

const timeout = 200;

const FadeTransitionLayout = ({ children, location, ...props }) => {
  const { enableGridRow } = props.pageContext;

  return (
    <Layout location={location} enableGridRow={enableGridRow} gradient={true}>
      <TransitionProvider
        location={location}
        mode="successive"
        enter={{
          opacity: 0,
          config: {
            duration: 300
          }
        }}
        usual={{
          opacity: 1,
          config: {
            duration: timeout
          }
        }}
        leave={{
          opacity: 0,
          config: {
            duration: timeout
          }
        }}
        y={(): void => window.scrollY}
      >
        <TransitionViews>{children}</TransitionViews>
      </TransitionProvider>
    </Layout>
  );
};

export const wrapPageElement = ({ element, props }): React.ReactNode => {
  return <FadeTransitionLayout {...props}>{element}</FadeTransitionLayout>;
};
