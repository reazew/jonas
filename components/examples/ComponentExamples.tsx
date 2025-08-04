"use client"

import AnimatedBackground from "@/components/animations/AnimatedBackground"
import AnimatedText from "@/components/animations/AnimatedText"
import Button from "@/components/ui/button"

// Exemplos de como usar os novos componentes
// Você pode copiar e usar em qualquer lugar do seu projeto

export function ButtonExamples() {
  return (
    <div className="space-y-4 p-6 bg-white border-2 border-black">
      <h3 className="text-xl font-bold mb-4">Exemplos de Botões</h3>
      
      <div className="space-y-2">
        <Button variant="default" size="lg">
          Botão Principal
        </Button>
        
        <Button variant="secondary" size="default" magnetic>
          Botão Magnético
        </Button>
        
        <Button variant="outline" size="sm">
          Botão Outline
        </Button>
        
        <Button variant="ghost" magnetic>
          Botão Ghost Magnético
        </Button>
        
        <Button variant="destructive">
          Botão Destructive
        </Button>
        
        <Button variant="link" magnetic>
          Botão Link Magnético
        </Button>
        
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300">
          <h4 className="text-sm font-bold mb-2">Botões com Efeito Magnético:</h4>
          <div className="space-y-2">
            <Button variant="default" magnetic>
              Hover para ver o efeito
            </Button>
            <Button variant="secondary" magnetic>
              Outro botão magnético
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AnimatedTextExamples() {
  return (
    <div className="space-y-4 p-6 bg-white border-2 border-black">
      <h3 className="text-xl font-bold mb-4">Exemplos de Texto Animado</h3>
      
      <div className="space-y-4">
        <AnimatedText 
          variant="typewriter"
          className="text-2xl font-bold text-black"
          staggerDelay={0.1}
        >
          Texto Typewriter
        </AnimatedText>
        
        <AnimatedText 
          variant="slideUp"
          className="text-lg text-gray-600"
          staggerDelay={0.03}
        >
          Texto Slide Up
        </AnimatedText>
        
        <AnimatedText 
          variant="fadeIn"
          className="text-base text-gray-500"
          staggerDelay={0.05}
        >
          Texto Fade In
        </AnimatedText>
      </div>
    </div>
  )
}

export function BackgroundExample() {
  return (
    <div className="relative h-64 bg-black border-2 border-white">
      <AnimatedBackground />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Fundo Animado</h3>
        <p>Mova o mouse para ver as formas reagindo</p>
      </div>
    </div>
  )
}

// Como usar os componentes em qualquer lugar:

/*
// 1. Importar os componentes
import Button from "@/components/ui/button"
import AnimatedText from "@/components/animations/AnimatedText"
import AnimatedBackground from "@/components/animations/AnimatedBackground"

// 2. Usar o Button (normal)
<Button variant="default" size="lg" onClick={handleClick}>
  Meu Botão
</Button>

// 3. Usar o Button com efeito magnético
<Button variant="default" size="lg" magnetic>
  Botão Magnético
</Button>

// 4. Usar o AnimatedText
<AnimatedText variant="typewriter" className="text-2xl">
  Meu texto animado
</AnimatedText>

// 5. Usar o AnimatedBackground
<AnimatedBackground />

// 6. Combinar tudo
<div className="relative">
  <AnimatedBackground />
  <div className="relative z-10">
    <AnimatedText variant="typewriter">
      Título animado
    </AnimatedText>
    <Button variant="default" magnetic>
      Clique aqui
    </Button>
  </div>
</div>
*/ 