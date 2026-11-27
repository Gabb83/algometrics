import { SortingContext } from "./types/SortingContext";

export async function shellSort(ctx: SortingContext) {
  const arr = [...ctx.array];
  const n = arr.length;

  for(let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    if (ctx.shouldStop()) return;

    for (let i = gap; i < n; i++) {
      if (ctx.shouldStop()) return;

      const atual = arr[i];
      let j = i;

      await ctx.onCompare(j, j - gap);

      while (j >= gap && arr[j - gap] > atual) {
        if (ctx.shouldStop()) return;
        await ctx.onCompare(j, j - gap);

        if (ctx.shouldStop()) return;
        arr[j] = arr[j - gap];

        ctx.onSwap();
        ctx.onUpdate([...arr]);

        j -= gap;
      }

      arr[j] = atual;
      ctx.onUpdate([...arr]);
    }
  }
}