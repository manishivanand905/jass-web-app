import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Custom hook for scroll-based animations
 * @param {number} threshold - Percentage of element visible before triggering (0-1)
 * @param {boolean} triggerOnce - Whether animation should trigger only once
 * @returns {object} - { ref, controls, inView }
 */
export const useScrollAnimation = (threshold = 0.2, triggerOnce = true) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!triggerOnce) {
      controls.start('hidden');
    }
  }, [controls, inView, triggerOnce]);

  return { ref, controls, inView };
};

/**
 * Hook for staggered children animations
 * @param {number} threshold - Visibility threshold
 * @param {number} staggerDelay - Delay between each child animation
 * @returns {object} - { ref, controls, inView }
 */
export const useStaggerAnimation = (threshold = 0.2, staggerDelay = 0.1) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return { ref, controls, inView, staggerDelay };
};

/**
 * Hook for delayed animation
 * @param {number} delay - Delay in seconds before animation starts
 * @param {number} threshold - Visibility threshold
 * @returns {object} - { ref, controls, inView }
 */
export const useDelayedAnimation = (delay = 0.3, threshold = 0.2) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        controls.start('visible');
      }, delay * 1000);
    }
  }, [controls, inView, delay]);

  return { ref, controls, inView };
};

/**
 * Hook for continuous animations (floating, pulsing, etc.)
 * @returns {object} - { controls }
 */
export const useContinuousAnimation = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('animate');
  }, [controls]);

  return { controls };
};
