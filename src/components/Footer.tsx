export default function Footer() {
  return (
    <footer className="w-full pt-0 border-zinc-200/60 dark:border-zinc-800/60 text-center text-xs text-zinc-400 dark:text-zinc-500 font-medium">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 select-none">
        <span>© {new Date().getFullYear()} AlgoMetrics.</span>
      </div>
    </footer>
  );
}