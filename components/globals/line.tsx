"use client";
import { useEffect, useRef, useState } from "react";

interface MouseEvent {
  movementY: number;
  clientX: number;
}

interface LineProps {
  audioSrc?: string; // URL do arquivo de áudio
  volume?: number; // Volume do áudio (0-1)
}

export default function Line({ audioSrc = "/sounds/guitar-string.mp3", volume = 0.5 }: LineProps) {
  const path = useRef<SVGPathElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId: number | null = null;
  let isPlaying = false;

  useEffect(() => {
    setPath(progress);
    
    // Inicializar o áudio
    if (audioSrc) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.volume = volume;
      audioRef.current.preload = "auto";
      
      audioRef.current.addEventListener("canplaythrough", () => {
        setIsAudioLoaded(true);
      });
      
      audioRef.current.addEventListener("ended", () => {
        isPlaying = false;
      });
    }
  }, [audioSrc, volume]);

  const setPath = (progress: number) => {
    const width = window.innerWidth * 1;

    path.current?.setAttributeNS(
      null,
      "d",
      `M0 250 Q${width * x} ${250 + progress}, ${width} 250`
    );
  };

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const playAudio = () => {
    if (audioRef.current && isAudioLoaded) {
      audioRef.current.currentTime = 0; // Reinicia o áudio
      audioRef.current.play().catch(error => {
        console.error("Erro ao tocar áudio:", error);
      });
      // Remove a verificação de isPlaying para permitir repetição
    }
  };

  const manageMouseEnter = () => {
    if (reqId) {
      cancelAnimationFrame(reqId);
      resetAnimation();
    }
    
    // Remove o som do mouseEnter - não toca mais aqui
  };

  const manageMouseMove = (e: MouseEvent) => {
    const { movementY, clientX } = e;

    const pathBound = path.current?.getBoundingClientRect();

    if (pathBound) {
      x = (clientX - pathBound.left) / pathBound.width;
      progress += movementY;
      setPath(progress);
    }
  };

  const manageMouseLeave = () => {
    // Toca o som quando a linha "solta" do cursor
    playAudio();
    animateOut();
  };

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);

    progress = lerp(progress, 0, 0.025);

    time += 0.2;

    setPath(newProgress);

    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };

  return (
    <div className="relative w-full h-px mb-5">
      <div
        onMouseEnter={() => {
          manageMouseEnter();
        }}
        onMouseMove={(e) => {
          manageMouseMove(e);
        }}
        onMouseLeave={() => {
          manageMouseLeave();
        }}
        className="relative z-10 h-10 w-full top-[-40px]"
      ></div>
      <svg className="absolute w-full h-[500px] top-[-250px]">
        <path
          ref={path}
          className="stroke-current text-white stroke-[1px] fill-none"
        ></path>
      </svg>
    </div>
  )
}