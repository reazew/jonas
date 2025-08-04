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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
