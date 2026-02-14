import React from 'react';
import { motion } from 'motion/react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  staggerChildren?: boolean;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  direction = 'up',
  delay = 0,
  staggerChildren = false,
}) => {
  const getInitialState = () => {
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -30 };
      case 'right':
        return { opacity: 0, x: 30 };
      case 'up':
      default:
        return { opacity: 0, y: 30 };
    }
  };

  const container = staggerChildren ? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  } : undefined;

  const item = staggerChildren ? {
    hidden: getInitialState(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  } : undefined;

  return (
    <motion.div
      initial={staggerChildren ? 'hidden' : getInitialState()}
      whileInView={staggerChildren ? 'visible' : { opacity: 1, x: 0, y: 0 }}
      variants={staggerChildren ? container : undefined}
      transition={staggerChildren ? undefined : { duration: 0.5, ease: 'easeOut', delay }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {staggerChildren ? (
        <motion.div variants={container}>
          {React.Children.map(children, (child) => (
            <motion.div variants={item}>
              {child}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
};
