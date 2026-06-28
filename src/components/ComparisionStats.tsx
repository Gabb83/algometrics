import { InfoComplexidade } from "@/src/hooks/useSorting";

type ComparisonStatsProps = {
  tempo: number;
  comparacoes: number;
  trocas: number;
  complexidade: InfoComplexidade;
};

type ItemProps = {
  label: string;
  value: string | number;
  color?: string;
};

function StatItem({
  label, value, color = "text-zinc-900 dark:text-zinc-100",
}: ItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-zinc-200/70 dark:border-zinc-800/70 last:border-b-0">
      <span className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {label}
      </span>

      <span className={`font-mono font-semibold ${color}`}>
        {value}
      </span>
    </div>
  );
}

export default function ComparisonStats({
  tempo, comparacoes, trocas, complexidade,
}: ComparisonStatsProps) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
      <h3 className="text-sm font-semibold mb-3 text-zinc-700 dark:text-zinc-200">Métricas</h3>
      <div className="space-y-1">
        <StatItem
          label="Tempo"
          value={`${tempo.toFixed(2)} s`}
          color="text-indigo-600 dark:text-indigo-400"
        />

        <StatItem
          label="Comparações"
          value={comparacoes}
          color="text-amber-600 dark:text-amber-400"
        />

        <StatItem
          label="Trocas"
          value={trocas}
          color="text-purple-600 dark:text-purple-400"
        />

        <StatItem
          label="Melhor Caso"
          value={complexidade.melhorCaso}
          color="text-emerald-600 dark:text-emerald-400"
        />

        <StatItem
          label="Pior Caso"
          value={complexidade.piorCaso}
          color="text-rose-600 dark:text-rose-400"
        />

        <StatItem
          label="Espaço"
          value={complexidade.espaco}
          color="text-sky-600 dark:text-sky-400"
        />

      </div>
    </div>
  );
}