type SortingVisualizerProps = {
  array: number[];
  comparando: number[];
};

export default function SortingVisualizer({ array, comparando }: SortingVisualizerProps) {
  return (
    <div className="flex items-end justify-center gap-1.5 w-full h-95 bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-xs border border-zinc-200/60 dark:border-zinc-800/60 mx-auto">
      {array.map((valor, indice) => {
        const isComparando = comparando.includes(indice);

        return (
          <div
            key={indice}
            style={{ height: `${valor}px` }}
            className={`flex-1 rounded-t-md transition-colors duration-150 ease-in-out ${
              isComparando
                ? "bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.6)] z-10"
                : "bg-indigo-600/85 dark:bg-indigo-500/85 hover:bg-indigo-500"
            }`}
          ><p className="text-sm text-center py-1">{valor}</p></div>
        );
      })}
    </div>
  );
}