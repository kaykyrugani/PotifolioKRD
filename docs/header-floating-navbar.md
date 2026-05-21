# Header Floating Navbar

Data da alteracao: 2026-05-20

## Objetivo

Redesenhar apenas o Header/Navbar para substituir a faixa rigida de topo por uma navbar flutuante premium, centralizada e com respiro lateral.

## Inspiracao visual

A referencia usa uma capsula arredondada com fundo translucido, blur, borda sutil e CTA destacado. A adaptacao foi feita em React com CSS Modules, preservando a identidade dark tech do projeto e sem copiar Tailwind.

## Header wrapper e nav interna

O `header` agora funciona como wrapper fixo com `pointer-events: none`, largura total e padding superior/lateral. Ele nao possui background solido nem borda inferior full-width.

A `nav` interna recebe `pointer-events: auto`, max-width do container, bordas arredondadas, fundo translucido, blur, borda discreta e sombra/glow leve. Assim, apenas a capsula parece flutuar sobre o site.

## Estado scrolled

O estado de scroll foi movido para a capsula interna com a classe `navScrolled`. Quando a pagina rola, a navbar fica um pouco mais compacta, mais opaca e com sombra mais presente, mantendo a sensacao de componente flutuante.

## Mobile

No mobile, a navbar continua flutuante e arredondada. Os links centrais ficam ocultos, o botao de menu aparece dentro da capsula e o menu abre como painel flutuante abaixo, com blur, borda sutil e fundo escuro translucido.

## Arquivos editados

- src/components/layout/Navbar.jsx
- src/components/layout/Navbar.module.css
- docs/header-floating-navbar.md
