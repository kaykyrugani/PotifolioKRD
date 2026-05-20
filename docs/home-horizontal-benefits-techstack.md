# Home Horizontal Benefits TechStack

Data da alteracao: 2026-05-20

## Objetivo

Criar uma transicao horizontal controlada por scroll entre as secoes Benefits e TechStack da Home, sem transformar o site inteiro em scroll horizontal.

## Funcionamento

No desktop, Benefits renderiza normalmente antes da transicao. Depois dela, um wrapper separado com altura de 180vh cria a ponte horizontal para TechStack. O bloco interno usa position sticky com top de 84px, altura de calc(100vh - 84px) e overflow hidden apenas nesse ponto.

O scroll vertical da pagina alimenta o useScroll do Framer Motion. O valor de scrollYProgress e convertido com useTransform para deslocar o track horizontal de 0% ate -50%, fazendo um painel intermediario sair para a esquerda enquanto TechStack entra pela direita.

## Mudanca estrutural

A Benefits real foi removida do sticky horizontal para evitar que a leitura da secao fosse cortada ou iniciada cedo demais. Ela agora fica no fluxo normal da Home.

A horizontalTransition passou a funcionar como uma ponte visual entre Benefits e TechStack, usando um painel de introducao com copy sobre tecnologias em vez de repetir a secao Benefits inteira.

O sticky foi ajustado para top 84px, respeitando a altura da navbar, e a altura total da transicao foi reduzida de 200vh para 180vh para deixar o movimento mais controlado.

## Desktop

- A transicao horizontal fica ativa a partir de 901px.
- O track tem largura de 200vw.
- Cada painel ocupa 100vw.
- O painel esquerdo perde opacidade levemente enquanto TechStack ganha opacidade ao entrar.
- Os ajustes de altura e padding de TechStack ficam escopados ao wrapper horizontal.

## Fallback mobile

Em telas ate 900px, o wrapper deixa de ser sticky, o track volta para display block e Benefits e TechStack aparecem normalmente no fluxo vertical.

## Arquivos editados

- src/pages/Home.jsx
- src/pages/Home.module.css
- docs/home-horizontal-benefits-techstack.md
