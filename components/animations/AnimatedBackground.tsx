"use client"

import { gsap } from "gsap"
import { useEffect, useRef } from "react"

interface AnimatedBackgroundProps {
  className?: string
}

export default function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shapesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !shapesRef.current) return

    const container = containerRef.current
    const shapes = shapesRef.current
    const shapesArray = Array.from(shapes.children) as HTMLElement[]

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { width, height, left, top } = container.getBoundingClientRect()
      
      const x = (clientX - left) / width
      const y = (clientY - top) / height

      // Animate shapes based on mouse position
      shapesArray.forEach((shape, index) => {
        const delay = index * 0.1
        const intensity = 50 + (index * 10)
        
        gsap.to(shape, {
          x: (x - 0.5) * intensity,
          y: (y - 0.5) * intensity,
          rotation: (x - 0.5) * 20,
          duration: 1,
          delay,
          ease: "power2.out"
        })
      })
    }

    // Initial animation
    gsap.fromTo(shapesArray, 
      { 
        opacity: 0, 
        scale: 0,
        rotation: 0
      },
      { 
        opacity: 1, 
        scale: 1,
        rotation: 360,
        duration: 2,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }
    )

    // Continuous floating animation
    shapesArray.forEach((shape, index) => {
      gsap.to(shape, {
        y: -20,
        rotation: 360,
        duration: 3 + index,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2
      })
    })

    container.addEventListener("mousemove", handleMouseMove)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
    >
      <div ref={shapesRef} className="absolute inset-0">
        {/* Geometric shapes */}
        <svg className="absolute top-20 left-20 w-16 h-16 opacity-20" viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
        
        <svg className="absolute top-40 right-40 w-12 h-12 opacity-15" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
        
        <svg className="absolute bottom-40 left-40 w-20 h-20 opacity-25" viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
        
        <svg className="absolute bottom-20 right-20 w-14 h-14 opacity-20" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" fill="none" stroke="white" strokeWidth="2" transform="rotate(45 50 50)"/>
        </svg>
        
        <svg className="absolute top-1/2 left-1/4 w-16 h-16 opacity-15" viewBox="0 0 100 100">
          <polygon points="50,10 80,80 20,80" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
        
        <svg className="absolute top-1/3 right-1/3 w-18 h-18 opacity-20" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="2"/>
          <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
        
        <svg className="absolute bottom-1/3 left-1/3 w-12 h-12 opacity-25" viewBox="0 0 100 100">
          <rect x="15" y="15" width="70" height="70" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
        
        <svg className="absolute top-1/4 right-1/4 w-14 h-14 opacity-15" viewBox="0 0 100 100">
          <polygon points="50,15 85,85 15,85" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
      </div>
    </div>
  )
} 