import { SortingContext } from "./types/SortingContext";

export async function mergeSort(ctx: SortingContext) {
  const arr = [...ctx.array];

  async function merge(inicio: number, meio: number, fim: number): Promise<void> {
    const esquerda = arr.slice(inicio, meio + 1);
    const direita = arr.slice(meio + 1, fim + 1);

    let i = 0;
    let j = 0;
    let k = inicio;

    while (i < esquerda.length && j < direita.length) {
      if (ctx.shouldStop()) return;
      await ctx.onCompare(inicio + i, meio + 1 + j);

      if (esquerda[i] <= direita[j]) {
        arr[k] = esquerda[i++];
      } else {
        arr[k] = direita[j++];
      }

      ctx.onSwap();
      ctx.onUpdate([...arr]);
      k++;
    }

    while (i < esquerda.length) {
      if (ctx.shouldStop()) return;
      arr[k++] = esquerda[i++];

      ctx.onSwap();
      ctx.onUpdate([...arr]);
    }

    while (j < direita.length) {
      if (ctx.shouldStop()) return;

      arr[k++] = direita[j++];

      ctx.onSwap();
      ctx.onUpdate([...arr]);
    }
  }

  async function dividir(inicio: number, fim: number): Promise<void> {
    if (ctx.shouldStop()) return;
    if (inicio >= fim) return;

    const meio = Math.floor((inicio + fim) / 2);

    await dividir(inicio, meio);
    await dividir(meio + 1, fim);
    await merge(inicio, meio, fim);
  }

  await dividir(0, arr.length - 1);
}