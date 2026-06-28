type ButtonProps = {
  onClick: () => void;
  disabled: boolean;
  status: boolean;
  label: string;              
}

export default function Button({
  onClick, disabled, status, label
}: ButtonProps) {
  return (
    <button
      onClick={onClick}       
      disabled={disabled}
      className={`
        w-full px-5 py-2.5 text-sm font-semibold rounded-xl
        flex items-center justify-between
        transition-all duration-200 active:scale-[0.98] cursor-pointer
        
        ${status 
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold" 
          : "bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-900/60 hover:bg-indigo-50/20 dark:hover:bg-indigo-500/5 shadow-2xs"
        }
        
        disabled:opacity-30 disabled:pointer-events-none disabled:shadow-none
      `}
    >
      <span>{label}</span>
      
      {status ? (
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      ) : (
        <span className="text-zinc-300 dark:text-zinc-700 font-normal group-hover:text-indigo-400 transition-colors">
          →
        </span>
      )}
    </button>
  );
}