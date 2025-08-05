"use client"

import { HTMLMotionProps, motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedElementProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  variant?: "fadeIn" | "fadeInUp" | "fadeInDown" | "scaleIn" | "slideInLeft" | "slideInRight" | "bounceIn"
  delay?: number
  duration?: number
  className?: string
}

export default function AnimatedElement({ 
  children, 
  variant = "fadeIn", 
  delay = 0,
  duration,
  className = "",
  ...props 
}: AnimatedElementProps) {
  const variants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 }
    },
    fadeInDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    scaleIn: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 }
    },
    slideInLeft: {
      initial: { x: -50, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -50, opacity: 0 }
    },
    slideInRight: {
      initial: { x: 50, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 50, opacity: 0 }
    },
    bounceIn: {
      initial: { scale: 0.3, opacity: 0 },
      animate: { 
        scale: 1, 
        opacity: 1,
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 300
        }
      },
      exit: { scale: 0.3, opacity: 0 }
    }
  }

  const selectedVariant = variants[variant]

  return (
    <motion.div
      variants={selectedVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: duration || 0.4,
        delay,
        ease: "easeInOut" as const
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
} 