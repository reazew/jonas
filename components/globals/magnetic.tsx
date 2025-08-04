'use client'

import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'

interface MagneticProps {
    children: React.ReactElement;
}

export default function Magnetic({ children }: MagneticProps) {
    const magnetic = useRef<HTMLElement>(null);

    useEffect(() => {
        console.log(children)
        
        if (!magnetic.current) return;
        
        const xTo = gsap.quickTo(magnetic.current, "x", {duration: 1.5, ease: "elastic.out(1, 0.3)"})
        const yTo = gsap.quickTo(magnetic.current, "y", {duration: 1.5, ease: "elastic.out(1, 0.3)"})

        const handleMouseMove = (e: MouseEvent) => {
            if (!magnetic.current) return;
            
            const { clientX, clientY } = e;
            const {height, width, left, top} = magnetic.current.getBoundingClientRect();
            const x = clientX - (left + width/2)
            const y = clientY - (top + height/2)
            xTo(x * 1);
            yTo(y * 1)
        }

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0)
        }

        magnetic.current.addEventListener("mousemove", handleMouseMove)
        magnetic.current.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            if (magnetic.current) {
                magnetic.current.removeEventListener("mousemove", handleMouseMove)
                magnetic.current.removeEventListener("mouseleave", handleMouseLeave)
            }
        }
    }, [children])

    return (
        React.cloneElement(children, {ref: magnetic})
    )
}
