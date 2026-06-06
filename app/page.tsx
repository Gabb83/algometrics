"use client";

import Button from "@/src/components/Button";
import { useState, useEffect } from "react";

export default function Home() {
  // CONFIGURAÇÕES INICIAIS
  const TAMANHO_PADRAO = 20;
  const ALTURA_MAXIMA = 320; // em pixels para o gráfico

  // ESTADOS (STATES)
  const [array, setArray] = useState<number[]>([]);
  const [comparando, setComparando] = useState<number[]>([]);
  const [estaOrdenando, setEstaOrdenando] = useState<boolean>(false);
  const [velocidade, setVelocidade] = useState<number>(50); // em milissegundos

  // Gera um array aleatório assim que a página carrega
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

  // ALGORITMO: BUBBLE SORT
  const executarBubbleSort = async () => {
    if (estaOrdenando) return;
    setEstaOrdenando(true);

    let arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Define quais índices estão sendo comparados na iteração atual
        setComparando([j, j + 1]);
        await sleep(velocidade);

        if (arr[j] > arr[j + 1]) {
          // Troca os elementos de lugar
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          // Atualiza o estado para refletir a troca visualmente
          setArray([...arr]);
        }
      }
    }

    // Finalizado! Reseta os estados visuais
    setComparando([]);
    setEstaOrdenando(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black text-zinc-900 dark:text-zinc-50 transition-colors">
      {/* HEADER / NAVBAR */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-8 py-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 gap-4">
        <h1 className="text-xl font-bold tracking-tight bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          AlgoMetrics
        </h1>
        
        {/* CONTROLES */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Slider de Velocidade */}
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-zinc-500">Velocidade:</span>
            <input
              type="range"
              min="10"
              max="200"
              step="10"
              value={velocidade}
              onChange={(e) => setVelocidade(Number(e.target.value))}
              disabled={estaOrdenando}
              className="accent-indigo-600 disabled:opacity-50 cursor-pointer"
            />
          </div>

          <button
            onClick={gerarNovoArray}
            disabled={estaOrdenando}
            className="px-4 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition disabled:opacity-40 font-medium"
          >
            Embaralhar
          </button>

          
        </div>
      </header>

      <main className="grid grid-cols-10">
        <section className="bg-white col-span-2">
          <h2>Algoritmos de Ordenação</h2>
          <div className="flex flex-col gap-3 p-5">
            <Button
              onClick={executarBubbleSort} 
              disabled={estaOrdenando} 
              status={estaOrdenando} 
              label="Bubble Sort"
            />
          </div>
        </section>
        <section className="col-span-8 flex justify-center items-center py-8">
          <div className="flex items-end justify-center gap-1 sm:gap-2 w-full max-w-4xl h-[400px] bg-white dark:bg-zinc-950 rounded-2xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-900">
          {array.map((valor, indice) => {
            const isComparando = comparando.includes(indice);

            return (
              <div
                key={indice}
                style={{ height: `${valor}px` }}
                className={`flex-1 rounded-t-sm sm:rounded-t-md transition-colors duration-700 ease-out ${
                  isComparando
                    ? "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)] z-10"
                    : "bg-indigo-500/80 dark:bg-indigo-600/80 hover:bg-indigo-500"
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