"use client";

import { useCallback, useEffect, useState } from "react";
import { TAMANHO_PADRAO, ALTURA_MAXIMA } from "./sortingConfig";

function criarArrayAleatorio(): number[] {
  return Array.from({ length: TAMANHO_PADRAO }, () =>
    Math.floor(Math.random() * (ALTURA_MAXIMA - 20)) + 20
  );
}

export function useSortingArray() {
  const [array, setArray] = useState<number[]>([]);
  const [arrayBackup, setArrayBackup] = useState<number[]>([]);

  useEffect(() => {
    const arrayInicial = criarArrayAleatorio();
    setArray(arrayInicial);
    setArrayBackup([...arrayInicial]);
  }, []);

  const gerarNovoArray = useCallback(() => {
    const novoArray = criarArrayAleatorio();
    setArray(novoArray);
    setArrayBackup([...novoArray]);
  }, []);

  const definirArray = useCallback((novoArray: number[]) => {
    const copia = [...novoArray];
    setArray(copia);
    setArrayBackup([...copia]);
  }, []);

  const restaurarArray = useCallback(() => {
    setArray([...arrayBackup]);
  }, [arrayBackup]);

  return {
    array,
    setArray,
    gerarNovoArray,
    definirArray,
    restaurarArray,
  };
}