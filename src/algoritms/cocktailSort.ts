import { SortingContext } from "./types/SortingContext";

export async function cocktailSort(ctx: SortingContext) {
  const arr = [...ctx.array];

  let inicio = 0;
  let fim = arr.length - 1;
  let houveTroca = true;

  while (houveTroca) {
    houveTroca = false;

    for (let i = inicio; i < fim; i++) {
      if (ctx.shouldStop()) return;

      await ctx.onCompare(i, i + 1);

      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];

        ctx.onSwap();
        ctx.onUpdate([...arr]);

        houveTroca = true;
      }
    }

    if (!houveTroca) break;

    fim--;
    houveTroca = false;

    for (let i = fim - 1; i >= inicio; i--) {
      if (ctx.shouldStop()) return;

      await ctx.onCompare(i, i + 1);

      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];

        ctx.onSwap();
        ctx.onUpdate([...arr]);

        houveTroca = true;
      }
    }
    
    inicio++;
  }
}