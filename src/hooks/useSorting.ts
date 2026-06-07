"use client"

import { useState, useEffect } from "react";

export type InfoComplexidade = {
  piorCaso: string;
  melhorCaso: string;
  espaco: string;
};

export function useSorting() {
  const TAMANHO_PADRAO = 24; 
  const ALTURA_MAXIMA = 320; 

  const [array, setArray] = useState<number[]>([]);
  const [comparando, setComparando] = useState<number[]>([]);
  const [estaOrdenando, setEstaOrdenando] = useState<boolean>(false);
  const [velocidade, setVelocidade] = useState<number>(50); 
  
  // Estado para armazenar as métricas e o nome do algoritmo selecionado
  const [nomeAlgoritmo, setNomeAlgoritmo] = useState<string>("Nenhum Selecionado");
  const [complexidade, setComplexidade] = useState<InfoComplexidade>({
    piorCaso: "---",
    melhorCaso: "---",
    espaco: "---",
  });

  useEffect(() => {
    gerarNovoArray();
  }, []);

  // FUNÇÕES DE CONTROLE
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const gerarNovoArray = () => {
    if (estaOrdenando) return;
    const novoArray = Array.from({ length: TAMANHO_PADRAO }, () => 
      Math.floor(Math.random() * (ALTURA_MAXIMA - 20)) + 20
    );
    setArray(novoArray);
    setComparando([]);
  };

  // ALGORITMO 1: BUBBLE SORT
  const executarBubbleSort = async () => {
    if (estaOrdenando) return;
    
    setNomeAlgoritmo("Bubble Sort");
    setComplexidade({
      piorCaso: "O(n²)",
      melhorCaso: "O(n)",
      espaco: "O(1)",
    });
    
    setEstaOrdenando(true);
    let arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparando([j, j + 1]);
        await sleep(velocidade);

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
        }
      }
    }
    setComparando([]);
    setEstaOrdenando(false);
  };

  // ALGORITMO 2: SELECTION SORT
  const executarSelectionSort = async () => {
    if (estaOrdenando) return;
    
    setNomeAlgoritmo("Selection Sort");
    setComplexidade({
      piorCaso: "O(n²)",
      melhorCaso: "O(n²)",
      espaco: "O(1)",
    });
    
    setEstaOrdenando(true);
    let arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let indiceMinimo = i;
      for (let j = i + 1; j < n; j++) {
        setComparando([j, indiceMinimo]);
        await sleep(velocidade);

        if (arr[j] < arr[indiceMinimo]) {
          indiceMinimo = j;
        }
      }
      if (indiceMinimo !== i) {
        let temp = arr[i];
        arr[i] = arr[indiceMinimo];
        arr[indiceMinimo] = temp;
        setArray([...arr]);
      }
    }
    setComparando([]);
    setEstaOrdenando(false);
  };

  // ALGORITMO 3: INSERTION SORT (Estrutura pronta para a lógica futura)
  const executarInsertionSort = () => {
    if (estaOrdenando) return;
    setNomeAlgoritmo("Insertion Sort");
    setComplexidade({
      piorCaso: "O(n²)",
      melhorCaso: "O(n)",
      espaco: "O(1)",
    });
    alert("Insertion Sort em breve! A lógica será criada no próximo passo.");
  };

  return {
    array,
    comparando,
    estaOrdenando,
    velocidade,
    setVelocidade,
    nomeAlgoritmo,
    complexidade,
    gerarNovoArray,
    executarBubbleSort,
    executarSelectionSort,
    executarInsertionSort,
  };
}