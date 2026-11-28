import type { useSorting } from "@/src/hooks/useSorting";
import type { Algoritmo } from "@/src/hooks/sortingConfig";

type SortingInstance = ReturnType<typeof useSorting>;

const executores: Record<Algoritmo, (sorting: SortingInstance) => void> = {
  bubble: (sorting) => sorting.executarBubbleSort(),
  selection: (sorting) => sorting.executarSelectionSort(),
  insertion: (sorting) => sorting.executarInsertionSort(),
  cocktail: (sorting) => sorting.executarCocktailSort(),
  merge: (sorting) => sorting.executarMergeSort(),
  quick: (sorting) => sorting.executarQuickSort(),
  heap: (sorting) => sorting.executarHeapSort(),
  shell: (sorting) => sorting.executarShellSort(),
};

export function executarAlgoritmo(sorting: SortingInstance, algoritmo: Algoritmo): void {
  executores[algoritmo](sorting);
}