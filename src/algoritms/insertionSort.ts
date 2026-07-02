// src/algoritms/insertionSort.ts

import { SortingContext } from "./types/SortingContext";

export async function insertionSort(ctx: SortingContext) {
  const arr = [...ctx.array];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const atual = arr[i];
    let j = i - 1;

    await ctx.onCompare(i, j);

    while (j >= 0 && arr[j] > atual) {
      if (ctx.shouldStop()) return;

      await ctx.onCompare(j, j + 1);

      arr[j + 1] = arr[j];

      ctx.onSwap();
      ctx.onUpdate([...arr]);

      j--;
    }

    arr[j + 1] = atual;
    ctx.onUpdate([...arr]);
  }
}