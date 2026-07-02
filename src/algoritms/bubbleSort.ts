// src/algoritms/bubbleSort.ts

import { SortingContext } from "./types/SortingContext"; // Ajuste o caminho do import se necessário

export async function bubbleSort(ctx: SortingContext) {
  // Trabalhamos diretamente com a cópia local que será mutada a cada passo
  const arr = [...ctx.array];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Verifica o token de parada ANTES de fazer qualquer operação ou delay
      if (ctx.shouldStop()) return;

      // Executa a comparação visual (onde ocorre o sleep do estado)
      await ctx.onCompare(j, j + 1);

      // Verificação dupla pós-delay para garantir parada instantânea caso o usuário clique durante o sleep
      if (ctx.shouldStop()) return;

      if (arr[j] > arr[j + 1]) {
        // Realiza a troca no array local
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        // Notifica o componente visual passando uma CÓPIA REFRESCADA do array modificado
        ctx.onSwap();
        ctx.onUpdate([...arr]);
      }
    }
  }
}