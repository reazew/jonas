"use client"

import AnimatedElement from "@/components/animations/animated-element"
import AudioWaveform from "@/components/animations/audio-waveform"

// Exemplo de como usar o sistema de animações

export function AnimationExamples() {
  return (
    <div className="space-y-8 p-8">
      {/* Exemplo 1: AnimatedElement básico */}
      <AnimatedElement variant="fadeInUp" delay={0.2}>
        <h2 className="text-2xl font-bold">Título Animado</h2>
      </AnimatedElement>

      {/* Exemplo 2: AudioWaveform */}
      <AnimatedElement variant="scaleIn">
        <AudioWaveform barCount={15} className="mb-4" />
      </AnimatedElement>

      {/* Exemplo 3: Lista com stagger */}
      <div className="space-y-2">
        {["Item 1", "Item 2", "Item 3"].map((item, index) => (
          <AnimatedElement 
            key={item}
            variant="slideInLeft" 
            delay={index * 0.1}
          >
            <div className="p-4 bg-gray-100 rounded">
              {item}
            </div>
          </AnimatedElement>
        ))}
      </div>

      {/* Exemplo 4: Botão com bounce */}
      <AnimatedElement variant="bounceIn" delay={0.5}>
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg">
          Botão Animado
        </button>
      </AnimatedElement>
    </div>
  )
}

// Exemplo de como criar animações customizadas
export function CustomAnimationExample() {
  return (
    <AnimatedElement 
      variant="fadeInUp" 
      delay={0.3}
      duration={0.8}
      className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
    >
      <h3 className="text-xl font-bold mb-2">Animação Customizada</h3>
      <p>Este elemento tem duração e delay personalizados</p>
    </AnimatedElement>
  )
} 