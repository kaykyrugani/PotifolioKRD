# Home Services Scroll Animation

Data da alteracao: 2026-05-20

## Alteracao

A secao Servicos passou a exibir os cards em uma experiencia sticky scroll no desktop.

## Comportamento

Durante o scroll, apenas um card fica ativo por vez. Os proximos cards entram de baixo para cima e substituem o card anterior no mesmo espaco visual.

## Responsividade

No desktop, a animacao sticky fica ativa.
No tablet, permanece ativa se houver espaco suficiente.
Em telas de ate 900px, a animacao por scroll vertical e desativada e os cards passam para um carrossel horizontal.

## Tecnologia

Foi utilizado Framer Motion com useScroll e useTransform para controlar opacity, translateY e scale dos cards.

## Correcao da implementacao

Os cards agora ficam sobrepostos em um stage absoluto no desktop. A classe de stage mantem position relative e cada card animado usa position absolute com inset 0, impedindo que os cards entrem no fluxo normal do documento.

Apenas o mobile usa o trilho horizontal com scroll nativo. Esse fallback fica restrito a telas de ate 900px para preservar a composicao sticky no desktop.

A ref do useScroll fica na area alta da secao, em servicesScrollArea, que possui min-height de 320vh no desktop. O sticky segura o layout visivel enquanto o scroll da pagina troca o card ativo dentro do mesmo espaco visual.

## Reativacao da animacao

Apos validar o sticky, todos os cards foram reativados no mesmo stage absoluto. Cada card voltou a ser renderizado pelo map de services dentro de AnimatedServiceCard.

O componente AnimatedServiceCard usa useScroll e useTransform para controlar opacity, translateY e scale de cada card conforme o progresso da secao. No desktop, os cards permanecem sobrepostos no mesmo espaco visual; no mobile, todos ficam visiveis lado a lado no carrossel.

No mobile, os estilos de transformacao, opacidade e visibilidade dos cards sao neutralizados para que todos participem do trilho horizontal.

## Carrossel mobile

Data da alteracao: 2026-06-15

- O breakpoint entre os modos permanece em `900px` / `901px`.
- Ate `900px`, os cards usam overflow horizontal nativo e `scroll-snap`.
- A navegacao funciona por swipe, trackpad, botoes anterior/proximo, indicadores e setas do teclado.
- O card central atualiza o contador e os indicadores durante o movimento manual.
- Os controles possuem rotulos acessiveis e alvos de toque de `48px`.
- O painel de progresso do sticky fica oculto no mobile para evitar controles duplicados.
- A pagina limita o overflow horizontal decorativo sem bloquear o movimento interno do carrossel.
- Com `prefers-reduced-motion`, a rolagem programatica deixa de usar movimento suave.

## Arquivos editados

- src/components/sections/Services.jsx
- src/components/sections/Services.module.css
- docs/home-services-scroll-animation.md
- package.json
- package-lock.json
