# 📶 AlgoMetrics

O AlgoMetrics é um visualizador interativo desenvolvido em Next.js, TypeScript e Tailwind CSS que transforma a lógica abstrata de algoritmos de ordenação em animações gráficas em tempo real. Ele é projetado para ajudar estudantes e entusiastas de programação a entenderem melhor como os algoritmos de ordenação funcionam, proporcionando uma experiência visual imersiva.

A aplicação permite que estudantes e desenvolvedores controlem a velocidade da execução, embaralhem dados instantaneamente e analisem o comportamento visual de cada método. Ao integrar tabelas dinâmicas de complexidade Big O, ele serve como uma ferramenta educacional poderosa para compreender a eficiência de tempo e espaço de estruturas de dados.

## 🚀 Funcionalidades
- Visualização interativa de algoritmos de ordenação.
- Controle de velocidade de execução.
- Embaralhamento instantâneo de dados.
- Tabelas dinâmicas de complexidade Big O.
- Interface intuitiva e responsiva.

## 🛠️ Tecnologias Utilizadas
- Next.js
- TypeScript
- Tailwind CSS
- React

## 📚 Algoritmos de Ordenação Implementados
- Algoritmos Simples: Bubble Sort, Selection Sort, Insertion Sort, Cocktail Sort
- Algoritmos Intermediários: Merge Sort

## 📈 Complexidade Big O
- Bubble Sort: O(n^2)
- Selection Sort: O(n^2)
- Insertion Sort: O(n^2)
- Cocktail Sort: O(n^2)
- Merge Sort: O(n log n)

## 📂 Estrutura do Projeto
```
├── app
│   └── page.tsx
├── public
│   └── images
├── src
│   └── components
│       ├── Button.tsx
│       ├── Header.tsx
│       ├── MetricsCard.tsx
|       └── SortingVisualizer.tsx
├── hooks
│   └── useSorting.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md     
```
## 📌 Como Usar
1. Clone o repositório: `git clone
2. Navegue até o diretório do projeto: `cd algo-metrics`
3. Instale as dependências: `npm install`
4. Inicie o servidor de desenvolvimento: `npm run dev`
5. Acesse a aplicação em `http://localhost:3000`