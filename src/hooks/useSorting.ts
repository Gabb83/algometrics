"use client";

import { useState, useEffect, useRef } from "react";
import { useSortingTimer } from "./useSortingTimer";
import { bubbleSort } from "../algoritms/bubbleSort";
import { selectionSort } from "../algoritms/selectionSort";
import { insertionSort } from "../algoritms/insertionSort";
import { cocktailSort } from "../algoritms/cocktailSort";
import { mergeSort } from "../algoritms/mergeSort";

import {
  TAMANHO_PADRAO,
  ALTURA_MAXIMA,
  CONFIG_ALGORITMOS,
  type InfoComplexidade,
  type Algoritmo,
} from "./sortingConfig";

export function useSorting() {
  // Estados antigos
  const [array, setArray] = useState<number[]>([]);
  const [arrayBackup, setArrayBackup] = useState<number[]>([]);
  const [comparando, setComparando] = useState<number[]>([]);
  const [estaOrdenando, setEstaOrdenando] = useState<boolean>(false);
  const [velocidade, setVelocidade] = useState<number>(50);
  const [nomeAlgoritmo, setNomeAlgoritmo] = useState<string>("Selecionar");
  const [complexidade, setComplexidade] = useState<InfoComplexidade>({
    piorCaso: "N/A",
    melhorCaso: "N/A",
    espaco: "N/A",
  });

  // 🌟 NOVOS ESTADOS PARA AS MÉTRICAS EM TEMPO REAL
  const [comparacoes, setComparacoes] = useState<number>(0);
  const [trocas, setTrocas] = useState<number>(0);
  const devePararRef = useRef<boolean>(false); // 🌟 Resolve o bug de travamento/parada

  useEffect(() => {
    gerarNovoArray();
  }, []);

  const configurarAlgoritmo = (algoritmo: Algoritmo) => {
    const config = CONFIG_ALGORITMOS[algoritmo];

    setNomeAlgoritmo(config.nome);
    setComplexidade(config.complexidade);
  };

  const sleep = (ms: number): Promise<void> => {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const {
    tempo,
    velocidadeRef,  
    iniciarCronometro,
    pararCronometro,
    resetarCronometro,
  } = useSortingTimer(velocidade);

  const gerarNovoArray = () => {
    if (estaOrdenando) return;
    const novoArray = Array.from({ length: TAMANHO_PADRAO }, () =>
      Math.floor(Math.random() * (ALTURA_MAXIMA - 20)) + 20
    );
    setArray(novoArray);
    setArrayBackup(novoArray);
    setComparando([]);
    devePararRef.current = false;
    
    setComparacoes(0);
    setTrocas(0);
    resetarCronometro();
  };

  const resetarVisualizador = () => {
    devePararRef.current = true; // Avisa instantaneamente os loops para pararem
    pararCronometro();
    setArray([...arrayBackup]);
    setComparando([]);
    setEstaOrdenando(false);
    setNomeAlgoritmo("Nenhum Selecionado");
    setComplexidade({ piorCaso: "---", melhorCaso: "---", espaco: "---" });
    setComparacoes(0);
    setTrocas(0);
    resetarCronometro();
  };

  // ALGORITMO: BUBBLE SORT
  const executarBubbleSort = async () => {
    if (estaOrdenando) return;

    configurarAlgoritmo("bubble");
    
    setComparacoes(0);
    setTrocas(0);
    devePararRef.current = false;
    setEstaOrdenando(true);
    iniciarCronometro();

    await bubbleSort({
      array: [...array],
      velocidade: velocidadeRef.current,
      shouldStop: () => devePararRef.current,
      sleep, // 🌟 Adicione essa linha aqui para satisfazer a interface!

      onCompare: async (i, j) => {
        setComparando([i, j]);
        setComparacoes((c) => c + 1);
        await sleep(velocidadeRef.current);
      },

      onSwap: () => setTrocas((t) => t + 1),
      onUpdate: (arr) => setArray(arr),
    });

    finalizarOrdenacao();
  };

  // ALGORITMO: SELECTION SORT
  const executarSelectionSort = async () => {
    if (estaOrdenando) return;

    configurarAlgoritmo("selection");

    setComparacoes(0);
    setTrocas(0);
    devePararRef.current = false;
    setEstaOrdenando(true);
    iniciarCronometro();

    await selectionSort({
      array: [...array],
      velocidade: velocidadeRef.current,
      shouldStop: () => devePararRef.current,
      sleep,

      onCompare: async (i, j) => {
        setComparando([i, j]);
        setComparacoes((c) => c + 1);
        await sleep(velocidadeRef.current);
      },
      onSwap: () => setTrocas((t) => t + 1),
      onUpdate: (arr) => setArray(arr),
    });

    finalizarOrdenacao();
  };

  // ALGORITMO: INSERTION SORT
  const executarInsertionSort = async () => {
    if (estaOrdenando) return;

    configurarAlgoritmo("insertion");

    setComparacoes(0);
    setTrocas(0);
    devePararRef.current = false;
    setEstaOrdenando(true);
    iniciarCronometro();

    await insertionSort({
      array: [...array],
      velocidade: velocidadeRef.current,
      shouldStop: () => devePararRef.current,
      sleep,

      onCompare: async (i, j) => {
        setComparando([i, j]);
        setComparacoes((c) => c + 1);
        await sleep(velocidadeRef.current);
      },
      onSwap: () => setTrocas((t) => t + 1),
      onUpdate: (arr) => setArray(arr),
    });

    finalizarOrdenacao();
  };

  // ALGORITMO: COCKTAIL SORT
  const executarCocktailSort = async () => {
    if(estaOrdenando) return;

    configurarAlgoritmo("cocktail");

    setComparacoes(0);
    setTrocas(0);
    devePararRef.current = false;
    setEstaOrdenando(true);
    iniciarCronometro();

    await cocktailSort({
      array: [...array],
      velocidade: velocidadeRef.current,
      shouldStop: () => devePararRef.current,
      sleep,

      onCompare: async (i, j) => {
        setComparando([i, j]);
        setComparacoes((c) => c + 1);
        await sleep(velocidadeRef.current);
      },
      onSwap: () => setTrocas((t) => t + 1),
      onUpdate: (arr) => setArray(arr),
    });

    finalizarOrdenacao();
  };

  // ALGORITMO: MERGE SORT
  const executarMergeSort = async () => {
    if (estaOrdenando) return;

    configurarAlgoritmo("merge");
    
    setComparacoes(0);
    setTrocas(0);
    devePararRef.current = false;
    setEstaOrdenando(true);
    iniciarCronometro();

    await mergeSort({
      array: [...array],
      velocidade: velocidadeRef.current,
      shouldStop: () => devePararRef.current,
      sleep,

      onCompare: async (i, j) => {
        setComparando([i, j]);
        setComparacoes((prev) => prev + 1);
        await sleep(velocidadeRef.current);
      },
      onSwap: () => setTrocas((prev) => prev + 1),
      onUpdate: (arr) => setArray(arr),
    });

    finalizarOrdenacao();
  };

  // ALGORITMO: QUICK SORT
  const executarQuickSort = async () => {
    if(estaOrdenando) return;

    configurarAlgoritmo("quick");
    
    setComparacoes(0);
    setTrocas(0);
    devePararRef.current = false;
    setEstaOrdenando(true);
    iniciarCronometro();

    let arr = [...array];
    await quicksortRecursivo(arr, 0, arr.length - 1);

    finalizarOrdenacao();
  };

  const quicksortRecursivo = async (arr: number[], inicio: number, fim: number) => {
    if (inicio >= fim || devePararRef.current) return;

    const indicePivo = await particionar(arr, inicio, fim);

    await quicksortRecursivo(arr, inicio, indicePivo - 1);
    await quicksortRecursivo(arr, indicePivo + 1, fim);
  };

  const particionar = async (arr: number[], inicio: number, fim: number): Promise<number> => {
    let pivote = arr[fim];
    let i = inicio - 1;

    for (let j = inicio; j < fim; j++) {
      if (devePararRef.current) return fim;

      setComparando([j, fim]);
      setComparacoes((prev) => prev + 1);
      await sleep(velocidadeRef.current);

      if (arr[j] < pivote) {
        i++;
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        setTrocas((prev) => prev + 1);
        setArray([...arr]);
      }
    }

    if (!devePararRef.current) {
      let temp = arr[i + 1];
      arr[i + 1] = arr[fim];
      arr[fim] = temp;

      setTrocas((prev) => prev + 1);
      setArray([...arr]);
    }

    return i + 1;
  };

  // ALGORITMO: HEAP SORT
  const executarHeapSort = async () => {
    if (estaOrdenando) return;

    configurarAlgoritmo("heap");

    setComparacoes(0);
    setTrocas(0);
    devePararRef.current = false;
    setEstaOrdenando(true);
    iniciarCronometro();

    let arr = [...array];
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      if (devePararRef.current) return;
      await heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      if (devePararRef.current) return;

      let temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;

      setTrocas((prev) => prev + 1);
      setArray([...arr]);
      await sleep(velocidadeRef.current);

      await heapify(arr, i, 0);
    }

    finalizarOrdenacao();
  };

  const heapify = async (arr: number[], tamanho: number, i: number) => {
    if (devePararRef.current) return;

    let maior = i;
    let esquerda = 2 * i + 1;
    let direita = 2 * i + 2;

    if (esquerda < tamanho) {
      setComparando([esquerda, maior]);
      setComparacoes((prev) => prev + 1);
      if (arr[esquerda] > arr[maior]) maior = esquerda;
    }

    if (direita < tamanho) {
      setComparando([direita, maior]);
      setComparacoes((prev) => prev + 1);
      if (arr[direita] > arr[maior]) maior = direita;
    }

    if (maior !== i) {
      let troca = arr[i];
      arr[i] = arr[maior];
      arr[maior] = troca;

      setTrocas((prev) => prev + 1);
      setArray([...arr]);
      await sleep(velocidadeRef.current);

      await heapify(arr, tamanho, maior);
    }
  };

  // ALGORITMO: SHELL SORT
  const executarShellSort = async () => {
    if (estaOrdenando) return;

    configurarAlgoritmo("shell");
    
    setComparacoes(0);
    setTrocas(0);
    devePararRef.current = false;
    setEstaOrdenando(true);
    iniciarCronometro();

    let arr = [...array];
    const n = arr.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      if (devePararRef.current) return;

      for (let i = gap; i < n; i++) {
        if (devePararRef.current) return;

        let atual = arr[i];
        let j = i;

        setComparando([j, j - gap]);
        setComparacoes((prev) => prev + 1);
        await sleep(velocidadeRef.current);

        while (j >= gap && arr[j - gap] > atual) {
          if (devePararRef.current) return;

          setComparando([j, j - gap]);
          setComparacoes((prev) => prev + 1);

          arr[j] = arr[j - gap];
          setTrocas((prev) => prev + 1);
          setArray([...arr]);
          await sleep(velocidadeRef.current);

          j -= gap;
        }

        arr[j] = atual;
        setArray([...arr]);
      }
    }

    finalizarOrdenacao();
  };

  const definirArray = (novoArray: number[]) => {
    if (estaOrdenando) return;

    const copia = [...novoArray];

    setArray(copia);
    setArrayBackup([...copia]);
    setComparando([]);

    devePararRef.current = false;

    setComparacoes(0);
    setTrocas(0);
    resetarCronometro();
  };

  // Função auxiliar para limpar estados no fim de qualquer execução
  const finalizarOrdenacao = () => {
    pararCronometro();
    setComparando([]);
    setEstaOrdenando(false);
  };

  return {
    array,
    comparando,
    estaOrdenando,
    velocidade,
    setVelocidade,
    nomeAlgoritmo,
    complexidade,
    comparacoes,
    trocas,
    tempo,
    gerarNovoArray,
    definirArray,
    resetarVisualizador,
    executarBubbleSort,
    executarSelectionSort,
    executarInsertionSort,
    executarCocktailSort,
    executarMergeSort,
    executarQuickSort,
    executarHeapSort,
    executarShellSort,
  };
}