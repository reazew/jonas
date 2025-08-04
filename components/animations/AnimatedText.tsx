"use client"

import { motion } from "framer-motion"

interface AnimatedTextProps {
  children: string
  className?: string
  delay?: number
  staggerDelay?: number
  variant?: "typewriter" | "fadeIn" | "slideUp"
}

export default function AnimatedText({ 
  children, 
  className = "",
  delay = 0,
  staggerDelay = 0.05,
  variant = "typewriter"
}: AnimatedTextProps) {
  const characters = children.split("")

  const variants = {
    typewriter: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 }
    }
  }

  const selectedVariant = variants[variant]

  return (
    <div className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={selectedVariant.initial}
          animate={selectedVariant.animate}
          exit={selectedVariant.exit}
          transition={{
            duration: 0.3,
            delay: delay + (index * staggerDelay),
            ease: "easeOut"
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  )
} 