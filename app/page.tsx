"use client";

import Button from "@/src/components/Button";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import MetricsCards from "@/src/components/MetricsCard";
import SortingVisualizer from "@/src/components/SortingVisualizer";
import { useSorting } from "@/src/hooks/useSorting";
import { useState } from "react";

export default function Home() {
  const left = useSorting();
  const right = useSorting();

  const [viewMode, setViewMode] = useState<"single" | "compare">("single");

  return (
    // 🛠️ Ajuste 1: Trocamos 'min-h-screen' por 'h-screen' e adicionamos 'overflow-hidden' para prender o layout na tela
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-50 font-sans dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors">
      <Header
        velocidade={left.velocidade}
        setVelocidade={left.setVelocidade}
        disabled={left.estaOrdenando}
        onEmbaralhar={left.gerarNovoArray}
        viewMode={viewMode}
        onAlternarModoComparar={() => setViewMode(v => v === "single" ? "compare" : "single")}
      />

      {/* 🛠️ Ajuste 2: Adicionado 'overflow-hidden' no corpo principal para controlar as barras laterais */}
      <main className="grid grid-cols-1 md:grid-cols-10 flex-1 overflow-hidden">        
        
        {/* MENU LATERAL */}
        {/* 🛠️ Ajuste 3: Adicionado 'overflow-y-auto' na sidebar caso a tela seja muito baixa para os botões */}
        <section className="col-span-1 md:col-span-2 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-6 overflow-y-auto">
          <div>
            <h2 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
              Algoritmos Simples
            </h2>
            <div className="flex flex-col gap-2.5">
              <Button
                onClick={left.executarBubbleSort} 
                disabled={left.estaOrdenando} 
                status={left.estaOrdenando && left.nomeAlgoritmo === "Bubble Sort"} 
                label="Bubble Sort"
              />
              <Button
                onClick={left.executarSelectionSort} 
                disabled={left.estaOrdenando} 
                status={left.estaOrdenando && left.nomeAlgoritmo === "Selection Sort"} 
                label="Selection Sort"
              />
              <Button
                onClick={left.executarInsertionSort} 
                disabled={left.estaOrdenando} 
                status={left.estaOrdenando && left.nomeAlgoritmo === "Insertion Sort"} 
                label="Insertion Sort"
              />
              {/* 🐛 Inseto Corrigido: O status estava checando "Insertion Sort" em vez de "Cocktail Sort" */}
              <Button
                onClick={left.executarCocktailSort} 
                disabled={left.estaOrdenando} 
                status={left.estaOrdenando && left.nomeAlgoritmo === "Cocktail Sort"} 
                label="Cocktail Sort"
              />
            </div>

            <h2 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3 mt-6">
              Algoritmos Avançados
            </h2>
            <div className="flex flex-col gap-2.5">
              <Button
                onClick={left.executarMergeSort} 
                disabled={left.estaOrdenando} 
                status={left.estaOrdenando && left.nomeAlgoritmo === "Merge Sort"} 
                label="Merge Sort"
              />
              <Button
                onClick={left.executarQuickSort} 
                disabled={left.estaOrdenando} 
                status={left.estaOrdenando && left.nomeAlgoritmo === "Quick Sort"} 
                label="Quick Sort"
              />
              <Button
                onClick={left.executarHeapSort} 
                disabled={left.estaOrdenando} 
                status={left.estaOrdenando && left.nomeAlgoritmo === "Heap Sort"} 
                label="Heap Sort"
              />
              {/* 🐛 Inseto Corrigido: O onClick estava chamando 'executarHeapSort' e o status checando 'Shell Sort' */}
              <Button
                onClick={left.executarShellSort} 
                disabled={left.estaOrdenando} 
                status={left.estaOrdenando && left.nomeAlgoritmo === "Shell Sort"} 
                label="Shell Sort"
              />
            </div>
          </div>
        </section>

        {/* ÁREA DO GRÁFICO E CARDS DE COMPLEXIDADE */}
        {/* 🛠️ Ajuste 4: 'overflow-y-auto' garante que as barras ou os cards nunca quebrem o limite da janela */}
        <section className="w-full col-span-1 md:col-span-8 flex flex-col p-4.5 gap-4.5 bg-zinc-50 dark:bg-zinc-950 overflow-x-auto justify-between">
          <div className="flex flex-col gap-4">
            
            { viewMode === "single" ? (
              <>
                <MetricsCards
                  nomeAlgoritmo={left.nomeAlgoritmo}
                  complexidade={left.complexidade}
                  comparacoes={left.comparacoes}
                  trocas={left.trocas}
                  tempo={left.tempo}
                />

                <SortingVisualizer
                  array={left.array}
                  comparando={left.comparando}
                />
              </>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <MetricsCards
                    nomeAlgoritmo={left.nomeAlgoritmo}
                    complexidade={left.complexidade}
                    comparacoes={left.comparacoes}
                    trocas={left.trocas}
                    tempo={left.tempo}
                  />
                  <SortingVisualizer
                    array={left.array}
                    comparando={left.comparando}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <MetricsCards
                    nomeAlgoritmo={right.nomeAlgoritmo}
                    complexidade={right.complexidade}
                    comparacoes={right.comparacoes}
                    trocas={right.trocas}
                    tempo={right.tempo}
                  />

                  <SortingVisualizer
                    array={right.array}
                    comparando={right.comparando}
                  />
                </div>
              </div>
            )}
          </div>

          <Footer />
        </section>
      </main>
    </div>
  );
}