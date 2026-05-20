# Home TechStack Redesign

Data da alteracao: 2026-05-20

## Objetivo

Redesenhar apenas a secao TechStack da Home para criar uma quebra visual mais marcante, mantendo a identidade Dark Tech Premium e sem alterar Hero, Services, Benefits, Navbar, Footer, rotas ou a transicao horizontal existente.

## Layout assimetrico

A grade passou a usar CSS Grid com seis colunas no desktop e areas nomeadas para criar pesos diferentes entre os cards. React, Node.js e Performance recebem destaque visual e maior area, enquanto as demais tecnologias mantem cards menores para orientar a leitura sem deixar a composicao generica.

Em tablet e mobile, a grade volta para uma coluna unica, removendo spans e areas fixas para preservar legibilidade e evitar overflow.

## Logica de cores

O background recebeu uma variacao dentro da identidade do projeto:

- Base em dark navy, azul profundo e roxo tecnologico.
- Radiais em cyan e roxo para contraste.
- Pequenos detalhes em teal nos textos de uso.
- Brilhos controlados para evitar aparencia gamer ou excesso de neon.

## SVG e decoracao

Foi adicionado um SVG decorativo dentro da secao com circulos orbitais, linhas conectadas e pontos tecnicos em baixa opacidade. A secao tambem usa pseudo-elementos com pontos sutis e linhas diagonais leves, sem reutilizar a malha das secoes anteriores.

## Responsividade

- Desktop: grid assimetrico com cards de tamanhos variados dentro do painel horizontal.
- Desktop com baixa altura: paddings, gaps e tipografia reduzem para caber melhor no sticky da transicao.
- Mobile: cards empilhados, decoracao reduzida ou escondida e altura natural no fluxo vertical.
- O fallback mobile do wrapper horizontal mantem a TechStack com opacidade total, ja que fora do sticky ela nao deve herdar a entrada animada do painel desktop.

## Arquivos editados

- src/pages/Home.module.css
- src/components/sections/TechStack.jsx
- src/components/sections/TechStack.module.css
- docs/home-techstack-redesign.md
