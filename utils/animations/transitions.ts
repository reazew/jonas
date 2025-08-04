export const transitions = {
  fast: {
    duration: 0.2,
    ease: "easeInOut" as const
  },
  normal: {
    duration: 0.4,
    ease: "easeInOut" as const
  },
  slow: {
    duration: 0.8,
    ease: "easeInOut" as const
  },
  spring: {
    type: "spring",
    damping: 25,
    stiffness: 300
  },
  bounce: {
    type: "spring",
    damping: 15,
    stiffness: 400
  },
  elastic: {
    type: "spring",
    damping: 10,
    stiffness: 200
  }
}

export const delays = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.4,
  extra: 0.6
} 