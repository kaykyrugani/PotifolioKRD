# Services Wave Background

Data da alteracao: 2026-05-20

## Inspiracao

A decoracao usa apenas o conceito visual de ondas horizontais animadas, inspirado em visualizadores abstratos de som da referencia 21st.dev. O card, componentes externos e estilos de biblioteca nao foram copiados.

## Decisao tecnica

Foi criado um componente local com canvas para a secao Services. O canvas fica absoluto dentro da propria secao, sem `position: fixed`, sem pintar fundo solido e sem interferir no fluxo dos cards.

## Correcao de posicionamento

O canvas foi movido de `servicesScrollArea` para dentro de `servicesSticky`. A area de scroll da secao continua com a altura necessaria para a animacao dos cards, mas as ondas agora ficam presas apenas ao viewport sticky ativo.

Essa decisao evita que o canvas cubra os `420vh` da area de scroll e apareca como uma faixa visual separada acima ou abaixo do conteudo. A camada permanece absoluta, com `inset: 0`, `width: 100%`, `height: 100%` e `z-index: 0`, sem participar do layout.

O conteudo da secao continua acima com `servicesContainer` em `z-index: 2`. A camada `servicesSticky::after` usa `z-index: 1` para suavizar as ondas e preservar a leitura do texto e do card ativo.

## Ajuste da altura sticky

A altura desktop de `servicesScrollArea` foi reduzida de `420vh` para `320vh`. Com quatro cards, a altura anterior deixava o wrapper externo longo demais e criava scroll visual excessivo antes e depois da troca dos cards.

O ajuste preserva o sticky, a troca dos cards e a waveBackground, porque o canvas nao participa do layout e continua preso ao `servicesSticky`.

## Diagnostico da altura excessiva

Em 2026-05-21, a secao `section#servicos` foi inspecionada no Chrome com viewport de `1104 x 781`. O `servicesScrollArea` estava com altura real de `2499.19px`, causada por `min-height: 320vh`. O `servicesSticky` estava com altura real de `1007.75px`, acima do `min-height: calc(100vh - 84px)` por causa do conteudo interno, mas sem criar a altura total da secao.

Foram encontrados quatro cards na animacao. Com `320vh`, a area util de scroll ficava em aproximadamente `1718px`, longa demais para apenas tres trocas de card e liberacao da proxima secao. O `waveBackground` estava `position: absolute`, com `inset: 0`, e nao participava do fluxo do documento.

O valor final de `servicesScrollArea` ficou em `240vh` no desktop. A escolha reduz a area real da secao para cerca de `1874px` no viewport testado, mantendo aproximadamente `1093px` de scroll util para os quatro cards sem criar uma area vazia longa depois do ultimo card.

A validacao confirmou que o sticky continua ativo, os quatro cards continuam sobrepostos no stage e a waveBackground permanece presa ao `servicesSticky`, sem afetar a altura da secao.

## Correcao da altura interna do sticky

O diagnostico posterior mostrou que a causa real da sensacao de secao alta nao era o `waveBackground`. Ao remover temporariamente o componente de ondas no browser, as alturas computadas permaneceram iguais. O problema estava no conteudo interno forcando o `servicesSticky` a crescer alem da area util do viewport.

No viewport de `1104 x 781`, a area util com header fixo era `calc(100vh - 84px)`, cerca de `697px`, mas o `servicesSticky`, o `servicesContainer` e o conteudo chegavam a aproximadamente `1007px`. O container ainda somava `80px` de padding vertical em cada lado no desktop, ampliando a altura visual do bloco.

A correcao manteve `servicesScrollArea` em `240vh` e passou a controlar a altura do sticky diretamente no desktop com `height: calc(100vh - 84px)` e `min-height: auto`. O `servicesContainer` recebeu `height: 100%` e `padding-block: clamp(24px, 4vh, 40px)` apenas no breakpoint sticky, para que o conteudo se adapte a area util.

Tambem foram adicionadas regras para telas desktop baixas (`max-height: 820px`): titulo e copy ficam mais compactos, o espacamento entre paragrafos diminui e o stage dos cards reduz para `min-height: 380px`. Essas regras preservam a logica da animacao, a quantidade de cards e o componente `ServicesWaveBackground`.

## Reducao da duracao do scroll

Depois que `servicesSticky`, `servicesContainer`, `waveBackground` e canvas passaram a caber na area util do viewport, a percepcao restante de altura vinha da duracao total do wrapper de scroll. O `servicesScrollArea` foi reduzido de `240vh` para `180vh`, mantendo o sticky scroll, mas encurtando a permanencia da secao na pagina.

