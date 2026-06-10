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
  };
}