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
    tempo, trocas, comparacoes,
    executarBubbleSort, executarSelectionSort, executarInsertionSort, executarCocktailSort, 
    executarMergeSort, executarQuickSort, executarHeapSort, executarShellSort,
  } = useSorting();

  return (
    // 🛠️ Ajuste 1: Trocamos 'min-h-screen' por 'h-screen' e adicionamos 'overflow-hidden' para prender o layout na tela
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-50 font-sans dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors">
      <Header
        velocidade={velocidade}
        setVelocidade={setVelocidade}
        disabled={estaOrdenando}
        onEmbaralhar={gerarNovoArray}
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
              {/* 🐛 Inseto Corrigido: O status estava checando "Insertion Sort" em vez de "Cocktail Sort" */}
              <Button
                onClick={executarCocktailSort} 
                disabled={estaOrdenando} 
                status={estaOrdenando && nomeAlgoritmo === "Cocktail Sort"} 
                label="Cocktail Sort"
              />
            </div>

            <h2 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3 mt-6">
              Algoritmos Avançados
            </h2>
            <div className="flex flex-col gap-2.5">
              <Button
                onClick={executarMergeSort} 
                disabled={estaOrdenando} 
                status={estaOrdenando && nomeAlgoritmo === "Merge Sort"} 
                label="Merge Sort"
              />
              <Button
                onClick={executarQuickSort} 
                disabled={estaOrdenando} 
                status={estaOrdenando && nomeAlgoritmo === "Quick Sort"} 
                label="Quick Sort"
              />
              <Button
                onClick={executarHeapSort} 
                disabled={estaOrdenando} 
                status={estaOrdenando && nomeAlgoritmo === "Heap Sort"} 
                label="Heap Sort"
              />
              {/* 🐛 Inseto Corrigido: O onClick estava chamando 'executarHeapSort' e o status checando 'Shell Sort' */}
              <Button
                onClick={executarShellSort} 
                disabled={estaOrdenando} 
                status={estaOrdenando && nomeAlgoritmo === "Shell Sort"} 
                label="Shell Sort"
              />
            </div>
          </div>
        </section>

        {/* ÁREA DO GRÁFICO E CARDS DE COMPLEXIDADE */}
        {/* 🛠️ Ajuste 4: 'overflow-y-auto' garante que as barras ou os cards nunca quebrem o limite da janela */}
        <section className="w-full col-span-1 md:col-span-8 flex flex-col p-4.5 gap-4.5 bg-zinc-50 dark:bg-zinc-950 overflow-x-auto justify-between">
          <div className="flex flex-col gap-4">
            <MetricsCards 
              nomeAlgoritmo={nomeAlgoritmo} 
              complexidade={complexidade} 
              comparacoes={comparacoes}
              trocas={trocas}
              tempo={tempo}  
            />
            <SortingVisualizer array={array} comparando={comparando} />
          </div>

          {/* ⚡ O Footer agora mora organicamente aqui embaixo, dentro do painel principal */}
          <footer className="w-full pt-0 border-zinc-200/60 dark:border-zinc-800/60 text-center text-xs text-zinc-400 dark:text-zinc-500 font-medium">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 select-none">
              <span>© {new Date().getFullYear()} AlgoMetrics.</span>
              <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>
              <span>
                Desenvolvido com 💙 por{" "}
                <a 
                  href="https://github.com/Gabb83" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors underline underline-offset-4 decoration-zinc-200 dark:decoration-zinc-800 hover:decoration-indigo-500"
                >
                  Gabriel Evangelista
                </a>
              </span>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}