type SortingVisualizerProps = {
  array: number[];
  comparando: number[];
};

export default function SortingVisualizer({ array, comparando }: SortingVisualizerProps) {
  const maiorValor = Math.max(...array, 1);

return (
  <div className="flex items-end justify-center gap-1.5 w-full h-95 bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-xs border border-zinc-200/60 dark:border-zinc-800/60 mx-auto overflow-hidden">
    {array.map((valor, indice) => {
      const isComparando = comparando.includes(indice);
      
      // 🛠️ Ajuste 1: Altura calculada em % para que o gráfico nunca vase do container h-95
      const alturaPercentual = (valor / maiorValor) * 100;

      return (
        <div
          key={indice}
          style={{ height: `${alturaPercentual}%` }}
          className={`
            relative flex-1 rounded-t-md transition-all duration-150 ease-in-out group/bar
            ${isComparando
              ? "bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.6)] z-10"
              : "bg-indigo-600/85 dark:bg-indigo-500/85 hover:bg-indigo-500"
            }
          `}
        >
          {/* 🛠️ Ajuste 2: Texto inteligente. Ele fica invisível se a tela encolher muito (em telas menores que 'sm'), 
              mas aparece magicamente em um lindo 'tooltip flutuante' se o usuário passar o mouse! */}
          <p className="
            absolute -top-5 left-1/2 -translate-x-1/2 
            hidden sm:block text-xs font-bold text-zinc-500 dark:text-zinc-400 
            group-hover/bar:block group-hover/bar:text-indigo-600 dark:group-hover/bar:text-indigo-400
            transition-colors whitespace-nowrap
          ">
            {valor}
          </p>

          {/* Tooltip de Fallback para telas micro (mobile/notebooks pequenos) */}
          <span className="
            sm:hidden absolute -top-8 left-1/2 -translate-x-1/2 
            bg-zinc-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 
            group-hover/bar:opacity-100 transition-opacity pointer-events-none z-30
          ">
            {valor}
          </span>
        </div>
      );
    })}
  </div>
);
}