import { memo, useMemo } from "react";
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

const StatItem = memo(({ 
  label, 
  value, 
  color = "text-zinc-900 dark:text-zinc-100" 
}: ItemProps) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-zinc-200/70 dark:border-zinc-800/70 last:border-b-0">
      <dt className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {label}
      </dt>
      <dd className={`m-0 font-mono font-semibold ${color}`}>
        {value}
      </dd>
    </div>
  );
});

StatItem.displayName = "StatItem";

const formatNumber = (num: number) => new Intl.NumberFormat('pt-BR').format(num);

export default function ComparisonStats({
  tempo, comparacoes, trocas, complexidade,
}: ComparisonStatsProps) {
  const stats = useMemo(() => [
    { label: "Tempo", value: `${tempo.toFixed(2)} s`, color: "text-indigo-600 dark:text-indigo-400" },
    { label: "Comparações", value: formatNumber(comparacoes), color: "text-amber-600 dark:text-amber-400" },
    { label: "Trocas", value: formatNumber(trocas), color: "text-purple-600 dark:text-purple-400" },
    { label: "Melhor Caso", value: complexidade.melhorCaso, color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Pior Caso", value: complexidade.piorCaso, color: "text-rose-600 dark:text-rose-400" },
    { label: "Espaço", value: complexidade.espaco, color: "text-sky-600 dark:text-sky-400" },
  ], [tempo, comparacoes, trocas, complexidade]);

  return (
    <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
      <h3 className="text-sm font-semibold mb-3 text-zinc-700 dark:text-zinc-200">
        Métricas
      </h3>

      <dl className="space-y-1 m-0">
        {stats.map((stat) => (
          <StatItem
            key={stat.label}
            label={stat.label}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </dl>
    </section>
  );
}