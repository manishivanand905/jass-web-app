import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useStaggerAnimation } from '../../../hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '../../../animations/variants';

const AnimatedContainer = ({ 
  threshold = 0.2,
  staggerDelay = 0.1,
  children,
  className = '',
  ...props 
}) => {
  const { ref, controls } = useStaggerAnimation(threshold, staggerDelay);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      className={className}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div variants={staggerItem} key={`item-${index}`}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

AnimatedContainer.propTypes = {
  threshold: PropTypes.number,
  staggerDelay: PropTypes.number,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default AnimatedContainer;
