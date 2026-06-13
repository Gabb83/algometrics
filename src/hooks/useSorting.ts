"use client";

import { useState, useEffect, useRef } from "react";

export type InfoComplexidade = {
  piorCaso: string;
  melhorCaso: string;
  espaco: string;
};

export function useSorting() {
  const TAMANHO_PADRAO = 24;
  const ALTURA_MAXIMA = 320;

  // Estados antigos
  const [array, setArray] = useState<number[]>([]);
  const [arrayBackup, setArrayBackup] = useState<number[]>([]);
  const [comparando, setComparando] = useState<number[]>([]);
  const [estaOrdenando, setEstaOrdenando] = useState<boolean>(false);
  const [velocidade, setVelocidade] = useState<number>(50);
  const [nomeAlgoritmo, setNomeAlgoritmo] = useState<string>("Nenhum Selecionado");
  const [deveParar, setDeveParar] = useState<boolean>(false);
  const [complexidade, setComplexidade] = useState<InfoComplexidade>({
    piorCaso: "---",
    melhorCaso: "---",
    espaco: "---",
  });

  // 🌟 NOVOS ESTADOS PARA AS MÉTRICAS EM TEMPO REAL
  const [comparacoes, setComparacoes] = useState<number>(0);
  const [trocas, setTrocas] = useState<number>(0);
  const [tempo, setTempo] = useState<number>(0);

  // Referência para controlar o intervalo do cronômetro
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const tempoInicioRef = useRef<number>(0);

  useEffect(() => {
    gerarNovoArray();
    return () => pararCronometro();
  }, []);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Funções de controle do Cronômetro
  const iniciarCronometro = () => {
    pararCronometro();
    setTempo(0);
    tempoInicioRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setTempo((Date.now() - tempoInicioRef.current) / 1000);
    }, 10); // Atualiza a cada 10ms para dar o efeito de milissegundos correndo
  };

  const pararCronometro = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const gerarNovoArray = () => {
    if (estaOrdenando) return;
    const novoArray = Array.from({ length: TAMANHO_PADRAO }, () =>
      Math.floor(Math.random() * (ALTURA_MAXIMA - 20)) + 20
    );
    setArray(novoArray);
    setArrayBackup(novoArray);
    setComparando([]);
    setDeveParar(false);
    
    // Reseta contadores ao embaralhar
    setComparacoes(0);
    setTrocas(0);
    setTempo(0);
  };

  const resetarVisualizador = () => {
    setDeveParar(true);
    pararCronometro();
    setArray([...arrayBackup]);
    setComparando([]);
    setEstaOrdenando(false);
    setNomeAlgoritmo("Nenhum Selecionado");
    setComplexidade({ piorCaso: "---", melhorCaso: "---", espaco: "---" });
    setComparacoes(0);
    setTrocas(0);
    setTempo(0);
  };

  // ALGORITMO: BUBBLE SORT
  const executarBubbleSort = async () => {
    if (estaOrdenando) return;

    setNomeAlgoritmo("Bubble Sort");
    setComplexidade({ piorCaso: "O(n²)", melhorCaso: "O(n)", espaco: "O(1)" });
    setComparacoes(0);
    setTrocas(0);
    setDeveParar(false);
    setEstaOrdenando(true);
    iniciarCronometro();

    let arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (deveParar) return;

        setComparando([j, j + 1]);
        setComparacoes((prev) => prev + 1); // 🌟 Incrementa comparação
        await sleep(velocidade);

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          
          setTrocas((prev) => prev + 1); // 🌟 Incrementa troca
          setArray([...arr]);
        }
      }
    }
    pararCronometro();
    setComparando([]);
    setEstaOrdenando(false);
  };

  // ALGORITMO: SELECTION SORT
  const executarSelectionSort = async () => {
    if (estaOrdenando) return;

    setNomeAlgoritmo("Selection Sort");
    setComplexidade({ piorCaso: "O(n²)", melhorCaso: "O(n²)", espaco: "O(1)" });
    setComparacoes(0);
    setTrocas(0);
    setDeveParar(false);
    setEstaOrdenando(true);
    iniciarCronometro();

    let arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let indiceMinimo = i;
      for (let j = i + 1; j < n; j++) {
        if (deveParar) return;

        setComparando([j, indiceMinimo]);
        setComparacoes((prev) => prev + 1); // 🌟 Incrementa comparação
        await sleep(velocidade);

        if (arr[j] < arr[indiceMinimo]) {
          indiceMinimo = j;
        }
      }
      if (indiceMinimo !== i) {
        let temp = arr[i];
        arr[i] = arr[indiceMinimo];
        arr[indiceMinimo] = temp;
        
        setTrocas((prev) => prev + 1); // 🌟 Incrementa troca
        setArray([...arr]);
      }
    }
    pararCronometro();
    setComparando([]);
    setEstaOrdenando(false);
  };

  const executarInsertionSort = async () => {
    if (estaOrdenando) return;

    setNomeAlgoritmo("Insertion Sort");
    setComplexidade({
      piorCaso: "O(n²)",
      melhorCaso: "O(n)",
      espaco: "O(1)",
    });
    
    setComparacoes(0);
    setTrocas(0);
    setDeveParar(false);
    setEstaOrdenando(true);
    iniciarCronometro();

    let arr = [...array];
    const n = arr.length;

    // O Insertion Sort começa do segundo elemento (índice 1)
    for (let i = 1; i < n; i++) {
      let atual = arr[i];
      let j = i - 1;

      // Destaca o elemento atual que estamos tentando encaixar
      setComparando([i, j]);
      setComparacoes((prev) => prev + 1);
      await sleep(velocidade);

      // Empurra os elementos maiores que o 'atual' uma posição para a frente
      while (j >= 0 && arr[j] > atual) {
        if (deveParar) return;

        // Mostra a comparação ativa acontecendo na varredura reversa
        setComparando([j, j + 1]);
        setComparacoes((prev) => prev + 1);

        arr[j + 1] = arr[j]; // Empurra o elemento para a direita
        setTrocas((prev) => prev + 1); // Conta como uma movimentação de escrita
        setArray([...arr]);
        
        await sleep(velocidade);
        j--;
      }
    
      // Insere o elemento atual na sua posição correta encontrada
      arr[j + 1] = atual;
      setArray([...arr]);
    }

    pararCronometro();
    setComparando([]);
    setEstaOrdenando(false);
  };

  const executarCocktailSort = async () => {
    if(estaOrdenando) return;

    setNomeAlgoritmo("Cocktail Sort");
    setComplexidade({
      piorCaso: "O(n²)",
      melhorCaso: "O(n)",
      espaco: "O(1)",
    });

    setComparacoes(0);
    setTrocas(0);
    setDeveParar(false);
    setEstaOrdenando(true);
    iniciarCronometro();

    let arr = [...array];
    let inicio = 0;
    let fim = arr.length - 1;
    let houveTroca = true;

    while (houveTroca) {
      houveTroca = false;

      // 1ª ETAPA: Da esquerda para a direita (Igual ao Bubble Sort)
      for (let i = inicio; i < fim; i++) {
        if (deveParar) return; // Checagem do botão Reset

        setComparando([i, i + 1]);
        setComparacoes((prev) => prev + 1);
        await sleep(velocidade);

        if (arr[i] > arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;

          setTrocas((prev) => prev + 1);
          setArray([...arr]);
          houveTroca = true;
        }
      }
      if (!houveTroca) break;

      // Reduz o 'fim' porque o maior elemento já está na posição correta
      fim--;

      // Reseta para a próxima varredura interna detectar novas trocas
      houveTroca = false;

      // 2ª ETAPA: Da direita para a esquerda (A mágica do Cocktail)
      for (let i = fim - 1; i >= inicio; i--) {
        if (deveParar) return; // Checagem do botão Reset

        setComparando([i, i + 1]);
        setComparacoes((prev) => prev + 1);
        await sleep(velocidade);

        if (arr[i] > arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;

          setTrocas((prev) => prev + 1);
          setArray([...arr]);
          houveTroca = true;
        }
      }

      inicio++;
    }

    pararCronometro();
    setComparando([]);
    setEstaOrdenando(false);
  }

  const executarMergeSort = async () => {
    if (estaOrdenando) return;

    setNomeAlgoritmo("Merge Sort");
    setComplexidade({
      piorCaso: "O(n log n)",
      melhorCaso: "O(n log n)",
      espaco: "O(n)",
    });

    setComparacoes(0);
    setTrocas(0);
    setDeveParar(false);
    setEstaOrdenando(true);
    iniciarCronometro();

    const arr = [...array];

    const merge = async (
      arr: number[],
      inicio: number,
      meio: number,
      fim: number
    ) => {
      const esquerda = arr.slice(inicio, meio + 1);
      const direita = arr.slice(meio + 1, fim + 1);

      let i = 0;
      let j = 0;
      let k = inicio;

      while (i < esquerda.length && j < direita.length) {
        if (deveParar) return;

        setComparando([inicio + i, meio + 1 + j]);
        setComparacoes((prev) => prev + 1);

        await sleep(velocidade);

        if (esquerda[i] <= direita[j]) {
          arr[k] = esquerda[i];
          i++;
        } else {
          arr[k] = direita[j];
          j++;
        }

        setTrocas((prev) => prev + 1);
        setArray([...arr]);
        k++;
      }

      while (i < esquerda.length) {
        if (deveParar) return;

        arr[k] = esquerda[i];

        setTrocas((prev) => prev + 1);
        setArray([...arr]);

        await sleep(velocidade);

        i++;
        k++;
      }

      while (j < direita.length) {
        if (deveParar) return;

        arr[k] = direita[j];

        setTrocas((prev) => prev + 1);
        setArray([...arr]);

        await sleep(velocidade);

        j++;
        k++;
      }
    };

    const mergeSort = async (
      arr: number[],
      inicio: number,
      fim: number
    ): Promise<void> => {
      if (deveParar) return;

      if (inicio >= fim) return;

      const meio = Math.floor((inicio + fim) / 2);

      await mergeSort(arr, inicio, meio);
      await mergeSort(arr, meio + 1, fim);

      await merge(arr, inicio, meio, fim);
    };

    await mergeSort(arr, 0, arr.length - 1);

    pararCronometro();
    setComparando([]);
    setEstaOrdenando(false);
  };

  const executarQuickSort = async () => {
    if(estaOrdenando) return;

    setNomeAlgoritmo("Quick Sort")
    setComplexidade({
      piorCaso: "O(n²)",
      melhorCaso: "O(n log n)",
      espaco: "O(n log n)",
    });

    setComparacoes(0);
    setTrocas(0);
    setDeveParar(false);
    setEstaOrdenando(true);
    iniciarCronometro();

    let arr = [...array];
  
    // Chamada da função recursiva auxiliar passando o array, o início (0) e o fim (n-1)
    await quicksortRecursivo(arr, 0, arr.length - 1);

    pararCronometro();
    setComparando([]);
    setEstaOrdenando(false);
  };

  const quicksortRecursivo = async (arr: number[], inicio: number, fim: number) => {
    if (inicio >= fim || deveParar) return;

    // Realiza o particionamento e pega o índice do pivô posicionado
    const indicePivo = await particionar(arr, inicio, fim);

    // Ordena recursivamente a metade esquerda e a metade direita
    await quicksortRecursivo(arr, inicio, indicePivo - 1);
    await quicksortRecursivo(arr, indicePivo + 1, fim);
  };

  const particionar = async (arr: number[], inicio: number, fim: number): Promise<number> => {
    let pivote = arr[fim]; // Escolhemos o último elemento como pivô
    let i = inicio - 1;    // Índice do menor elemento

    for (let j = inicio; j < fim; j++) {
      if (deveParar) return fim;

      // Destaca o elemento atual 'j' e o 'pivô' que estão sendo comparados
      setComparando([j, fim]);
      setComparacoes((prev) => prev + 1);
      await sleep(velocidade);

      if (arr[j] < pivote) {
        i++;
        // Faz a troca de elementos menores para a esquerda do pivô
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        setTrocas((prev) => prev + 1);
        setArray([...arr]);
      }
    }

    // Coloca o pivô na sua posição correta definitiva (entre os menores e maiores)
    if (!deveParar) {
      let temp = arr[i + 1];
      arr[i + 1] = arr[fim];
      arr[fim] = temp;

      setTrocas((prev) => prev + 1);
      setArray([...arr]);
    }

    return i + 1; // Retorna a posição do pivô
  };

  const executarHeapSort = async () => {
    if (estaOrdenando) return;

    setNomeAlgoritmo("Heap Sort");
    setComplexidade({
      piorCaso: "O(n log n)",   // Garantido! Não degrada como o Quick Sort
      melhorCaso: "O(n log n)", // Mesmo se o array estiver ordenado, ele faz a estrutura
      espaco: "O(1)",           // IN-PLACE! Diferente do Merge, não usa memória extra
    });

    setComparacoes(0);
    setTrocas(0);
    setDeveParar(false);
    setEstaOrdenando(true);
    iniciarCronometro();

    let arr = [...array];
    const n = arr.length;

    // Passo 1: Constrói a Max-Heap (organiza o array em formato de árvore binária)
    // Começamos do último nó pai e vamos subindo até a raiz
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      if (deveParar) return;
      await heapify(arr, n, i);
    }

    // Passo 2: Extrai um a um os elementos da Heap
    for (let i = n - 1; i > 0; i--) {
      if (deveParar) return;

      // O maior elemento está na raiz (índice 0). Movemos ele para o final do array.
      let temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;

      setTrocas((prev) => prev + 1);
      setArray([...arr]);
      await sleep(velocidade);

      // Reconstrói a árvore na parte restante que ainda não foi totalmente ordenada
      await heapify(arr, i, 0);
    }

    pararCronometro();
    setComparando([]);
    setEstaOrdenando(false);
  };

