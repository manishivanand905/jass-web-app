// Animation variants for entrance effects

export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 80 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const fadeInDown = {
  hidden: { 
    opacity: 0, 
    y: -60 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const fadeInLeft = {
  hidden: { 
    opacity: 0, 
    x: -80 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const fadeInRight = {
  hidden: { 
    opacity: 0, 
    x: 80 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const floatIn = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const slideInUp = {
  hidden: { 
    opacity: 0, 
    y: 100 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const rotateIn = {
  hidden: { 
    opacity: 0, 
    rotate: -10,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export const staggerItem = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Continuous floating animation
export const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Pulse animation
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Bounce animation
export const bounceIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.3 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

// Blur in animation
export const blurIn = {
  hidden: { 
    opacity: 0, 
    filter: "blur(10px)" 
  },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Card flip animation
export const flipIn = {
  hidden: { 
    opacity: 0, 
    rotateY: -90 
  },
  visible: { 
    opacity: 1, 
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Expand animation
export const expandIn = {
  hidden: { 
    opacity: 0, 
    scaleX: 0 
  },
  visible: { 
    opacity: 1, 
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Zoom in animation
export const zoomIn = {
  hidden: { 
    opacity: 0, 
    scale: 0 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Slide and fade
export const slideAndFade = {
  hidden: { 
    opacity: 0, 
    x: -100,
    y: 50
  },
  visible: { 
    opacity: 1, 
    x: 0,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Page transition
export const pageTransition = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Viewport animation settings
export const viewportSettings = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -100px 0px"
};

export const viewportSettingsPartial = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -50px 0px"
};
