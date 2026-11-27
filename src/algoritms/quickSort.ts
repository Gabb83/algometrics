import { SortingContext } from "./types/SortingContext";

export async function quickSort(ctx: SortingContext) {
  const arr = [...ctx.array];

  async function particionar(
    inicio: number,
    fim: number
  ): Promise<number> {
    const pivo = arr[fim];
    let i = inicio - 1;

    for (let j = inicio; j < fim; j++) {
      if (ctx.shouldStop()) return fim;
      await ctx.onCompare(j, fim);
      if (ctx.shouldStop()) return fim;

      if (arr[j] < pivo) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];

        ctx.onSwap();
        ctx.onUpdate([...arr]);
      }
    }

    if (ctx.shouldStop()) return fim;
    [arr[i + 1], arr[fim]] = [arr[fim], arr[i + 1]];

    ctx.onSwap();
    ctx.onUpdate([...arr]);

    return i + 1;
  }

  async function ordenar(inicio: number, fim: number): Promise<void> {
    if (inicio >= fim || ctx.shouldStop()) return;
    const indicePivo = await particionar(inicio, fim);

    if (ctx.shouldStop()) return;
    await ordenar(inicio, indicePivo - 1);
    await ordenar(indicePivo + 1, fim);
  }

  await ordenar(0, arr.length - 1);
}