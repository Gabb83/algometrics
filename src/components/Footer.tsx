import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full pt-0 border-zinc-200/60 dark:border-zinc-800/60 text-center text-xs text-zinc-400 dark:text-zinc-500 font-medium">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 select-none">
        <span>© {new Date().getFullYear()} AlgoMetrics.</span>
        <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>
        <span>
          Desenvolvido com 💙 por{" "}
          <Link 
            href="https://github.com/Gabb83" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors underline underline-offset-4 decoration-zinc-200 dark:decoration-zinc-800 hover:decoration-indigo-500"
          >
            Gabriel Evangelista
          </Link>
        </span>
      </div>
    </footer>
  );
}