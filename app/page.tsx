"use client";

import Button from "@/src/components/Button";
import ComparisonPanel from "@/src/components/ComparisionPanel";
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
  const [leftAlgorithm, setLeftAlgorithm] = useState("bubble");
  const [rightAlgorithm, setRightAlgorithm] = useState("merge");

  const executarComparacao = () => {
    switch (leftAlgorithm) {
      case "bubble":
        left.executarBubbleSort();
        break;
      case "selection":
        left.executarSelectionSort();
        break;
      case "insertion":
        left.executarInsertionSort();
        break;
      case "cocktail":
        left.executarCocktailSort();
        break;
      case "merge":
        left.executarMergeSort();
        break;
      case "quick":
        left.executarQuickSort();
        break;
      case "heap":
        left.executarHeapSort();
        break;
      case "shell":
        left.executarShellSort();
        break;
    }

    switch (rightAlgorithm) {
      case "bubble":
        right.executarBubbleSort();
        break;
      case "selection":
        right.executarSelectionSort();
        break;
      case "insertion":
        right.executarInsertionSort();
        break;
      case "cocktail":
        right.executarCocktailSort();
        break;
      case "merge":
        right.executarMergeSort();
        break;
      case "quick":
        right.executarQuickSort();
        break;
      case "heap":
        right.executarHeapSort();
        break;
      case "shell":
        right.executarShellSort();
        break;
    }
  };

  return (
  <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-50 font-sans dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors">

    <Header
      velocidade={left.velocidade}
      setVelocidade={left.setVelocidade}
      disabled={left.estaOrdenando || right.estaOrdenando}
      onEmbaralhar={left.gerarNovoArray}
      viewMode={viewMode}
      onAlternarModoComparar={() =>
        setViewMode((v) => (v === "single" ? "compare" : "single"))
      }
    />

    {viewMode === "single" ? (

      // ==========================
      // MODO ÚNICO
      // ==========================
      <main className="grid grid-cols-1 md:grid-cols-10 flex-1 overflow-hidden">

        <section className="col-span-1 md:col-span-2 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-6 overflow-y-auto">

          <h2 className="text-xs font-semibold text-zinc-400 uppercase mb-3">
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

            <Button
              onClick={left.executarCocktailSort}
              disabled={left.estaOrdenando}
              status={left.estaOrdenando && left.nomeAlgoritmo === "Cocktail Sort"}
              label="Cocktail Sort"
            />

          </div>

          <h2 className="text-xs font-semibold text-zinc-400 uppercase mt-8 mb-3">
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

            <Button
              onClick={left.executarShellSort}
              disabled={left.estaOrdenando}
              status={left.estaOrdenando && left.nomeAlgoritmo === "Shell Sort"}
              label="Shell Sort"
            />

          </div>

        </section>

        <section className="col-span-1 md:col-span-8 p-5 flex flex-col gap-5 overflow-y-auto">

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

          <Footer />

        </section>

      </main>

    ) : (

      // ==========================
      // MODO COMPARAÇÃO
      // ==========================
     <main className="flex-1 overflow-y-auto bg-zinc-50/50 dark:bg-zinc-950/20 p-6 transition-colors duration-200">
  {/* 🎛️ CONTROLES DE SELEÇÃO E DISPARO */}
  <div className="flex items-center justify-left gap-4 max-w-2xl mx-auto mb-0 p-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 shadow-xs">
    <div className="relative flex-1">
      <select
        value={leftAlgorithm}
        onChange={(e) => setLeftAlgorithm(e.target.value)}
        className="w-full appearance-none rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-4 py-2.5 pr-10 text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-2xs outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:focus:ring-indigo-400/10 cursor-pointer transition-all"
      >
        <option value="bubble">Bubble Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="cocktail">Cocktail Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="quick">Quick Sort</option>
        <option value="heap">Heap Sort</option>
        <option value="shell">Shell Sort</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </div>
    </div>

    <div className="flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-lg px-3 py-1 text-xs font-bold text-zinc-500 dark:text-zinc-400 tracking-wider shadow-inner">
      VS
    </div>

    <div className="relative flex-1">
      <select
        value={rightAlgorithm}
        onChange={(e) => setRightAlgorithm(e.target.value)}
        className="w-full appearance-none rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-4 py-2.5 pr-10 text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-2xs outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:focus:ring-indigo-400/10 cursor-pointer transition-all"
      >
        <option value="bubble">Bubble Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="cocktail">Cocktail Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="quick">Quick Sort</option>
        <option value="heap">Heap Sort</option>
        <option value="shell">Shell Sort</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </div>
    </div>

    <button
      onClick={executarComparacao}
      className="px-6 py-2.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer"
    >
      Comparar
    </button>
  </div>

  {/* 📊 PAINÉIS DE VISUALIZAÇÃO LADO A LADO */}
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

    <ComparisonPanel
      nomeAlgoritmo={left.nomeAlgoritmo}
      array={left.array}
      comparando={left.comparando}
      complexidade={left.complexidade}
      comparacoes={left.comparacoes}
      trocas={left.trocas}
      tempo={left.tempo}
    />

    <ComparisonPanel
      nomeAlgoritmo={right.nomeAlgoritmo}
      array={right.array}
      comparando={right.comparando}
      complexidade={right.complexidade}
      comparacoes={right.comparacoes}
      trocas={right.trocas}
      tempo={right.tempo}
    />

</div>

  {/*<Footer />*/}
</main>

    )}
  </div>
);
}