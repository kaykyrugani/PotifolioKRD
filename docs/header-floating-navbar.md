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

## Integracao da nova identidade visual

Data da alteracao: 2026-09-22

O bloco anterior formado pelo monograma `KR`, pelo texto `Kayky Rugani` e pelo complemento `Dev` foi substituido no componente ativo `Navbar` por `src/assets/logos/logoKRD2semFndo.webp`. O link da marca continua apontando para `/` e continua fechando o menu mobile quando acionado.

O WebP possui dimensoes intrinsecas de `776 x 394`, canal alpha e uma area principal de marca com aproximadamente `355 x 129`, centralizada dentro de uma caixa com bastante transparencia. Para preservar o arquivo original sem distorcao, a navbar usa uma janela com `overflow: hidden` que recorta somente a area transparente periferica e centraliza a imagem em seu aspect ratio original.

No desktop, a janela visual da marca mede `142 x 52px`; ate `640px`, mede `120 x 44px`; e ate `380px`, `110 x 40px`. As dimensoes intrinsecas permanecem declaradas no elemento `img` para evitar layout shift. O link possui nome acessivel proprio e a imagem interna usa `alt` vazio para impedir leitura duplicada.

Links, destinos, estado ativo, CTA, listener de scroll, breakpoint de `900px`, botao hamburger e painel mobile foram preservados. Apenas o gap entre os tres grupos do desktop foi moderadamente reduzido para acomodar a marca horizontal na regiao imediatamente anterior ao breakpoint.