Para compensar a area de scroll menor, os ranges dos quatro cards foram recalibrados: o primeiro card permanece no inicio, o segundo entra entre cerca de `20%` e `40%`, o terceiro entre cerca de `45%` e `65%`, e o quarto entre cerca de `70%` e `90%`. A logica do Framer Motion, a quantidade de cards, os textos, o design dos cards e o `ServicesWaveBackground` foram preservados.

Durante a validacao, `overflow: hidden` em `servicesScrollArea` tambem foi substituido por `overflow: clip`. Isso preserva o corte visual da secao sem criar um ancestral de scroll que prejudica o comportamento de `position: sticky`.

## Por que nao usar shadcn

O requisito do projeto e manter HTML, CSS e JavaScript/React ja existentes, sem novas bibliotecas ou comandos externos. Por isso nao foi instalado shadcn, nao foi usado `npx shadcn` e nenhuma dependencia foi adicionada.

## Performance

O canvas usa `devicePixelRatio` limitado a 2, `requestAnimationFrame`, listener de resize com cleanup e cancelamento da animacao no unmount. O desenho limpa o frame com `clearRect`, preservando o background transparente da secao.

O tamanho do canvas passa a ser calculado a partir do elemento pai, e nao da janela inteira. Isso mantem o desenho limitado ao sticky da secao Services.

## Reduced motion

Quando o usuario prefere movimento reduzido, o componente desenha uma versao estatica das ondas e nao inicia o loop de animacao.

## Refinamento visual das ondas

Em 2026-05-21, a camada visual das ondas foi refinada sem alterar sticky, altura da secao, cards, textos ou layout principal. A opacidade do `waveBackground` subiu para `0.44` no desktop e `0.22` no mobile, deixando a assinatura tecnologica mais presente sem competir com o conteudo.

O canvas passou a desenhar mais linhas no desktop, com variacao de amplitude, espessura e velocidade. O movimento foi acelerado de forma controlada para ficar mais perceptivel, com deslocamento lateral e respiracao suave nas curvas. As cores seguem a paleta do projeto: cyan, blue, purple e violet, sempre com transparencia nas pontas das linhas para integrar as ondas ao fundo.

Algumas ondas principais agora recebem glow moderado e poucos pontos luminosos em movimento. Os pontos sao pequenos e esparsos para sugerir energia sem criar um visual neon ou gamer. O overlay de leitura em `servicesSticky::after` foi ajustado para preservar contraste sobre texto, card ativo e CTA.

O suporte a `prefers-reduced-motion` foi mantido: quando o usuario prefere menos movimento, o componente desenha uma imagem estatica e nao inicia `requestAnimationFrame`. A performance continua limitada por `devicePixelRatio` maximo de 2, cleanup do frame no unmount e listener de resize com recalculo do canvas.

## Reforco de presenca visual

Em novo refinamento, a opacidade desktop do layer foi elevada para `0.58`, com `12` ondas no desktop. Os gradientes passaram a usar cyan, blue, purple e violet com mais saturacao e glow moderado, mantendo transparencia nas extremidades para nao formar blocos de cor.

A animacao ficou mais evidente com `time += 0.024`, maior amplitude vertical e formula de onda com movimento lateral mais organico. As particulas luminosas continuam restritas a poucas ondas principais, com brilho suave e tamanho pequeno, para sugerir fluxo digital sem poluir a leitura.

Como a camada ficou mais presente, o overlay de `servicesSticky::after` foi levemente escurecido nas areas de texto e card. O canvas continua absoluto, restrito ao sticky da secao, com `pointer-events: none`, cleanup de animacao e respeito a `prefers-reduced-motion`.

## Retirada da Home

Em 2026-05-22, o componente `ServicesWaveBackground` deixou de ser montado na secao de servicos da Home. O componente e seus estilos foram mantidos no projeto para reaproveitamento futuro em outro ponto visual apropriado.

A remocao ficou limitada ao import e ao uso dentro de `Services.jsx`. A camada `servicesSticky::after`, criada para suavizar a leitura sobre as ondas, tambem foi removida da secao porque nao ha mais canvas ativo nesse trecho.

## Arquivos editados

- src/components/effects/ServicesWaveBackground/ServicesWaveBackground.jsx
- src/components/effects/ServicesWaveBackground/ServicesWaveBackground.module.css
- src/components/sections/Services.jsx
- src/components/sections/Services.module.css
- docs/services-wave-background.md
