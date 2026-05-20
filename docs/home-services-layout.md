# Home Services Layout

Data da alteracao: 2026-05-20

## Alteracoes

- A secao Servicos deixou de usar grid centralizado de cards.
- O layout passou para uma composicao editorial com copy SEO a esquerda e cards empilhados a direita.
- Foi adicionada uma decoracao SVG circular discreta no canto superior esquerdo da secao.
- O design interno dos cards foi preservado.

## Logica

A nova estrutura melhora leitura comercial e SEO, permitindo explicar os servicos com mais contexto enquanto os cards permanecem como elementos de acao e detalhamento.

No mobile, a secao fica em coluna unica para manter legibilidade e evitar overflow horizontal. Em telas desktop, o conteudo usa duas colunas: texto explicativo a esquerda e cards em coluna vertical a direita.

## Arquivos editados

- src/components/sections/Services.jsx
- src/components/sections/Services.module.css
- docs/home-services-layout.md
