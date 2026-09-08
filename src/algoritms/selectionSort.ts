import { SortingContext } from "./types/SortingContext";

export async function selectionSort(ctx: SortingContext) {
  const arr = [...ctx.array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let indiceMinimo = i;

    for (let j = i + 1; j < n; j++) {
      if (ctx.shouldStop()) return;
      await ctx.onCompare(j, indiceMinimo);

      if (arr[j] < arr[indiceMinimo]) {
        indiceMinimo = j;
      }
    }

    if (indiceMinimo !== i) {
      [arr[i], arr[indiceMinimo]] = [arr[indiceMinimo], arr[i]];

      ctx.onSwap();
      ctx.onUpdate([...arr]);
    }
  }
}