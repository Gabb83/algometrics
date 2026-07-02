export interface SortingContext {
  array: number[];

  velocidade: number;

  sleep: (ms: number) => Promise<void>;

  shouldStop: () => boolean;

  onCompare: (i: number, j: number) => Promise<void>;

  onSwap: () => void;

  onUpdate: (array: number[]) => void;
}