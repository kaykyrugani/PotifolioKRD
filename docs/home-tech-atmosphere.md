# Home Tech Atmosphere

Data da alteracao: 2026-05-20

## Conceito

A Home passou a trabalhar com dois estados de background:

- Estado 1: fundo padrao escuro, limpo e minimalista para Hero, Services e Benefits.
- Estado 2: atmosfera tech artistica a partir da transicao horizontal da TechStack, continuando por Differentials, Projects e CTA.

O objetivo e criar a sensacao de que o site entra em outra atmosfera visual, com glows, orbitas, constelacoes tecnicas e gradientes mais amplos, sem repetir exatamente o background interno da TechStack.

## Inicio da atmosfera tech

A atmosfera comeca durante a transicao horizontal entre o painel introdutorio e a TechStack. Uma camada `techAtmosphereBridge` fica dentro do wrapper horizontal e tem a opacidade controlada pelo `scrollYProgress` do Framer Motion.

Com isso, a mudanca do background padrao para o background tech acontece de forma gradual durante o scroll lateral, evitando troca brusca.

## Continuidade apos TechStack

Depois da transicao horizontal, Differentials, Projects e CTA foram envolvidos por `techAtmosphere`. Esse wrapper cria uma ambientacao unica que atravessa as tres secoes com:

- gradientes radiais mais espalhados;
- particulas sutis;
- linhas tecnicas leves;
- constelacoes SVG diferentes do orbital da TechStack;
- glows cyan, purple e teal em baixa intensidade.

O Footer ficou fora desse wrapper para preservar separacao visual e nao receber a atmosfera tech.

## Estrutura visual

A organizacao das camadas foi separada em `src/styles/tech-atmosphere.css`:

- `techAtmosphereBridge`: camada de transicao dentro do sticky horizontal.
- `techAtmosphereBridge__orbit`: SVG orbital usado apenas na ponte visual.
- `techAtmosphere`: wrapper das secoes posteriores.
- `techAtmosphere__mesh`: particulas e linhas sutis.
- `techAtmosphere__constellation`: SVGs amplos para continuidade cinematografica.

Os cards de Differentials, Projects e CTA receberam fundos mais translucidos, bordas sutis e blur moderado para assentar sobre o novo ambiente sem competir com a TechStack.

## Performance

As animacoes foram mantidas em transform/opacidade. Os blurs foram aplicados em poucos elementos e com intensidade moderada. No mobile, a camada de ponte e parte dos SVGs decorativos sao removidos ou reduzidos para preservar leitura e estabilidade visual.

## Arquivos editados

- src/pages/Home.jsx
- src/pages/Home.module.css
- src/styles/tech-atmosphere.css
- src/components/sections/Differentials.module.css
- src/components/sections/Projects.module.css
- src/components/sections/CTA.module.css
- docs/home-tech-atmosphere.md
