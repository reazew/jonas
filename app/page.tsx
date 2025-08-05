"use client"

import { Header } from "@/components/globals/header"
import Line from "@/components/globals/line"
import Preloader from "@/components/globals/preloader"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Home() {
  const [showContent, setShowContent] = useState(false)

  const handlePreloaderComplete = () => {
    setShowContent(true)
  }

  return (
    <>
      {!showContent && <Preloader onComplete={handlePreloaderComplete} />}
      
      {showContent && (
        <motion.main
          initial={{ 
            opacity: 0,
            scale: 0.8,
            z: 100
          }}
          animate={{ 
            opacity: 1,
            scale: 1,
            z: 100
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="min-h-screen bg-black fixed inset-0 z-50"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px"
          }}
        >
          <Header />
          <div className="flex flex-col gap-4">
            <Line audioSrc="/sounds/3-oct-e.wav" />
          </div>
        </motion.main>
      )}
    </>
  )
}
