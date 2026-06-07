type HeaderProps = {
  velocidade: number
  setVelocidade: (v: number) => void;
  disabled: boolean;
  onEmbaralhar: () => void;
}

export default function Header({
  velocidade, setVelocidade, disabled, onEmbaralhar
}: HeaderProps) {
  return(
    <header className="flex flex-col sm:flex-row items-center justify-between px-8 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 gap-4 z-10 shadow-xs">
      <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
        AlgoMetrics
      </h1>
      
      {/* CONTROLES TÉCNICOS */}
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-xl">
          <span className="text-zinc-500 dark:text-zinc-400">Velocidade:</span>
          <input
            type="range"
            min="10"
            max="200"
            step="10"
            value={velocidade}
            onChange={(e) => setVelocidade(Number(e.target.value))}
            disabled={disabled}
            className="accent-indigo-600 disabled:opacity-50 cursor-pointer h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none"
          />
          <span className="text-xs text-indigo-600 dark:text-indigo-400 w-12 text-right">{velocidade}ms</span>
        </div>

        <button
          onClick={onEmbaralhar}
          disabled={disabled}
          className="px-4 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none font-medium shadow-2xs"
        >
          Embaralhar
        </button>
      </div>
    </header>
  );
}