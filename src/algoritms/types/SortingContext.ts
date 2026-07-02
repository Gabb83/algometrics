export interface SortingContext {
  array: number[];
  velocidade: number;
  shouldStop: () => boolean;
  onCompare: (i: number, j: number) => Promise<void>;
  onSwap: () => void;
  onUpdate: (array: number[]) => void;
}