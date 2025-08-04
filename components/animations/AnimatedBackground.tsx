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
import { gsap } from "gsap"
import { useEffect, useRef } from "react"

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

export default function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !iconsRef.current) return

    const container = containerRef.current
    const icons = iconsRef.current
    const iconsArray = Array.from(icons.children) as HTMLElement[]

    // Mouse move handler - sempre ativo
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { width, height, left, top } = container.getBoundingClientRect()
      
      const x = (clientX - left) / width
      const y = (clientY - top) / height

      // Animate icons based on mouse position
      iconsArray.forEach((icon, index) => {
        const delay = index * 0.05
        const intensity = 25 + (index * 3)
        
        gsap.to(icon, {
          x: (x - 0.5) * intensity,
          y: (y - 0.5) * intensity,
          rotation: (x - 0.5) * 10,
          scale: 1 + (Math.abs(x - 0.5) + Math.abs(y - 0.5)) * 0.15,
          duration: 0.6,
          delay,
          ease: "power2.out"
        })
      })
    }

    // Initial animation
    gsap.fromTo(iconsArray, 
      { 
        opacity: 0, 
        scale: 0,
        rotation: 0,
        y: 30
      },
      { 
        opacity: 1, 
        scale: 1,
        rotation: 360,
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }
    )

    // Continuous floating animation
    iconsArray.forEach((icon, index) => {
      gsap.to(icon, {
        y: -10,
        rotation: 360,
        duration: 3 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.15
      })
    })

    // Sempre ativo, mesmo com modal/loading
    container.addEventListener("mousemove", handleMouseMove)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Função para distribuir ícones de forma homogênea nas bordas
  const getHomogeneousIconPosition = (index: number) => {
    const totalIcons = technologies.length
    
    // Distribuição balanceada com 9 posições principais (uma para cada ícone)
    const sections = [
      // Top edge - 2 posições (esquerda e direita)
      { top: "10%", left: "15%" },
      { top: "10%", left: "80%" },
      
      // Right edge - 2 posições (topo e baixo)
      { top: "35%", left: "90%" },
      { top: "65%", left: "90%" },
      
      // Bottom edge - 2 posições (esquerda e direita)
      { top: "85%", left: "15%" },
      { top: "85%", left: "80%" },
      
      // Left edge - 2 posições (topo e baixo)
      { top: "30%", left: "5%" },
      { top: "65%", left: "5%" },
      
      // Centro estratégico - 1 posição
      { top: "5%", left: "45%" }
    ]
    
    return sections[index % sections.length]
  }

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
      <div ref={iconsRef} className="absolute inset-0">
        {technologies.map((tech, index) => {
          const IconComponent = tech.icon
          const position = getHomogeneousIconPosition(index)
          const iconSize = getIconSize(tech.label)
          
          return (
            <div
              key={tech.label}
              className={`absolute flex items-center justify-center opacity-30 hover:opacity-60 transition-opacity duration-300 ${iconSize}`}
              style={position}
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