import { motion, AnimatePresence, AnimatePresenceProps, MotionProps } from 'framer-motion';
import React from 'react';

const variants = (duration: number): any => ({
  initial: {
    zIndex: 1,
    opacity: 0
  },
  enter: {
    opacity: 1,
    zIndex: 1,
    transition: {
      duration: duration
    }
  },
  exit: {
    opacity: 0,
    zIndex: 1,
    transition: { duration: duration }
  }
});

interface IFadeTransitionProps {
  animatePresenceProps?: AnimatePresenceProps;
  motionProps?: MotionProps;
  duration: number;
  motionKey: string | number;
  children: React.ReactNode;
}

const FadeTransition: React.FC<IFadeTransitionProps> = ({
  children,
  animatePresenceProps,
  motionProps,
  motionKey,
  duration
}: IFadeTransitionProps) => {
  console.log(animatePresenceProps, motionKey);
  return (
    <AnimatePresence {...animatePresenceProps}>
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants(duration)}
        key={motionKey}
        {...motionProps}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FadeTransition;
