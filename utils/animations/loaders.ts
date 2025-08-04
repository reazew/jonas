export const audioWaveform = {
  barAnimation: {
    animate: {
      height: [
        "20px",
        "60px", 
        "40px",
        "80px",
        "30px",
        "70px",
        "20px"
      ]
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  },
  
  container: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 }
  }
}

export const spinner = {
  animate: { rotate: 360 },
  transition: { 
    duration: 2, 
    repeat: Infinity, 
    ease: "linear" as const
  }
}

export const pulse = {
  animate: { 
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1]
  },
  transition: { 
    duration: 1.5, 
    repeat: Infinity,
    ease: "easeInOut" as const
  }
}

export const dots = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  },
  dot: {
    animate: {
      y: [0, -10, 0]
    },
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
} 