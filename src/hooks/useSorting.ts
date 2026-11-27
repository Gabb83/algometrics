"use client";

import { useState, useRef } from "react";

import type { SortingContext } from "../algoritms/types/SortingContext";
import { CONFIG_ALGORITMOS, type InfoComplexidade, type Algoritmo } from "./sortingConfig";
import { useSortingArray } from "./useSortingArray";
import { useSortingTimer } from "./useSortingTimer";

import { bubbleSort } from "../algoritms/bubbleSort";
import { selectionSort } from "../algoritms/selectionSort";
import { insertionSort } from "../algoritms/insertionSort";
import { cocktailSort } from "../algoritms/cocktailSort";
import { mergeSort } from "../algoritms/mergeSort";
import { quickSort } from "../algoritms/quickSort";
import { heapSort } from "../algoritms/heapSort";
import { shellSort } from "../algoritms/shellSort";

export function useSorting() {
  const [comparando, setComparando] = useState<number[]>([]);
  const [estaOrdenando, setEstaOrdenando] = useState<boolean>(false);
  const {
    array,
    setArray,
    gerarNovoArray: gerarArrayBase,
    definirArray: definirArrayBase,
    restaurarArray,
  } = useSortingArray();
  
  const [velocidade, setVelocidade] = useState<number>(50);
  const [nomeAlgoritmo, setNomeAlgoritmo] = useState<string>("Selecionar");
  const [complexidade, setComplexidade] = useState<InfoComplexidade>({
    piorCaso: "N/D",
    melhorCaso: "N/D",
    espaco: "N/D",
  });
  
  const [comparacoes, setComparacoes] = useState<number>(0);
  const [trocas, setTrocas] = useState<number>(0);
  const devePararRef = useRef<boolean>(false);

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

    gerarArrayBase();
    setComparando([]);
    devePararRef.current = false;
    setComparacoes(0);
    setTrocas(0);
    resetarCronometro();
  };

  const resetarVisualizador = () => {
    devePararRef.current = true;
    pararCronometro();
    restaurarArray();
    setComparando([]);
    setEstaOrdenando(false);
    setNomeAlgoritmo("Nenhum Selecionado");
    setComplexidade({ piorCaso: "N/D", melhorCaso: "N/D", espaco: "N/D" });
    setComparacoes(0);
    setTrocas(0);
    resetarCronometro();
  };
  
  const executarBubbleSort = () =>
    executarAlgoritmo("bubble", bubbleSort);
  const executarSelectionSort = () =>
    executarAlgoritmo("selection", selectionSort);
  const executarInsertionSort = () =>
    executarAlgoritmo("insertion", insertionSort);
  const executarCocktailSort = () =>
    executarAlgoritmo("cocktail", cocktailSort);
  const executarMergeSort = () =>
    executarAlgoritmo("merge", mergeSort);
  const executarQuickSort = () =>
    executarAlgoritmo("quick", quickSort);
  const executarHeapSort = () =>
    executarAlgoritmo("heap", heapSort);
  const executarShellSort = () =>
    executarAlgoritmo("shell", shellSort);

  const definirArray = (novoArray: number[]) => {
    if (estaOrdenando) return;

    definirArrayBase(novoArray);
    setComparando([]);
    devePararRef.current = false;
    setComparacoes(0);
    setTrocas(0);
    resetarCronometro();
  };

  const finalizarOrdenacao = () => {
    pararCronometro();
    setComparando([]);
    setEstaOrdenando(false);
  };

  type FuncaoOrdenacao = (ctx: SortingContext) => Promise<void>;
  const executarAlgoritmo = async (algoritmo: Algoritmo, funcaoOrdenacao: FuncaoOrdenacao) => {
    if (estaOrdenando) return;

    configurarAlgoritmo(algoritmo);
    setComparacoes(0);
    setTrocas(0);
    setComparando([]);
    devePararRef.current = false;
    setEstaOrdenando(true);
    iniciarCronometro();

    const contexto: SortingContext = {
      array: [...array],
      velocidade: velocidadeRef.current,
      shouldStop: () => devePararRef.current,
      sleep,

      onCompare: async (i, j) => {
        setComparando([i, j]);
        setComparacoes((prev) => prev + 1);
        await sleep(velocidadeRef.current);
      },
      onSwap: () => {
        setTrocas((prev) => prev + 1);
      },
      onUpdate: (novoArray) => {
        setArray(novoArray);
      },
    };

    try {
      await funcaoOrdenacao(contexto);
    } finally {
      finalizarOrdenacao();
    }
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