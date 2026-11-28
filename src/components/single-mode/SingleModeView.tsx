import Button from "@/src/components/Button";
import Footer from "@/src/components/Footer";
import MetricsCards from "@/src/components/MetricsCard";
import SortingVisualizer from "@/src/components/SortingVisualizer";
import type { useSorting } from "@/src/hooks/useSorting";

interface SingleModeViewProps {
  sorting: ReturnType<typeof useSorting>;
}

export default function SingleModeView({
  sorting,
}: SingleModeViewProps) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-10 flex-1 overflow-hidden">
      <section className="col-span-1 md:col-span-2 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-6 overflow-y-auto">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase mb-3">
          Algoritmos Simples
        </h2>

        <div className="flex flex-col gap-2.5">
          <Button
            onClick={sorting.executarBubbleSort}
            disabled={sorting.estaOrdenando}
            status={
              sorting.estaOrdenando &&
              sorting.nomeAlgoritmo === "Bubble Sort"
            }
            label="Bubble Sort"
          />
          <Button
            onClick={sorting.executarSelectionSort}
            disabled={sorting.estaOrdenando}
            status={
              sorting.estaOrdenando &&
              sorting.nomeAlgoritmo === "Selection Sort"
            }
            label="Selection Sort"
          />
          <Button
            onClick={sorting.executarInsertionSort}
            disabled={sorting.estaOrdenando}
            status={
              sorting.estaOrdenando &&
              sorting.nomeAlgoritmo === "Insertion Sort"
            }
            label="Insertion Sort"
          />
          <Button
            onClick={sorting.executarCocktailSort}
            disabled={sorting.estaOrdenando}
            status={
              sorting.estaOrdenando &&
              sorting.nomeAlgoritmo === "Cocktail Sort"
            }
            label="Cocktail Sort"
          />
        </div>

        <h2 className="text-xs font-semibold text-zinc-400 uppercase mt-8 mb-3">
          Algoritmos Avançados
        </h2>

        <div className="flex flex-col gap-2.5">
          <Button
            onClick={sorting.executarMergeSort}
            disabled={sorting.estaOrdenando}
            status={
              sorting.estaOrdenando &&
              sorting.nomeAlgoritmo === "Merge Sort"
            }
            label="Merge Sort"
          />
          <Button
            onClick={sorting.executarQuickSort}
            disabled={sorting.estaOrdenando}
            status={
              sorting.estaOrdenando &&
              sorting.nomeAlgoritmo === "Quick Sort"
            }
            label="Quick Sort"
          />
          <Button
            onClick={sorting.executarHeapSort}
            disabled={sorting.estaOrdenando}
            status={
              sorting.estaOrdenando &&
              sorting.nomeAlgoritmo === "Heap Sort"
            }
            label="Heap Sort"
          />
          <Button
            onClick={sorting.executarShellSort}
            disabled={sorting.estaOrdenando}
            status={
              sorting.estaOrdenando &&
              sorting.nomeAlgoritmo === "Shell Sort"
            }
            label="Shell Sort"
          />
        </div>
      </section>

      <section className="col-span-1 md:col-span-8 p-5 flex flex-col gap-5 overflow-y-auto">
        <MetricsCards
          nomeAlgoritmo={sorting.nomeAlgoritmo}
          complexidade={sorting.complexidade}
          comparacoes={sorting.comparacoes}
          trocas={sorting.trocas}
        />

        <SortingVisualizer
          array={sorting.array}
          comparando={sorting.comparando}
        />

        <Footer />
      </section>
    </main>
  );
}