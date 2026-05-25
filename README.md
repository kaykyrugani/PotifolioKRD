# Kayky Rugani Dev Portfolio

Portfolio comercial desenvolvido em React com Vite, CSS Modules e Framer Motion. O projeto usa uma direção visual dark tech premium, com layout responsivo, seções editoriais, cartões translúcidos, animações controladas por scroll e conteúdo centralizado em `src/data/siteContent.js`.

## Stack

- React 19
- Vite 8
- React Router DOM
- Framer Motion
- CSS Modules
- CSS global com design tokens
- JavaScript, HTML e CSS sem build tools adicionais além do Vite

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Estrutura principal

- `src/main.jsx`: inicialização React, `StrictMode` e `BrowserRouter`.
- `src/App.jsx`: rotas da Home e páginas internas.
- `src/pages/`: páginas de rota (`Home`, `About`, `ServicesPage`, `ProjectsPage`, `TechnologiesPage`, `Contact`).
- `src/components/layout/`: estrutura compartilhada de página, navbar e footer.
- `src/components/sections/`: seções principais da Home.
- `src/components/ui/`: componentes reutilizáveis simples (`Button`, `Card`, `Badge`, `Container`, `SectionTitle`).
- `src/components/effects/`: efeitos visuais reutilizáveis, incluindo o canvas de waves.
- `src/data/siteContent.js`: dados de navegação, serviços, benefícios, tecnologias e previews de projeto.
- `src/styles/`: tokens globais, reset/base visual e atmosfera tecnológica.
- `docs/`: documentação histórica e relatório técnico atualizado.

## Documentação técnica

O relatório técnico atualizado está em:

- `docs/project-technical-report.md`

Ele documenta o estado atual do projeto, incluindo a seção Services com sticky scroll, cards animados, transparent text card, borda decorativa deslocada, sistema visual, responsividade e componentes principais.
