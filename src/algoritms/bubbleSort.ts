// src/algoritms/bubbleSort.ts

import { SortingContext } from "./types/SortingContext";

export async function bubbleSort(ctx: SortingContext) {
  const arr = [...ctx.array];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (ctx.shouldStop()) return;

      await ctx.onCompare(j, j + 1);

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        ctx.onSwap();
        ctx.onUpdate([...arr]);
      }
    }
  }
}