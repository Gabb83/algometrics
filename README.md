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


## 📚 Algoritmos de Ordenação & Complexidade Big O
🔹 Algoritmos Simples
- Bubble Sort - Complexidade de Tempo (Pior/Médio Caso): $O(n^2)$
- Selection Sort - Complexidade de Tempo (Pior/Médio Caso): $O(n^2)$
- Insertion Sort - Complexidade de Tempo (Pior/Médio Caso): $O(n^2)$
- Cocktail Sort (Bubble Sort Bidirecional) - Complexidade de Tempo (Pior/Médio Caso): $O(n^2)$

<br>

🔸 Algoritmos Avançados
- Merge Sort - Complexidade de Tempo (Todos os Casos): $O(n \log n)$
- Quick Sort - Complexidade de Tempo (Médio Caso): $O(n \log n)$
- Heap Sort - Complexidade de Tempo (Todos os Casos): $O(n \log n)$
- Shell Sort - Complexidade de Tempo (Pior Caso): $O(n^2)$

## 📂 Estrutura do Projeto
```
├── app
│   └── page.tsx
├── public
├── src
│   └── components
│       ├── Button.tsx
|       ├── Footer.tsx
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

## 💻 Como Rodar o Projeto (Getting Started)
1. Clone o repositório:
   ```bash
   git clone https://github.com/Gabb83/algometrics.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd algometrics
    ```
3. Instale as dependências (certifique-se de ter o Node.js instalado):
    ```bash
    npm install
    ```
4. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
5. Abra o navegador e acesse  para ver o aplicativo em ação.
    ```
    http://localhost:3000
    ```