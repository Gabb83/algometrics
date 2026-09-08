import { InfoComplexidade } from "@/src/hooks/useSorting";

type MetricsCardsProps = {
  nomeAlgoritmo: string;
  complexidade: InfoComplexidade;
  comparacoes: number;
  trocas: number;
  tempo: number;
};

export default function MetricsCards({
  nomeAlgoritmo, complexidade, comparacoes, trocas, tempo,
}: MetricsCardsProps) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 w-full">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-xs">
          <div className="flex justify-between items-center w-full">
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Algoritmo</p>
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
          </div>
          <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 truncate mt-2">{nomeAlgoritmo}</p>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500/40 dark:bg-indigo-500/30" />
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-xs">
          <div className="flex justify-between items-center w-full">
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Pior Caso</p>
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
          </div>
          <p className="text-sm font-mono font-bold text-rose-500 mt-2">{complexidade.piorCaso}</p>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500/40 dark:bg-rose-500/30" />
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-xs">
          <div className="flex justify-between items-center w-full">
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Melhor Caso</p>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>
          <p className="text-sm font-mono font-bold text-emerald-500 mt-2">{complexidade.melhorCaso}</p>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500/40 dark:bg-emerald-500/30" />
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-xs">
          <div className="flex justify-between items-center w-full">
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Espaço</p>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          </div>
          <p className="text-sm font-mono font-bold text-blue-500 mt-2">{complexidade.espaco}</p>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500/40 dark:bg-blue-500/30" />
        </div>

        <div className="bg-zinc-100/40 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-xs">
          <div className="flex justify-between items-center w-full">
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Comparações</p>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          </div>
          <p className="text-sm font-bold font-mono text-zinc-800 dark:text-zinc-100 mt-2">{comparacoes}</p>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500/30 dark:bg-amber-500/20" />
        </div>

        <div className="bg-zinc-100/40 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-xs">
          <div className="flex justify-between items-center w-full">
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Trocas (Swaps)</p>
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
          </div>
          <p className="text-sm font-bold font-mono text-zinc-800 dark:text-zinc-100 mt-2">{trocas}</p>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500/30 dark:bg-indigo-500/20" />
        </div>

        <div className="bg-zinc-100/40 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-xs">
          <div className="flex justify-between items-center w-full">
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Tempo</p>
            <svg className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-2">
            {tempo.toFixed(2)}<span className="text-xs font-sans font-medium text-zinc-400 ml-0.5">s</span>
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500/30 dark:bg-indigo-500/20" />
        </div>
      </div>
    </div>
  );
}