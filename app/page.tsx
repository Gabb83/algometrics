"use client";

import SingleModeView from "@/src/components/single-mode/SingleModeView";
import ComparisonModeView from "@/src/components/comparison-mode/ComparisonModeView";
import { executarAlgoritmo } from "@/src/utils/executarAlgoritmo";
import type { Algoritmo } from "@/src/hooks/sortingConfig";
import Header from "@/src/components/Header";
import { useSorting } from "@/src/hooks/useSorting";
import { useState } from "react";

export default function Home() {
  const left = useSorting();
  const right = useSorting();

  const [viewMode, setViewMode] = useState<"single" | "compare">("single");
  const [leftAlgorithm, setLeftAlgorithm] = useState<Algoritmo>("bubble");
  const [rightAlgorithm, setRightAlgorithm] = useState<Algoritmo>("merge");

  const gerarEntradaCompartilhada = (): number[] => {
    return Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * (320 - 20)) + 20
    );
  };

  const embaralharAmbos = () => {
    const novoArray = gerarEntradaCompartilhada();

    left.definirArray(novoArray);
    right.definirArray(novoArray);
  };

  const alternarModoComparar = () => {
    if (viewMode === "single") {
      const entradaCompartilhada = gerarEntradaCompartilhada();

      left.definirArray(entradaCompartilhada);
      right.definirArray(entradaCompartilhada);

      setViewMode("compare");
      return;
    }

    setViewMode("single");
  };

  const resetarAmbos = () => {
    left.resetarVisualizador();
    right.resetarVisualizador();
  };

  const executarComparacao = () => {
    executarAlgoritmo(left, leftAlgorithm);
    executarAlgoritmo(right, rightAlgorithm);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-50 font-sans dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors">
      <Header
        velocidade={left.velocidade}
        setVelocidade={left.setVelocidade}
        disabled={left.estaOrdenando || right.estaOrdenando}
        onEmbaralhar={embaralharAmbos}
        onResetar={resetarAmbos}
        viewMode={viewMode}
        onAlternarModoComparar={alternarModoComparar}
      />

      { viewMode === "single" ? (
        <SingleModeView sorting={left} />
      ) : (
        <ComparisonModeView
          left={left}
          right={right}
          leftAlgorithm={leftAlgorithm}
          rightAlgorithm={rightAlgorithm}
          setLeftAlgorithm={setLeftAlgorithm}
          setRightAlgorithm={setRightAlgorithm}
          onExecutarComparacao={executarComparacao}
        />
      )}
    </div>
  );
}