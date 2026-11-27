export type InfoComplexidade = {
  piorCaso: string;
  melhorCaso: string;
  espaco: string;
};

export const TAMANHO_PADRAO = 24;
export const ALTURA_MAXIMA = 320;

export const CONFIG_ALGORITMOS = {
  bubble: {
    nome: "Bubble Sort",
    complexidade: {
      piorCaso: "O(n²)",
      melhorCaso: "O(n)",
      espaco: "O(1)",
    },
  },
  selection: {
    nome: "Selection Sort",
    complexidade: {
      piorCaso: "O(n²)",
      melhorCaso: "O(n²)",
      espaco: "O(1)",
    },
  },
  insertion: {
    nome: "Insertion Sort",
    complexidade: {
      piorCaso: "O(n²)",
      melhorCaso: "O(n)",
      espaco: "O(1)",
    },
  },
  cocktail: {
    nome: "Cocktail Sort",
    complexidade: {
      piorCaso: "O(n²)",
      melhorCaso: "O(n)",
      espaco: "O(1)",
    },
  },
  merge: {
    nome: "Merge Sort",
    complexidade: {
      piorCaso: "O(n log n)",
      melhorCaso: "O(n log n)",
      espaco: "O(n)",
    },
  },
  quick: {
    nome: "Quick Sort",
    complexidade: {
      piorCaso: "O(n²)",
      melhorCaso: "O(n log n)",
      espaco: "O(log n) médio / O(n) pior caso",
    },
  },
  heap: {
    nome: "Heap Sort",
    complexidade: {
      piorCaso: "O(n log n)",
      melhorCaso: "O(n log n)",
      espaco: "O(1)",
    },
  },
  shell: {
    nome: "Shell Sort",
    complexidade: {
      piorCaso: "O(n²)",
      melhorCaso: "O(n log n)",
      espaco: "O(1)",
    },
  },
} satisfies Record<string, {
  nome: string;
  complexidade: InfoComplexidade;
}>;

export type Algoritmo = keyof typeof CONFIG_ALGORITMOS;