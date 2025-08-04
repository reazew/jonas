"use client"

import AnimatedText from "@/components/animations/AnimatedText"
import Button from "@/components/ui/button"

export function PaintButtonExamples() {
  return (
    <div className="space-y-6 p-8 bg-white border-2 border-black">
      <AnimatedText 
        variant="typewriter"
        className="text-2xl font-bold text-black mb-6"
        staggerDelay={0.1}
      >
        Botões com Pintura Reversível
      </AnimatedText>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-gray-600">Botão Principal</h4>
            <Button variant="default" size="lg" magnetic>
              Hover para pintar branco, sair para voltar preto
            </Button>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-gray-600">Botão Secundário</h4>
            <Button variant="secondary" size="lg" magnetic>
              Hover para pintar preto, sair para voltar branco
            </Button>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-gray-600">Botão Outline</h4>
            <Button variant="outline" size="lg" magnetic>
              Hover para pintar preto, sair para voltar transparente
            </Button>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-gray-600">Botão Ghost</h4>
            <Button variant="ghost" size="lg" magnetic>
              Hover para pintar preto, sair para voltar transparente
            </Button>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300">
          <h4 className="text-sm font-bold mb-3">Como funciona:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Hover: Pinta com cor contrastante (branco/preto)</li>
            <li>• Mouse leave: Volta a preencher com a cor original</li>
            <li>• Animação progressiva em ambas as direções</li>
            <li>• Preenchimento completo do background</li>
            <li>• Cores se adaptam ao variant do botão</li>
            <li>• Funciona com efeito magnético</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-bold mb-2">Botões Pequenos:</h4>
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="sm" magnetic>
              Pequeno
            </Button>
            <Button variant="secondary" size="sm" magnetic>
              Pequeno
            </Button>
            <Button variant="outline" size="sm" magnetic>
              Pequeno
            </Button>
            <Button variant="ghost" size="sm" magnetic>
              Pequeno
            </Button>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-black text-white border-2 border-white">
          <h4 className="text-sm font-bold mb-3">Teste em Fundo Escuro:</h4>
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="default" magnetic>
              Botão Escuro
            </Button>
            <Button variant="secondary" size="default" magnetic>
              Botão Claro
            </Button>
            <Button variant="outline" size="default" magnetic>
              Botão Outline
            </Button>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300">
          <h4 className="text-sm font-bold mb-3">Instruções:</h4>
          <p className="text-sm text-gray-600">
            Passe o mouse sobre os botões para ver a pintura com cor contrastante. 
            Remova o mouse para ver a animação voltar a preencher com a cor original do botão.
          </p>
        </div>
      </div>
    </div>
  )
} 