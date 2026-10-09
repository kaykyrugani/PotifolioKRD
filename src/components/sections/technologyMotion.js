export const revealViewport = { once: true, amount: 0.28 };

export const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: index * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const tagReveal = {
  hidden: { opacity: 0, y: 10 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.46,
      delay: 0.18 + index * 0.045,
      ease: 'easeOut',
    },
  }),
};

export const flowStepReveal = {
  hidden: { opacity: 0.42, y: 12 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.16 + index * 0.12,
      ease: 'easeOut',
    },
  }),
};

export const barReveal = {
  hidden: { scaleX: 0 },
  visible: (index = 0) => ({
    scaleX: 1,
    transition: {
      duration: 0.8,
      delay: 0.18 + index * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const verticalReveal = {
  hidden: { scaleY: 0 },
  visible: (index = 0) => ({
    scaleY: 1,
    transition: {
      duration: 0.9,
      delay: 0.16 + index * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};