// Função auxiliar para transformar/manter uma subárvore com raiz no índice 'i' em uma Max-Heap
  const heapify = async (arr: number[], tamanho: number, i: number) => {
    if (deveParar) return;

    let maior = i;          // Inicializa o maior como sendo a própria raiz
    let esquerda = 2 * i + 1; // Índice do filho da esquerda na estrutura do array
    let direita = 2 * i + 2;  // Índice do filho da direita na estrutura do array

    // Se o filho da esquerda for maior que a raiz atual
    if (esquerda < tamanho) {
      setComparando([esquerda, maior]);
      setComparacoes((prev) => prev + 1);
      if (arr[esquerda] > arr[maior]) {
        maior = esquerda;
      }
    }

    // Se o filho da direita for maior que o maior encontrado até agora
    if (direita < tamanho) {
      setComparando([direita, maior]);
      setComparacoes((prev) => prev + 1);
      if (arr[direita] > arr[maior]) {
        maior = direita;
      }
    }

    // Se o maior não for a própria raiz, precisamos ajustar a árvore fazendo a troca
    if (maior !== i) {
      let troca = arr[i];
      arr[i] = arr[maior];
      arr[maior] = troca;

      setTrocas((prev) => prev + 1);
      setArray([...arr]);
      await sleep(velocidade);

      // Recursivamente ajusta a subárvore afetada pela troca
      await heapify(arr, tamanho, maior);
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
    resetarVisualizador,
    executarBubbleSort,
    executarSelectionSort,
    executarInsertionSort,
    executarCocktailSort,
    executarMergeSort,
    executarQuickSort,
    executarHeapSort,
  };
}