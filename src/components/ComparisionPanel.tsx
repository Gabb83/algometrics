import SortingVisualizer from "./SortingVisualizer";
import { InfoComplexidade } from "../hooks/useSorting";
import ComparisonStats from "./ComparisionStats";

type ComparisonPanelProps = {
  nomeAlgoritmo: string;
  array: number[];
  comparando: number[];

  complexidade: InfoComplexidade;
  comparacoes: number;
  trocas: number;
  tempo: number;
};

export default function ComparisonPanel({
  nomeAlgoritmo, array, comparando, complexidade, comparacoes, trocas, tempo,
}: ComparisonPanelProps) {
  return (
    <section className="flex flex-col h-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs overflow-hidden">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-400">
            Algoritmo
          </p>
          <h2 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            {nomeAlgoritmo}
          </h2>
        </div>
        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {/* Visualizador */}
      <div className="flex-1 p-5">
        <SortingVisualizer
          array={array}
          comparando={comparando}
        />
      </div>

      {/* Métricas */}
      <div className="p-5 pt-0">
        <ComparisonStats
          tempo={tempo}
          comparacoes={comparacoes}
          trocas={trocas}
          complexidade={complexidade}
        />
      </div>
    </section>
  );
}
