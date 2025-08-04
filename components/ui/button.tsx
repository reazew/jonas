"use client"

import Magnetic from "@/components/globals/magnetic"
import { cn } from "@/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"
import { HTMLMotionProps, motion } from "framer-motion"
import { gsap } from "gsap"
import { ReactNode, useRef, useState } from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-black text-white border-2 border-black hover:text-black",
        secondary: "bg-white text-black border-2 border-black hover:text-white",
        outline: "bg-transparent text-black border-2 border-black hover:text-white",
        ghost: "bg-transparent text-black hover:text-white",
        destructive: "bg-red-500 text-white border-2 border-red-500 hover:text-white",
        link: "text-black underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-8 text-lg",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface ButtonProps
  extends HTMLMotionProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
  loading?: boolean
  icon?: ReactNode
  iconPosition?: "left" | "right"
  magnetic?: boolean
}

const Button = motion.button

export default function CustomButton({
  className,
  variant,
  size,
  children,
  loading = false,
  icon,
  iconPosition = "left",
  magnetic = false,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [paintPaths, setPaintPaths] = useState<string[]>([])

  const generatePaintPaths = () => {
    const width = buttonRef.current?.offsetWidth || 100
    const height = buttonRef.current?.offsetHeight || 40
    
    const paths = []
    const numPaths = 3 + Math.floor(Math.random() * 2) // Menos rabiscos
    
    // Área limpa no centro (para o texto) - SEMPRE preservada
    const centerWidth = width * 0.6 // Margem horizontal também
    const centerHeight = height * 0.7 // Margem vertical
    const centerX = (width - centerWidth) / 2
    const centerY = (height - centerHeight) / 2
    
    for (let pathIndex = 0; pathIndex < numPaths; pathIndex++) {
      const points = []
      const numPoints = 5 + Math.floor(Math.random() * 3) // Menos pontos, mais brusco
      
      for (let i = 0; i < numPoints; i++) {
        let x, y
        
        if (i === 0) {
          // Ponto inicial - sempre nas bordas
          x = Math.random() * (width * 0.2)
          y = Math.random() * (height * 0.2)
        } else if (i === numPoints - 1) {
          // Ponto final - sempre nas bordas
          x = width - (Math.random() * (width * 0.2))
          y = height - (Math.random() * (height * 0.2))
        } else {
          // Pontos intermediários - NUNCA no centro
          const section = Math.floor((i - 1) / (numPoints - 2) * 8) // Mais seções para melhor distribuição
          switch (section) {
            case 0: // Topo esquerdo
              x = Math.random() * centerX
              y = Math.random() * (height * 0.3)
              break
            case 1: // Topo direito
              x = centerX + centerWidth + (Math.random() * (width - centerX - centerWidth))
              y = Math.random() * (height * 0.3)
              break
            case 2: // Direita superior
              x = width - (Math.random() * (width * 0.3))
              y = Math.random() * centerY
              break
            case 3: // Direita inferior
              x = width - (Math.random() * (width * 0.3))
              y = centerY + centerHeight + (Math.random() * (height - centerY - centerHeight))
              break
            case 4: // Baixo direito
              x = centerX + centerWidth + (Math.random() * (width - centerX - centerWidth))
              y = height - (Math.random() * (height * 0.3))
              break
            case 5: // Baixo esquerdo
              x = Math.random() * centerX
              y = height - (Math.random() * (height * 0.3))
              break
            case 6: // Esquerda inferior
              x = Math.random() * (width * 0.3)
              y = centerY + centerHeight + (Math.random() * (height - centerY - centerHeight))
              break
            default: // Esquerda superior
              x = Math.random() * (width * 0.3)
              y = Math.random() * centerY
              break
          }
        }
        
        points.push(`${x},${y}`)
      }
      
      paths.push(`M ${points.join(' L ')} Z`)
    }
    
    return paths
  }

  const getPaintColor = () => {
    switch (variant) {
      case "default":
        return "#ffffff" // Branco sobre preto
      case "secondary":
        return "#000000" // Preto sobre branco
      case "outline":
        return "#000000" // Preto sobre transparente
      case "ghost":
        return "#000000" // Preto sobre transparente
      default:
        return "#ffffff" // Branco sobre preto
    }
  }

  const getOriginalColor = () => {
    switch (variant) {
      case "default":
        return "#000000" // Preto
      case "secondary":
        return "#ffffff" // Branco
      case "outline":
        return "#ffffff" // Branco
      case "ghost":
        return "#ffffff" // Branco
      default:
        return "#000000" // Preto
    }
  }

  const handleMouseEnter = () => {
    const paths = generatePaintPaths()
    setPaintPaths(paths)
    setIsHovered(true)
    
    // Animar com GSAP - mais rápido e natural
    const pathsElements = svgRef.current?.querySelectorAll('path')
    if (pathsElements) {
      gsap.set(pathsElements, { 
        strokeDasharray: "0 1",
        fillOpacity: 0,
        stroke: getPaintColor()
      })
      
      gsap.to(pathsElements, {
        strokeDasharray: "1 0",
        duration: 0.6,
        stagger: 0.08,
        ease: "power1.out"
      })
      
      gsap.to(pathsElements, {
        fillOpacity: 1,
        duration: 0.4,
        stagger: 0.08,
        delay: 0.2,
        ease: "power1.out"
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    
    // Animar reversão com GSAP - mais rápido e natural
    const pathsElements = svgRef.current?.querySelectorAll('path')
    if (pathsElements) {
      gsap.to(pathsElements, {
        strokeDasharray: "0 1",
        duration: 0.6,
        stagger: 0.08,
        ease: "power1.in"
      })
      
      gsap.to(pathsElements, {
        fillOpacity: 0,
        duration: 0.4,
        stagger: 0.08,
        delay: 0.1,
        ease: "power1.in"
      })
    }
  }

  const buttonContent = (
    <Button
      ref={buttonRef}
      className={cn(buttonVariants({ variant, size, className }))}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={loading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* SVG Paint Animation */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: paintPaths.length > 0 ? 1 : 0 }}
      >
        {paintPaths.map((path, index) => (
          <path
            key={index}
            d={path}
            fill={getPaintColor()}
            stroke={getPaintColor()}
            strokeWidth="3"
            style={{
              strokeDasharray: "0 1",
              fillOpacity: 0
            }}
          />
        ))}
      </svg>

      {/* Content with automatic color adaptation */}
      <div 
        ref={textRef}
        className="relative z-10 flex items-center"
        style={{ 
          mixBlendMode: "difference",
          color: variant === "default" ? "#ffffff" : "#000000"
        }}
      >
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
          />
        )}
        
        {!loading && icon && iconPosition === "left" && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mr-2"
          >
            {icon}
          </motion.div>
        )}
        
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {children}
        </motion.span>
        
        {!loading && icon && iconPosition === "right" && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="ml-2"
          >
            {icon}
          </motion.div>
        )}
      </div>
    </Button>
  )

  if (magnetic) {
    return <Magnetic>{buttonContent}</Magnetic>
  }

  return buttonContent
} 