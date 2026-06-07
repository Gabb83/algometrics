"use client";

import Button from "@/src/components/Button";
import Header from "@/src/components/Header";
import { useState, useEffect } from "react";

type InfoComplexidade = {
  piorCaso: string;
  melhorCaso: string;
  espaco: string;
};

export default function Home() {
  // CONFIGURAÇÕES INICIAIS
  const TAMANHO_PADRAO = 24; 
  const ALTURA_MAXIMA = 320; 

  // ESTADOS (STATES)
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

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors">
      <Header
        velocidade={velocidade}
        setVelocidade={setVelocidade}
        disabled={estaOrdenando}
        onEmbaralhar={gerarNovoArray}
      />

      {/* CORPO PRINCIPAL */}
      <main className="grid grid-cols-1 md:grid-cols-10 flex-1">
        
        {/* MENU LATERAL */}
        <section className="col-span-1 md:col-span-2 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-6">
          <div>
            <h2 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
              Algoritmos Simples
            </h2>
            <div className="flex flex-col gap-2.5">
              <Button
                onClick={executarBubbleSort} 
                disabled={estaOrdenando} 
                status={estaOrdenando && nomeAlgoritmo === "Bubble Sort"} 
                label="Bubble Sort"
              />
              <Button
                onClick={executarSelectionSort} 
                disabled={estaOrdenando} 
                status={estaOrdenando && nomeAlgoritmo === "Selection Sort"} 
                label="Selection Sort"
              />
              <Button
                onClick={executarInsertionSort} 
                disabled={estaOrdenando} 
                status={estaOrdenando && nomeAlgoritmo === "Insertion Sort"} 
                label="Insertion Sort"
              />
            </div>
          </div>
        </section>

        {/* ÁREA DO GRÁFICO E CARDS DE COMPLEXIDADE */}
        <section className="col-span-1 md:col-span-8 flex flex-col p-6 gap-6 bg-zinc-50 dark:bg-zinc-950">
          
          {/* SEÇÃO SUPREMA: CARDS DE METRICAS */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
            
            {/* CARD 0: Nome do Algoritmo Ativo */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col justify-center">
              <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Algoritmo</p>
              <p className="text-base font-bold text-indigo-600 dark:text-indigo-400 truncate mt-1">{nomeAlgoritmo}</p>
            </div>

            {/* CARD 1: Pior Caso */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
              <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Pior Caso</p>
              <p className="text-2xl font-mono font-bold text-rose-500 mt-0.5">{complexidade.piorCaso}</p>
            </div>

            {/* CARD 2: Melhor Caso */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
              <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Melhor Caso</p>
              <p className="text-2xl font-mono font-bold text-emerald-500 mt-0.5">{complexidade.melhorCaso}</p>
            </div>

            {/* CARD 3: Espaço Auxiliar */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
              <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Espaço (Memória)</p>
              <p className="text-2xl font-mono font-bold text-blue-500 mt-0.5">{complexidade.espaco}</p>
            </div>

          </div>

          {/* CONTAINER PRINCIPAL DO GRÁFICO */}
          <div className="flex items-end justify-center gap-1.5 w-full max-w-4xl h-95 bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-xs border border-zinc-200/60 dark:border-zinc-800/60 mx-auto">
            {array.map((valor, indice) => {
              const isComparando = comparando.includes(indice);

              return (
                <div
                  key={indice}
                  style={{ height: `${valor}px` }}
                  className={`flex-1 rounded-t-md transition-colors duration-150 ease-in-out ${
                    isComparando
                      ? "bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.6)] z-10"
                      : "bg-indigo-600/85 dark:bg-indigo-500/85 hover:bg-indigo-500"
                  }`}
                />
              );
            })}
          </div>

        </section>

      </main>
    </div>
  );
}