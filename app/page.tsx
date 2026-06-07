"use client";

import Button from "@/src/components/Button";
import { useState, useEffect } from "react";

// Definição do tipo para as informações de complexidade
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
  
  // Estado para armazenar as métricas do algoritmo atual
  const [complexidade, setComplexidade] = useState<InfoComplexidade>({
    piorCaso: "---",
    melhorCaso: "---",
    espaco: "---",
  });

  // Gera o primeiro array automaticamente ao carregar a página
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

  // ALGORITMO 2: SELECTION SORT (Temporário até fazermos a lógica)
  const executarSelectionSort = () => {
    if (estaOrdenando) return;
    setComplexidade({
      piorCaso: "O(n²)",
      melhorCaso: "O(n²)",
      espaco: "O(1)",
    });
    alert("Selection Sort em breve! O card já mostra as complexidades reais dele.");
  };

  // ALGORITMO 3: INSERTION SORT (Temporário até fazermos a lógica)
  const executarInsertionSort = () => {
    if (estaOrdenando) return;
    setComplexidade({
      piorCaso: "O(n²)",
      melhorCaso: "O(n)",
      espaco: "O(1)",
    });
    alert("Insertion Sort em breve! O card já mostra as complexidades reais dele.");
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors">
      
      {/* HEADER / NAVBAR */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-8 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 gap-4 z-10 shadow-xs">
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          AlgoMetrics
        </h1>
        
        {/* CONTROLES TÉCNICOS */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-xl">
            <span className="text-zinc-500 dark:text-zinc-400">Velocidade:</span>
            <input
              type="range"
              min="10"
              max="200"
              step="10"
              value={velocidade}
              onChange={(e) => setVelocidade(Number(e.target.value))}
              disabled={estaOrdenando}
              className="accent-indigo-600 disabled:opacity-50 cursor-pointer h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none"
            />
            <span className="text-xs text-indigo-600 dark:text-indigo-400 w-12 text-right">{velocidade}ms</span>
          </div>

          <button
            onClick={gerarNovoArray}
            disabled={estaOrdenando}
            className="px-4 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none font-medium shadow-2xs"
          >
            Embaralhar
          </button>
        </div>
      </header>

      {/* CORPO PRINCIPAL */}
      <main className="grid grid-cols-1 md:grid-cols-10 flex-1">
        
        {/* MENU LATERAL */}
        <section className="col-span-1 md:col-span-2 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between gap-6">
          
          {/* Seção dos Botões */}
          <div>
            <h2 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
              Algoritmos Simples
            </h2>
            <div className="flex flex-col gap-2.5">
              <Button
                onClick={executarBubbleSort} 
                disabled={estaOrdenando} 
                status={estaOrdenando} 
                label="Bubble Sort"
              />
              <Button
                onClick={executarSelectionSort} 
                disabled={estaOrdenando} 
                status={false} 
                label="Selection Sort"
              />
              <Button
                onClick={executarInsertionSort} 
                disabled={estaOrdenando} 
                status={false} 
                label="Insertion Sort"
              />
            </div>
          </div>

          {/* CARD DE COMPLEXIDADE (BIG O) */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 bg-zinc-50 dark:bg-zinc-950/50">
            <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
              Complexidade Big O
            </h3>
            
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 dark:text-zinc-400 text-xs">Pior Caso:</span>
                <span className="font-mono font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded text-xs">
                  {complexidade.piorCaso}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 dark:text-zinc-400 text-xs">Melhor Caso:</span>
                <span className="font-mono font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded text-xs">
                  {complexidade.melhorCaso}
                </span>
              </div>

              <div className="border-t border-zinc-200 dark:border-zinc-800 my-1 pt-2 flex justify-between items-center">
                <span className="text-zinc-500 dark:text-zinc-400 text-xs">Espaço:</span>
                <span className="font-mono font-medium text-blue-500 bg-blue-50 dark:bg-blue-950/30 px-2 py-0.5 rounded text-xs">
                  {complexidade.espaco}
                </span>
              </div>
            </div>
          </div>

        </section>

        {/* CONTAINER DO GRÁFICO */}
        <section className="col-span-1 md:col-span-8 flex justify-center items-center p-6 md:p-12 bg-zinc-50 dark:bg-zinc-950">
          
          <div className="flex items-end justify-center gap-1.5 w-full max-w-4xl h-[450px] bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-xs border border-zinc-200/60 dark:border-zinc-800/60">
            <p>Bubble Sort</p>
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