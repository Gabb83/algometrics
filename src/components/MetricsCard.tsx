import { InfoComplexidade } from "@/src/hooks/useSorting";

type MetricsCardsProps = {
  nomeAlgoritmo: string;
  complexidade: InfoComplexidade;
};

export default function MetricsCards({ nomeAlgoritmo, complexidade }: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col justify-center">
        <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Algoritmo</p>
        <p className="text-base font-bold text-indigo-600 dark:text-indigo-400 truncate mt-1">{nomeAlgoritmo}</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
        <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Pior Caso</p>
        <p className="text-2xl font-mono font-bold text-rose-500 mt-0.5">{complexidade.piorCaso}</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
        <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Melhor Caso</p>
        <p className="text-2xl font-mono font-bold text-emerald-500 mt-0.5">{complexidade.melhorCaso}</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
        <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Espaço (Memória)</p>
        <p className="text-2xl font-mono font-bold text-blue-500 mt-0.5">{complexidade.espaco}</p>
      </div>
    </div>
  );
}