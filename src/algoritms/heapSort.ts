import { SortingContext } from "./types/SortingContext";

export async function heapSort(ctx: SortingContext) {
  const arr = [...ctx.array];
  const n = arr.length;

  async function heapify(
    tamanho: number,
    indice: number
  ): Promise<void> {
    if (ctx.shouldStop()) return;

    let maior = indice;
    const esquerda = 2 * indice + 1;
    const direita = 2 * indice + 2;

    if (esquerda < tamanho) {
      await ctx.onCompare(esquerda, maior);
      if (ctx.shouldStop()) return;

      if (arr[esquerda] > arr[maior]) {
        maior = esquerda;
      }
    }

    if (direita < tamanho) {
      await ctx.onCompare(direita, maior);
      if (ctx.shouldStop()) return;

      if (arr[direita] > arr[maior]) {
        maior = direita;
      }
    }

    if (maior !== indice) {
      [arr[indice], arr[maior]] = [arr[maior], arr[indice]];

      ctx.onSwap();
      ctx.onUpdate([...arr]);

      await ctx.sleep(ctx.velocidade);
      await heapify(tamanho, maior);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (ctx.shouldStop()) return;
    await heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    if (ctx.shouldStop()) return;

    [arr[0], arr[i]] = [arr[i], arr[0]];

    ctx.onSwap();
    ctx.onUpdate([...arr]);

    await ctx.sleep(ctx.velocidade);
    await heapify(i, 0);
  }
}
