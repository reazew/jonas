"use client"

import AnimatedBackground from "@/components/animations/AnimatedBackground"
import AnimatedElement from "@/components/animations/AnimatedElement"
import AnimatedText from "@/components/animations/AnimatedText"
import Button from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

interface PreloaderProps {
  onComplete: () => void
}

const CodeTerminal = ({ className = "" }: { className?: string }) => {
  const [currentCommand, setCurrentCommand] = useState(0)
  const [typingText, setTypingText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showTypedCommand, setShowTypedCommand] = useState(false)

  const commands = [
    "npm run dev",
    "> jonas@0.1.0 dev",
    "> next dev",
    "▲ Next.js 15.4.5",
    "- Local:        http://localhost:3000",
    "- Network:      http://26.92.74.103:3000",
    "✓ Starting...",
    "✓ Ready in 7s"
  ]

  useEffect(() => {
    const typeCommand = (command: string) => {
      setIsTyping(true)
      setTypingText("")
      
      let index = 0
      const typeInterval = setInterval(() => {
        if (index < command.length) {
          setTypingText(command.substring(0, index + 1))
          index++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
          setShowTypedCommand(true)
          
          setTimeout(() => {
            setCurrentCommand(prev => prev + 1)
          }, 800)
        }
      }, 80)
    }

    if (currentCommand < commands.length) {
      typeCommand(commands[currentCommand])
    }
  }, [currentCommand])

  return (
    <div className={`${className}`}>
      <svg
        width="600"
        height="450"
        viewBox="0 0 600 450"
        className="w-full h-auto"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect
          x="10"
          y="10"
          width="580"
          height="430"
          rx="8"
          fill="#000000"
          stroke="#ffffff"
          strokeWidth="2"
          filter="url(#glow)"
        />
        
        <rect
          x="15"
          y="15"
          width="570"
          height="35"
          rx="4"
          fill="#1a1a1a"
          stroke="#ffffff"
          strokeWidth="1"
        />
        
        <circle cx="22" cy="37" r="3" fill="#ff0000" />
        <circle cx="30" cy="37" r="3" fill="#ffff00" />
        <circle cx="38" cy="37" r="3" fill="#00ff00" />
        
        <text x="50" y="45" fill="#ffffff" fontSize="16" fontFamily="monospace">
          Terminal - jonas-messias
        </text>
        
        <rect
          x="20"
          y="60"
          width="560"
          height="370"
          fill="#000000"
          stroke="#333333"
          strokeWidth="1"
        />
        
        <text x="25" y="85" fill="#ffffff" fontSize="14" fontFamily="monospace">
          jonas on main via v.22.11.0
        </text>
        
        {!showTypedCommand ? (
          <text x="25" y="115" fill="#ffffff" fontSize="14" fontFamily="monospace">
            {typingText}
            {isTyping && (
              <motion.rect
                x={25 + (typingText.length * 8.5)}
                y="105"
                width="3"
                height="18"
                fill="#ffffff"
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </text>
        ) : (
          <text x="25" y="115" fill="#ffffff" fontSize="14" fontFamily="monospace">
            npm run dev
          </text>
        )}
        
        {currentCommand >= 1 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            x="25"
            y="145"
            fill="#ffffff"
            fontSize="14"
            fontFamily="monospace"
          >
            &gt; jonas@0.1.0 dev
          </motion.text>
        )}
        
        {currentCommand >= 2 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            x="25"
            y="175"
            fill="#ffffff"
            fontSize="14"
            fontFamily="monospace"
          >
            &gt; next dev
          </motion.text>
        )}
        
        {currentCommand >= 3 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            x="25"
            y="205"
            fill="#ffffff"
            fontSize="14"
            fontFamily="monospace"
          >
            ▲ Next.js 15.4.5
          </motion.text>
        )}
        
        {currentCommand >= 4 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            x="25"
            y="235"
            fill="#ffffff"
            fontSize="14"
            fontFamily="monospace"
          >
            - Local:        http://localhost:3000
          </motion.text>
        )}
        
        {currentCommand >= 5 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            x="25"
            y="265"
            fill="#ffffff"
            fontSize="14"
            fontFamily="monospace"
          >
            - Network:      http://26.92.74.103:3000
          </motion.text>
        )}
        
        {currentCommand >= 6 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            x="25"
            y="295"
            fill="#00ff00"
            fontSize="14"
            fontFamily="monospace"
          >
            ✓ Starting...
          </motion.text>
        )}
        
        {currentCommand >= 7 && (
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            x="25"
            y="325"
            fill="#00ff00"
            fontSize="14"
            fontFamily="monospace"
          >
            ✓ Ready in 7s
          </motion.text>
        )}
      </svg>
    </div>
  )
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setShowModal(true)
    }, 10000)

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
            <CodeTerminal className="mb-8" />
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
                staggerDelay={0.05}
              >
                Bem-vindo ao meu portfólio!
              </AnimatedText>
            </AnimatedElement>
            
            <AnimatedElement variant="fadeInUp" delay={0.4}>
              <AnimatedText 
                variant="slideUp"
                className="text-gray-600 mb-8 text-lg"
                staggerDelay={0.02}
              >
                Aqui você encontrará meus projetos, habilidades e experiências como desenvolvedor Full Stack.
              </AnimatedText>
            </AnimatedElement>
            
            <AnimatedElement variant="fadeInUp" delay={0.6}>
              <div className="space-y-3 text-sm text-gray-500 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-black"></div>
                  <span>Projetos interativos com animações</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-black"></div>
                  <span>Tecnologias modernas (React, Next.js, TypeScript)</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-black"></div>
                  <span>Experiência em desenvolvimento</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="flex items-center gap-2 ml-4"
                >
                  <div className="w-2 h-2 bg-black"></div>
                  <span>Full Stack</span>
                </motion.div>
              </div>
            </AnimatedElement>
            
            <AnimatedElement variant="fadeInUp" delay={1.6}>
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