import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  floatIn,
  scaleIn,
  slideInUp,
  rotateIn,
  blurIn,
  zoomIn
} from '../../../animations/variants';

const AnimatedSection = ({ 
  animation = 'fadeInUp', 
  threshold = 0.2, 
  delay = 0,
  children,
  className = '',
  ...props 
}) => {
  const { ref, controls } = useScrollAnimation(threshold);

  const animationVariants = {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    floatIn,
    scaleIn,
    slideInUp,
    rotateIn,
    blurIn,
    zoomIn
  };

  const selectedVariant = animationVariants[animation] || fadeInUp;

  const variantWithDelay = delay > 0 ? {
    ...selectedVariant,
    visible: {
      ...selectedVariant.visible,
      transition: {
        ...selectedVariant.visible.transition,
        delay
      }
    }
  } : selectedVariant;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variantWithDelay}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

AnimatedSection.propTypes = {
  animation: PropTypes.string,
  threshold: PropTypes.number,
  delay: PropTypes.number,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default AnimatedSection;
