import ComparisonPanel from "@/src/components/ComparisonPanel";
import type { Algoritmo } from "@/src/hooks/sortingConfig";
import { useSorting } from "@/src/hooks/useSorting";

interface ComparisonModeViewProps {
  left: ReturnType<typeof useSorting>;
  right: ReturnType<typeof useSorting>;
  leftAlgorithm: Algoritmo;
  rightAlgorithm: Algoritmo;
  setLeftAlgorithm: (algorithm: Algoritmo) => void;
  setRightAlgorithm: (algorithm: Algoritmo) => void;
  onExecutarComparacao: () => void;
}

export default function ComparisonModeView({
  left, right, leftAlgorithm, rightAlgorithm, setLeftAlgorithm, setRightAlgorithm, onExecutarComparacao,
}: ComparisonModeViewProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-zinc-50/50 dark:bg-zinc-950/20 p-6 transition-colors duration-200">
      <div className="mb-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">🔬 Modo Comparação</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Compare dois algoritmos executando simultaneamente sobre o mesmo conjunto de dados.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 p-4">
          {/* Algoritmo A */}
          <div className="flex flex-col gap-2 min-w-60">
            <select
              value={leftAlgorithm}
              onChange={(e) => setLeftAlgorithm(e.target.value as Algoritmo)}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-4 py-3 font-semibold outline-none focus:border-indigo-500"
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
          </div>

          <div className="w-11 h-11 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-900 flex items-center justify-center">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              VS
            </span>
          </div>

          {/* Algoritmo B */}
          <div className="flex flex-col gap-2 min-w-60">
            <select
              value={rightAlgorithm}
              onChange={(e) => setRightAlgorithm(e.target.value as Algoritmo)}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-4 py-3 font-semibold outline-none focus:border-indigo-500"
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
          </div>
          
          <button
            onClick={onExecutarComparacao}
            className="group flex items-center gap-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-7 py-3 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition active:scale-95 cursor-pointer"
          >
            <svg
              className="w-5 h-5 group-hover:translate-x-0.5 transition"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 4l10 6-10 6V4z" />
            </svg>
            Iniciar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ComparisonPanel
          nomeAlgoritmo={left.nomeAlgoritmo}
          array={left.array}
          comparando={left.comparando}
          complexidade={left.complexidade}
          comparacoes={left.comparacoes}
          trocas={left.trocas}
        />

        <ComparisonPanel
          nomeAlgoritmo={right.nomeAlgoritmo}
          array={right.array}
          comparando={right.comparando}
          complexidade={right.complexidade}
          comparacoes={right.comparacoes}
          trocas={right.trocas}
        />
      </div>
    </main>
  );
}