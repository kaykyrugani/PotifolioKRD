# Home Services Scroll Animation

Data da alteracao: 2026-05-20

## Alteracao

A secao Servicos passou a exibir os cards em uma experiencia sticky scroll no desktop.

## Comportamento

Durante o scroll, apenas um card fica ativo por vez. Os proximos cards entram de baixo para cima e substituem o card anterior no mesmo espaco visual.

## Responsividade

No desktop, a animacao sticky fica ativa.
No tablet, permanece ativa se houver espaco suficiente.
No mobile, a animacao e desativada e todos os cards aparecem empilhados normalmente.

## Tecnologia

Foi utilizado Framer Motion com useScroll e useTransform para controlar opacity, translateY e scale dos cards.

## Correcao da implementacao

Os cards agora ficam sobrepostos em um stage absoluto no desktop. A classe de stage mantem position relative e cada card animado usa position absolute com inset 0, impedindo que os cards entrem no fluxo normal do documento.

Apenas o mobile usa empilhamento com flex-direction column. Esse fallback fica restrito a telas menores que 900px para evitar que a coluna direita cresca com todos os cards no desktop.

A ref do useScroll fica na area alta da secao, em servicesScrollArea, que possui min-height de 420vh. O sticky segura o layout visivel enquanto o scroll da pagina troca o card ativo dentro do mesmo espaco visual.

## Reativacao da animacao

Apos validar o sticky, todos os cards foram reativados no mesmo stage absoluto. Cada card voltou a ser renderizado pelo map de services dentro de AnimatedServiceCard.

O componente AnimatedServiceCard usa useScroll e useTransform para controlar opacity, translateY e scale de cada card conforme o progresso da secao. No desktop, os cards permanecem sobrepostos no mesmo espaco visual; no mobile, o fallback continua exibindo todos empilhados.

O log temporario de scrollYProgress e os outlines de debug foram mantidos para validacao visual antes da limpeza final.

## Arquivos editados

- src/components/sections/Services.jsx
- src/components/sections/Services.module.css
- docs/home-services-scroll-animation.md
- package.json
- package-lock.json
