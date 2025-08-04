"use client"

import {
  AngularIcon,
  JavaIcon,
  JsIcon,
  MySQLIcon,
  NextIcon,
  PHPIcon,
  PostgreSQLIcon,
  ReactIcon,
  TypeScriptIcon
} from "@/components/globals/icons"
import { useEffect, useRef, useState } from "react"

interface AnimatedBackgroundProps {
  className?: string
}

// Estrutura de dados das tecnologias
const technologies = [
  { label: "JavaScript", icon: JsIcon },
  { label: "Next.js", icon: NextIcon },
  { label: "Angular", icon: AngularIcon },
  { label: "React", icon: ReactIcon },
  { label: "TypeScript", icon: TypeScriptIcon },
  { label: "Java", icon: JavaIcon },
  { label: "MySQL", icon: MySQLIcon },
  { label: "PostgreSQL", icon: PostgreSQLIcon },
  { label: "PHP", icon: PHPIcon }
]

interface IconState {
  x: number
  y: number
  vx: number
  vy: number
  element: HTMLElement
}

export default function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const iconStatesRef = useRef<IconState[]>([])
  const containerBoundsRef = useRef<{ width: number; height: number }>()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !iconsRef.current) return

    const container = containerRef.current
    const icons = iconsRef.current
    const iconsArray = Array.from(icons.children) as HTMLElement[]
    
    // Inicializar bounds do container
    const updateBounds = () => {
      const rect = container.getBoundingClientRect()
      containerBoundsRef.current = {
        width: rect.width,
        height: rect.height
      }
    }
    
    updateBounds()
    window.addEventListener('resize', updateBounds)

    // Inicializar estados dos ícones
    const initializeIconStates = () => {
      iconStatesRef.current = iconsArray.map((icon, index) => {
        const bounds = containerBoundsRef.current!
        const size = 60 // Tamanho aproximado do ícone
        
        // Posição inicial aleatória
        const x = Math.random() * (bounds.width - size)
        const y = Math.random() * (bounds.height - size)
        
        // Velocidade inicial aleatória
        const speed = 0.5 + Math.random() * 1.5
        const angle = Math.random() * Math.PI * 2
        const vx = Math.cos(angle) * speed
        const vy = Math.sin(angle) * speed
        
        return {
          x,
          y,
          vx,
          vy,
          element: icon
        }
      })
    }

    // Função de animação
    const animate = () => {
      const bounds = containerBoundsRef.current!
      const iconSize = 60
      const states = iconStatesRef.current
      
      states.forEach((state, index) => {
        // Atualizar posição
        state.x += state.vx
        state.y += state.vy
        
        // Verificar colisão com bordas
        if (state.x <= 0 || state.x >= bounds.width - iconSize) {
          state.vx = -state.vx
          state.x = Math.max(0, Math.min(state.x, bounds.width - iconSize))
        }
        
        if (state.y <= 0 || state.y >= bounds.height - iconSize) {
          state.vy = -state.vy
          state.y = Math.max(0, Math.min(state.y, bounds.height - iconSize))
        }
        
        // Verificar colisão entre ícones
        states.forEach((otherState, otherIndex) => {
          if (index !== otherIndex) {
            const dx = state.x - otherState.x
            const dy = state.y - otherState.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < iconSize) {
              // Colisão detectada - inverter velocidades
              const angle = Math.atan2(dy, dx)
              const speed1 = Math.sqrt(state.vx * state.vx + state.vy * state.vy)
              const speed2 = Math.sqrt(otherState.vx * otherState.vx + otherState.vy * otherState.vy)
              
              // Trocar velocidades
              const tempVx = state.vx
              const tempVy = state.vy
              
              state.vx = otherState.vx
              state.vy = otherState.vy
              otherState.vx = tempVx
              otherState.vy = tempVy
              
              // Separar os ícones para evitar colisão contínua
              const separation = iconSize - distance + 5
              const sepX = (dx / distance) * separation * 0.5
              const sepY = (dy / distance) * separation * 0.5
              
              state.x += sepX
              state.y += sepY
              otherState.x -= sepX
              otherState.y -= sepY
            }
          }
        })
        
        // Aplicar posição ao elemento
        state.element.style.transform = `translate(${state.x}px, ${state.y}px)`
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }

    // Inicializar e começar animação com delay para fade-in
    const startAnimation = () => {
      initializeIconStates()
      animate()
      setIsVisible(true)
    }

    // Delay para evitar o glitch inicial
    const timer = setTimeout(startAnimation, 100)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', updateBounds)
      clearTimeout(timer)
    }
  }, [])

  // Função para obter tamanho do ícone baseado na tecnologia
  const getIconSize = (label: string) => {
    switch (label) {
      case "Java":
      case "MySQL":
        return "w-24 h-24"
      case "PostgreSQL":
      case "PHP":
      case "React":
      case "Next.js":
        return "w-20 h-20"
      case "Next.js":
      case "JavaScript":
      case "TypeScript":
      default:
        return "w-14 h-14" 
    }
  }

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none z-[-1] ${className}`}
    >
      <div 
        ref={iconsRef} 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {technologies.map((tech, index) => {
          const IconComponent = tech.icon
          const iconSize = getIconSize(tech.label)
          
          return (
            <div
              key={tech.label}
              className={`absolute flex items-center justify-center opacity-100 hover:opacity-80 transition-opacity duration-300 ${iconSize}`}
              title={tech.label}
            >
              <IconComponent className="text-white w-full h-full" />
            </div>
          )
        })}
      </div>
    </div>
  )
} 