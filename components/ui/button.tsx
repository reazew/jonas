"use client"

import Magnetic from "@/components/globals/magnetic"
import { cn } from "@/utils/cn"
import { HTMLMotionProps, motion } from "framer-motion"
import { gsap } from "gsap"
import { ReactNode, useEffect, useRef, useState } from "react"

export interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode
  loading?: boolean
  icon?: ReactNode
  iconPosition?: "left" | "right"
  magnetic?: boolean
}

const Button = motion.button

export default function CustomButton({
  className,
  children,
  loading = false,
  icon,
  iconPosition = "left",
  magnetic = false,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [paintPaths, setPaintPaths] = useState<string[]>([])

  const generatePaintPaths = () => {
    const width = buttonRef.current?.offsetWidth || 100
    const height = buttonRef.current?.offsetHeight || 40
    const paths = []
    const numPaths = 6

    for (let i = 0; i < numPaths; i++) {
      const points = []
      const numPoints = 8 + Math.floor(Math.random() * 4)

      for (let j = 0; j < numPoints; j++) {
        let x = 0, y = 0

        if (i === 0) {
          if (j === 0) {
            x = Math.random() * (width * 0.2)
            y = Math.random() * height
          } else if (j === numPoints - 1) {
            x = width - (Math.random() * (width * 0.2))
            y = Math.random() * height
          } else {
            x = Math.random() * width
            y = Math.random() * height
          }
        } else if (i === 1) {
          if (j === 0) {
            x = Math.random() * width
            y = Math.random() * (height * 0.2)
          } else if (j === numPoints - 1) {
            x = Math.random() * width
            y = height - (Math.random() * (height * 0.2))
          } else {
            x = Math.random() * width
            y = Math.random() * height
          }
        } else {
          x = Math.random() * width
          y = Math.random() * height
        }

        points.push(`${x},${y}`)
      }

      paths.push(`M ${points.join(" L ")} Z`)
    }

    return paths
  }

  const handleMouseEnter = () => {
    const paths = generatePaintPaths()
    setPaintPaths(paths)
  }

  useEffect(() => {
    if (paintPaths.length === 0) return

    const pathsElements = svgRef.current?.querySelectorAll("path")
    if (!pathsElements) return

    gsap.set(pathsElements, {
      strokeDasharray: "0 1",
      fillOpacity: 0,
      stroke: "#fff",
    })

    gsap.to(pathsElements, {
      strokeDasharray: "1 0",
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
    })

    gsap.to(pathsElements, {
      fillOpacity: 1,
      duration: 0.4,
      stagger: 0.08,
      delay: 0.2,
      ease: "power2.out",
    })
  }, [paintPaths])

  const handleMouseLeave = () => {
    const pathsElements = svgRef.current?.querySelectorAll("path")
    if (!pathsElements) return

    gsap.to(pathsElements, {
      strokeDasharray: "0 1",
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.in",
    })

    gsap.to(pathsElements, {
      fillOpacity: 0,
      duration: 0.4,
      stagger: 0.08,
      delay: 0.1,
      ease: "power2.in",
    })
  }

  const baseStyles =
    "relative inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-black  border-whiteborder overflow-hidden transition-all duration-300 ease-out cursor-pointer"

  const content = (
    <Button
      ref={buttonRef}
      className={cn(baseStyles, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={loading}
      {...props}
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: paintPaths.length > 0 ? 1 : 0 }}
        preserveAspectRatio="none"
      >
        {paintPaths.map((path, index) => (
          <path
            key={index}
            d={path}
            fill="#fff"
            stroke="#fff"
            strokeWidth="6"
            style={{ strokeDasharray: "0 1", fillOpacity: 0 }}
          />
        ))}
      </svg>

      <div className="relative z-10 flex items-center" style={{ mixBlendMode: "difference" }}>
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-current border-t-transparent mr-2"
          />
        )}

        {!loading && icon && iconPosition === "left" && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mr-2">
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
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="ml-2">
            {icon}
          </motion.div>
        )}
      </div>
    </Button>
  )

  return magnetic ? <Magnetic>{content}</Magnetic> : content
}
