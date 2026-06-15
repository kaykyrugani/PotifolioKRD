# Home Hero Redesign

Data da alteracao: 2026-05-20

## Alteracoes realizadas

- Reducao do tamanho do H1 para melhorar equilibrio visual.
- Remocao da malha/grid do background para deixar a secao mais limpa e premium.
- Ajuste dos radial gradients para manter glow azul/roxo discreto sem padroes geometricos fortes.
- Preservacao dos elementos principais: imagem ImgHero, CTAs, badges flutuantes e beneficios.

## Logica aplicada

A secao ja possuia forte impacto visual, mas o H1 estava dominando demais a primeira dobra.
A reducao tipografica melhora a hierarquia e permite que imagem, copy e CTAs respirem melhor.

A remocao da malha no background deixa o visual mais sofisticado, proximo de interfaces SaaS premium, evitando excesso de informacao visual.
O fundo passa a depender de cor escura, profundidade por gradientes radiais suaves e contraste com a imagem principal.

## Arquivos editados

- src/components/sections/Hero.module.css
- docs/home-hero-redesign.md

## Adaptacao mobile

Data da alteracao: 2026-06-15

- A coluna principal do Hero passou a usar `minmax(0, 1fr)` para impedir que o titulo force largura maior que o viewport.
- Os blocos de titulo, descricao e acoes agora respeitam a largura util da secao.
- Abaixo de `600px`, os CTAs ficam em uma coluna e ocupam toda a largura disponivel.
- Os textos dos botoes podem quebrar linha sem gerar overflow horizontal.
