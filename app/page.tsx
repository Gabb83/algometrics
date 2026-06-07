"use client";

import Button from "@/src/components/Button";
import Header from "@/src/components/Header";
import MetricsCards from "@/src/components/MetricsCard";
import SortingVisualizer from "@/src/components/SortingVisualizer";
import { useSorting } from "@/src/hooks/useSorting";

export default function Home() {
  const {
    array, comparando,
    estaOrdenando, velocidade,
    setVelocidade, nomeAlgoritmo,
    complexidade, gerarNovoArray,
    executarBubbleSort, executarSelectionSort,
    executarInsertionSort,
  } = useSorting();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors">
      <Header
        velocidade={velocidade}
        setVelocidade={setVelocidade}
        disabled={estaOrdenando}
        onEmbaralhar={gerarNovoArray}
      />

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
          <MetricsCards nomeAlgoritmo={nomeAlgoritmo} complexidade={complexidade} />
          <SortingVisualizer array={array} comparando={comparando} />
        </section>
      </main>
    </div>
  );
}