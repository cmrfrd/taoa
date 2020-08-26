/* eslint-disable */

import Layout from '@components/Layout';

import { motion, AnimatePresence } from 'framer-motion';
import { TransitionProvider, TransitionViews } from 'gatsby-plugin-transitions';
import React from 'react';

const { animationDurationSeconds } = require('../../../gatsby-config').siteMetadata.transition;

// configuration for framer motion components
const variants = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 1,
    transition: {
      duration: animationDurationSeconds
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: animationDurationSeconds }
  }
};

/**
 * Component to animate the fade in and fade out
 * of non layout components
 */
const FadeTransitionLayout = ({ children, location, ...props }) => {
  const { enableGridRow } = props.pageContext;

  return (
    <>
      <Layout location={location} enableGridRow={enableGridRow}>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={location.pathname}
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Layout>
    </>
  );
};

export const wrapPageElement = ({ element, props }): React.ReactNode => {
  return <FadeTransitionLayout {...props}>{element}</FadeTransitionLayout>;
};
