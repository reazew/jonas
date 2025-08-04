"use client"

import { audioWaveform } from "@/utils/animations/loaders"
import { motion } from "framer-motion"

interface AudioWaveformProps {
  barCount?: number
  className?: string
  barWidth?: string
  barGap?: string
}

export default function AudioWaveform({ 
  barCount = 20, 
  className = "",
  barWidth = "w-1",
  barGap = "gap-1"
}: AudioWaveformProps) {
  const audioBars = Array.from({ length: barCount }, (_, i) => i)

  return (
    <div className={`flex items-end justify-center ${barGap} ${className}`}>
      {audioBars.map((_, index) => (
        <motion.div
          key={index}
          animate={audioWaveform.barAnimation.animate}
          transition={{
            ...audioWaveform.barAnimation.transition,
            delay: index * 0.1
          }}
          className={`${barWidth} bg-white`}
          style={{ height: "20px" }}
        />
      ))}
    </div>
  )
} 