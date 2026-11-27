"use client";

import { useEffect, useRef, useState } from "react";

export function useSortingTimer(velocidade: number) {
  const [tempo, setTempo] = useState<number>(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tempoInicioRef = useRef<number>(0);
  const velocidadeRef = useRef<number>(velocidade);

  useEffect(() => {
    velocidadeRef.current = velocidade;
  }, [velocidade]);

  const iniciarCronometro = () => {
    pararCronometro();
    setTempo(0);
    
    tempoInicioRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setTempo((Date.now() - tempoInicioRef.current) / 1000);
    }, 10);
  };

  const pararCronometro = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetarCronometro = () => {
    pararCronometro();
    setTempo(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return {
    tempo,
    velocidadeRef,
    iniciarCronometro,
    pararCronometro,
    resetarCronometro,
  };
}