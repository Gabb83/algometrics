"use client";

import { useState, useEffect, useRef } from "react";
import { useSortingTimer } from "./useSortingTimer";
import { bubbleSort } from "../algoritms/bubbleSort";
import { selectionSort } from "../algoritms/selectionSort";
import { insertionSort } from "../algoritms/insertionSort";
import { cocktailSort } from "../algoritms/cocktailSort";
import { mergeSort } from "../algoritms/mergeSort";
import { quickSort } from "../algoritms/quickSort";
import { heapSort } from "../algoritms/heapSort";
import { shellSort } from "../algoritms/shellSort";

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
    if (estaOrdenando) return;

    configurarAlgoritmo("quick");
    setComparacoes(0);
    setTrocas(0);
    devePararRef.current = false;
    setEstaOrdenando(true);
    iniciarCronometro();

    await quickSort({
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

  // ALGORITMO: HEAP SORT
  const executarHeapSort = async () => {
    if (estaOrdenando) return;

    configurarAlgoritmo("heap");
    setComparacoes(0);
    setTrocas(0);
    devePararRef.current = false;
    setEstaOrdenando(true);
    iniciarCronometro();

    await heapSort({
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

  // ALGORITMO: SHELL SORT  
  const executarShellSort = async () => {
    if (estaOrdenando) return;

    configurarAlgoritmo("shell");
    setComparacoes(0);
    setTrocas(0);
    devePararRef.current = false;
    setEstaOrdenando(true);
    iniciarCronometro();

    await shellSort({
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