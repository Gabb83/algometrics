type HeaderProps = {
  velocidade: number
  setVelocidade: (v: number) => void;
  disabled: boolean;
  onEmbaralhar: () => void;
}

export default function Header({
  velocidade, setVelocidade, disabled, onEmbaralhar
}: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between px-8 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 gap-4 z-10 shadow-xs">
      <h1 className="text-xl font-bold tracking-tight bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
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
          className="group flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-900/60 hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:pointer-events-none shadow-xs cursor-pointer"
        >
          <svg 
            className="w-4 h-4 text-zinc-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-transform duration-500 group-hover:rotate-180" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M21 24v-5h-.581m0 0a8.003 8.003 0 11-15.357-2" />
          </svg>
          
          Embaralhar
        </button>
      </div>
    </header>
  );
}