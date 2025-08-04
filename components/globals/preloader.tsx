"use client"

import AnimatedBackground from "@/components/animations/AnimatedBackground"
import AnimatedElement from "@/components/animations/AnimatedElement"
import AnimatedText from "@/components/animations/AnimatedText"
import AudioWaveform from "@/components/animations/AudioWaveform"
import Button from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setShowModal(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleModalClose = () => {
    setShowModal(false)
    setTimeout(() => {
      onComplete()
    }, 500)
  }

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <AnimatedBackground />
          
          <AnimatedElement variant="scaleIn" className="text-center relative z-10">
            <AudioWaveform className="mb-8" />
            
            <AnimatedElement variant="fadeInUp" delay={0.3}>
              <h1 className="text-white text-2xl font-bold mb-2">
                Jonas Messias
              </h1>
            </AnimatedElement>
            
            <AnimatedElement variant="fadeInUp" delay={0.6}>
              <p className="text-gray-400">
                Full Stack Developer
              </p>
            </AnimatedElement>
          </AnimatedElement>
        </motion.div>
      )}

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={handleModalClose}
        >
          <AnimatedBackground />
          
          <AnimatedElement 
            variant="bounceIn" 
            className="bg-white p-8 max-w-lg w-full text-center border-2 border-black relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatedElement variant="fadeInUp" delay={0.2}>
              <AnimatedText 
                variant="typewriter"
                className="text-3xl font-bold mb-6 text-black"
                staggerDelay={0.1}
              >
                Bem-vindo ao meu portfólio!
              </AnimatedText>
            </AnimatedElement>
            
            <AnimatedElement variant="fadeInUp" delay={0.8}>
              <AnimatedText 
                variant="slideUp"
                className="text-gray-600 mb-8 text-lg"
                staggerDelay={0.03}
              >
                Aqui você encontrará meus projetos, habilidades e experiências como desenvolvedor Full Stack.
              </AnimatedText>
            </AnimatedElement>
            
            <AnimatedElement variant="fadeInUp" delay={1.2}>
              <div className="space-y-3 text-sm text-gray-500 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-black"></div>
                  <span>Projetos interativos com animações</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-black"></div>
                  <span>Tecnologias modernas (React, Next.js, TypeScript)</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-black"></div>
                  <span>Experiência em desenvolvimento Full Stack</span>
                </motion.div>
              </div>
            </AnimatedElement>
            
            <AnimatedElement variant="fadeInUp" delay={2.0}>
              <Button
                onClick={handleModalClose}
                variant="default"
                size="lg"
                className="w-full"
              >
                Começar
              </Button>
            </AnimatedElement>
          </AnimatedElement>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 