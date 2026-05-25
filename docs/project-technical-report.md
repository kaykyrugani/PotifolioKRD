# Relatório Técnico do Projeto

Data de referência: 2026-05-25

Este documento registra o estado atual do projeto Kayky Rugani Dev com base no código existente no workspace. Ele substitui a descrição genérica do template e consolida a arquitetura atual após as evoluções de layout, animação e design visual.

## Stack Utilizada

- React `19.2.6`
- Vite `8.0.12` / `8.0.13` no build instalado
- React DOM `19.2.6`
- React Router DOM `7.15.1`
- Framer Motion `12.39.0`
- CSS Modules
- CSS global com tokens em `src/styles/tokens/variables.css`
- ESLint `10.3.0`

O projeto não usa TypeScript, bibliotecas de UI externas, Tailwind, Sass, shadcn ou dependências visuais adicionais. A UI atual é construída com React, CSS Modules e CSS puro.

## Estrutura do Projeto

### Entrada e roteamento

- `src/main.jsx`: renderiza o app em `#root`, envolve com `StrictMode` e `BrowserRouter`, e importa o CSS global.
- `src/App.jsx`: define as rotas:
  - `/`: `Home`
  - `/sobre`: `About`
  - `/servicos`: `ServicesPage`
  - `/projetos`: `ProjectsPage`
  - `/tecnologias`: `TechnologiesPage`
  - `/contato`: `Contact`

### Páginas

- `src/pages/Home.jsx`: página principal e ponto de maior complexidade visual. Monta `Hero`, `Services`, `Benefits`, transição horizontal para `TechStack`, atmosfera técnica, `Differentials`, `Projects` e `CTA`.
- `src/pages/About.jsx`: página interna com `SectionTitle`, cards institucionais e CTAs.
- `src/pages/ServicesPage.jsx`: página de serviços baseada no array `services`.
- `src/pages/ProjectsPage.jsx`: página de previews de projeto baseada em `projectPreviews`.
- `src/pages/TechnologiesPage.jsx`: página de tecnologias baseada em `technologies`.
- `src/pages/Contact.jsx`: página de contato com label de WhatsApp vindo de `src/utils/contact.js`.

### Layout

- `src/components/layout/PageLayout.jsx`: compõe `Navbar`, `main` e `Footer`.
- `src/components/layout/Navbar.jsx`: navbar fixa flutuante com estado de scroll e menu mobile.
- `src/components/layout/Footer.jsx`: footer visual de assinatura com painéis, links, logo central e órbitas SVG animadas.
- `src/components/layout/Header.jsx`: wrapper legado que retorna `Navbar`; não é usado pelo `PageLayout` atual.

### Sections da Home

- `Hero`: primeira seção comercial com headline, subtítulo, CTAs, imagem principal, badges flutuantes e benefícios rápidos.
- `Services`: seção com texto editorial à esquerda e cards de serviço animados à direita.
- `Benefits`: grid editorial de benefícios com cards assimétricos.
- `TechStack`: grid de tecnologias com cards animados por entrada em viewport.
- `Differentials`: seção de diferenciais importada na Home.
- `Projects`: cards conceituais de projetos sem dados reais de cases.
- `CTA`: chamada final para contato.

### Componentes UI

- `Button`: renderiza `Link`, `a` ou `button` conforme props `to`/`href`, com variantes `primary`, `secondary` e `ghost`.
- `Card`: wrapper visual reutilizável com tons `default`, `muted` e `glow`.
- `Badge`: chip textual para tecnologias.
- `Container`: wrapper responsivo com tamanhos `default`, `narrow` e `wide`.
- `SectionTitle`: cabeçalho reutilizável para páginas internas.
- `SectionHeader`: adaptador simples sobre `SectionTitle`.

### Data layer

O conteúdo editável está centralizado em `src/data/siteContent.js`:

- `navItems`: links principais da navegação.
- `services`: quatro serviços usados na Home, página de serviços e footer.
- `technologies`: lista resumida usada em páginas e footer.
- `benefits`: benefícios usados na Home.
- `differentials`: diferenciais usados pela seção correspondente.
- `projectPreviews`: previews conceituais usados em Home e página de projetos.

Os dados de contato ficam em `src/utils/contact.js`:

- `whatsappLabel = 'Número em breve'`
- `whatsappPath = '/contato'`

O projeto ainda não contém telefone real, links comerciais reais ou cases reais.

## Tecnologias e Padrões Implementados

### React Hooks

- `useState`: usado em `Navbar` para controlar estado de scroll (`isScrolled`) e menu mobile (`isOpen`).
- `useEffect`: usado em `Navbar` para listener passivo de scroll; usado em `ServicesWaveBackground` para ciclo de canvas, resize e cleanup.
- `useRef`: usado em `Home` e `Services` para conectar seções ao `useScroll`; usado no canvas de waves.

### Framer Motion

O projeto usa Framer Motion em dois padrões principais:

- Scroll-driven animation com `useScroll` e `useTransform`.
- Entrada em viewport com `motion.article`, `initial`, `whileInView`, `viewport` e `transition`.

Locais atuais:

- `Home.jsx`: controla a transição horizontal da área de tecnologias. O `scrollYProgress` de `horizontalRef` transforma:
  - `x`: `0%` para `-50%`
  - `leftOpacity`: `1` para `0.35`
  - `rightOpacity`: `0.2` para `1`
  - `atmosphereOpacity`: `0` para `1`
- `Services.jsx`: controla cards de serviço com `scrollYProgress` ligado à seção.
- `TechStack.jsx`: anima cada card quando entra no viewport.

### Sticky layouts

Existem dois sistemas sticky relevantes:

- Services sticky scroll:
  - `section#servicos` usa `servicesScrollArea`.
  - `servicesSticky` fica sticky no desktop com `top: 84px`.
  - `servicesCardsStage` mantém os cards sobrepostos em um palco absoluto.
  - No mobile, a animação é desativada e os cards entram no fluxo em coluna.
- Horizontal tech transition:
  - `horizontalTransition` tem altura de `180vh` no desktop.
  - `horizontalSticky` fixa o viewport útil.
  - `horizontalTrack` tem `200vw` e se move de `0%` para `-50%`.
  - No mobile, a transição horizontal é removida e apenas o painel de `TechStack` aparece.

## Lógicas Principais

### Services sticky scroll

Arquivo: `src/components/sections/Services.jsx`

A seção Services usa `useScroll` com:

```js
target: sectionRef,
offset: ['start start', 'end end']
```

Cada card é renderizado por `AnimatedServiceCard`, que recebe `index`, `total` e `scrollYProgress`.

Para quatro cards, a lógica usa `fixedRanges` específicos:

- Card 1: visível no início, sai até `0.36`.
- Card 2: entra entre `0.18` e `0.4`, sai até `0.58`.
- Card 3: entra entre `0.43` e `0.65`, sai até `0.78`.
- Card 4: entra entre `0.68` e `0.9`, permanece até o fim.

Cada card transforma:

- `opacity`
- `y`
- `scale`
- `visibility`
- `zIndex`

No desktop, `.animatedCard` é absoluto com `inset: 0`. No mobile (`max-width: 900px`), a posição volta a ser relativa e as transforms são neutralizadas com `!important`.

### Service cards

Os cards da direita usam `.card` em `Services.module.css`:

- `display: flex`
- `flex-direction: column`
- background translúcido sobre `rgba(11, 15, 26, 0.74)`
- border `var(--color-border)`
- hover com `translateY(-4px)` e mudança de borda
- lista com bullets luminosos cyan
- CTA no final com `margin-top: auto`

O design dos cards fica isolado do text card por seletores próprios.

### Services transparent text card

Arquivo: `src/components/sections/Services.module.css`

O bloco `.servicesCopy` foi transformado em card translúcido para envolver os parágrafos da coluna esquerda. Estado atual:

- `position: relative`
- `isolation: isolate`
- `max-width: 620px`
- `overflow: visible`
- padding `34px 36px`
- border radius `28px`
- background linear translúcido
- border branca com baixa opacidade
- `backdrop-filter: blur(14px)`
- sombra interna sutil e sombra externa controlada

O pseudo-elemento `.servicesCopy::before` cria o frame técnico deslocado:

- `inset: 14px -14px -14px 14px`
- border cyan translúcida
- `z-index: -1`
- `pointer-events: none`
- opacidade `0.75`

O pseudo-elemento `.servicesCopy::after` cria glow sutil:

- radial gradient cyan
- tamanho `180px`
- deslocado para cima/esquerda
- `filter: blur(12px)`

Em mobile (`max-width: 768px`):

- padding reduzido para `26px 22px`
- radius reduzido para `22px`
- offset do frame reduzido para evitar overflow horizontal
- glow reduzido para `140px`

### Correção de corte visual do Services text card

Após a adição do transparent card, os wrappers da seção foram ajustados para não cortar o frame deslocado:

- `.servicesScrollArea`: `overflow: visible`
- `.servicesSticky`: `overflow: visible`
- `.servicesContent`: `overflow: visible`
- `.servicesCopy`: `overflow: visible`

No desktop:

- `.servicesScrollArea`: `min-height: 195vh`
- `.servicesSticky`: `position: sticky`, `top: 84px`, `min-height: calc(100vh + 100px)`
- `.servicesContainer`: `min-height: calc(100vh + 100px)`, `display: flex`, `align-items: center`
- `.servicesContent`: `min-height: calc(100vh - 84px)`

O palco dos cards mantém `overflow: clip` em `.servicesCardsStage`, porque ele controla apenas o espaço da animação dos cards da direita.

### Waves background

Arquivo: `src/components/effects/ServicesWaveBackground/ServicesWaveBackground.jsx`

O componente de waves continua no projeto, mas a documentação histórica registra que ele foi retirado da Home em 2026-05-22. Estado atual do código:

- Usa canvas dentro de `.waveBackground`.
- Gera `12` ondas no desktop e `6` no mobile.
- Limita `devicePixelRatio` em `2`.
- Usa `requestAnimationFrame` quando o usuário não prefere movimento reduzido.
- Usa `matchMedia('(prefers-reduced-motion: reduce)')`.
- Redesenha no resize.
- Faz cleanup de animation frame e listener no unmount.

CSS atual:

- camada absoluta com `inset: 0`
- `z-index: 0`
- `opacity: 0.58` desktop e `0.22` mobile
- `pointer-events: none`
- máscara horizontal para fade nas laterais
- overlay vertical para preservar leitura

Como não há import ativo em `Services.jsx`, o componente está disponível para reaproveitamento, mas não participa atualmente da Home.

### Footer motion

Arquivo: `src/components/layout/Footer.module.css`

O footer usa animações CSS, não Framer Motion:

- `.orbit`: gira com `footerOrbit` em `46s linear infinite`.
- `.logoOrbit`: flutua/rotaciona com `footerOrbitFloat`.
- `.footerLogo`: flutua verticalmente com `footerLogoFloat`.

Há suporte a reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .orbit,
  .logoOrbit,
  .footerLogo {
    animation: none;
  }
}
```

Visualmente, o footer combina:

- painéis glass com clip-path angular no desktop
- logo central com portal/órbita SVG
- links de navegação, serviços e stack
- background com grid, diagonais e luz ambiente

### Navbar

Arquivo: `src/components/layout/Navbar.jsx`

A navbar é fixa no topo e usa:

- `useState` para menu e scroll.
- `useEffect` com listener passivo para detectar `window.scrollY > 24`.
- `NavLink` para active state.
- CTA para `whatsappPath`, atualmente `/contato`.

Visual:

- glassmorphism forte com blur de `22px`
- formato pill
- estado `navScrolled` com fundo mais opaco e sombra maior
- menu mobile dropdown
- botão mobile com duas linhas que rotacionam para fechar

### Hero

Arquivos:

- `src/components/sections/Hero.jsx`
- `src/components/sections/Hero.module.css`

O Hero é uma composição editorial dark tech:

- headline grande com gradiente no termo `clientes`
- eyebrow técnico
- subtítulo e CTAs
- imagem `ImgHero.png`
- badges flutuantes no desktop
- cards de benefícios rápidos
- glow radial atrás da imagem
- gradiente de fade no final da seção

As animações do Hero são CSS puro para os badges (`floatBadge`), com `prefers-reduced-motion` removendo a animação.

### Tech atmosphere e transição horizontal

Arquivos:

- `src/pages/Home.jsx`
- `src/pages/Home.module.css`
- `src/styles/tech-atmosphere.css`

A Home cria uma ponte visual entre Benefits e TechStack:

- seção `horizontalTransition`
- `horizontalSticky` sticky no desktop
- `horizontalTrack` de `200vw`
- dois painéis horizontais
- `techAtmosphereBridge` com opacidade controlada por Framer Motion
- no mobile, o primeiro painel é escondido e a animação horizontal é removida

A área posterior `.techAtmosphere` envolve `Differentials`, `Projects` e `CTA` com mesh, constelações SVG e radiais.

## Estado Visual Atual

### Direção visual

- Dark UI cinematográfica.
- Técnica e premium.
- Vidro/translucidez com blur moderado.
- Cyan, blue e purple como acentos principais.
- Luz ambiente por radiais e sombras coloridas discretas.
- Elementos orbitais, grids, constelações e linhas técnicas.

### Paleta

Tokens principais em `variables.css`:

- Background: `#070b14`, `#0b0f1a`, `#0e1322`
- Cyan: `#00c2ff`
- Blue: `#2d7ff9`, `#3b82f6`
- Purple: `#7c3aed`, `#8b5cf6`, `#9333ea`
- Texto: branco, `#a1a1aa`, `#9ca3af`
- Bordas: branco com opacidade entre `0.06` e `0.12`

Gradientes:

- `--gradient-primary`: blue para purple
- `--gradient-soft`: cyan/purple translúcido
- `--gradient-text`: cyan para purple

### Tipografia

Tokens:

- `--font-heading`: Space Grotesk com fallbacks de sistema
- `--font-body`: Inter / Space Grotesk / system fonts

Observação técnica: o CSS referencia Space Grotesk e Inter, mas o projeto não contém import local ou externo de fontes nos arquivos revisados. Na prática, o navegador cai nos fallbacks caso essas fontes não estejam disponíveis no sistema.

### Spacing e radius

Sistema de espaçamento em tokens:

- `--space-1` até `--space-24`
- container padrão `--container: 1180px`

Radius:

- `--radius-sm` a `--radius-xl`
- `--radius-full`

O projeto também usa valores específicos por seção quando a composição visual exige, como `28px`, `34px`, `999px` e clip-paths no footer.

### Glassmorphism

Padrões recorrentes:

- backgrounds com `rgba(..., 0.02 - 0.08)`
- `backdrop-filter: blur(...)`
- bordas brancas com baixa opacidade
- sombras internas `inset 0 1px 0`
- sombras externas profundas e suaves

Usos principais:

- Navbar
- Hero quick benefits
- Services text card
- Services cards
- Benefits cards
- TechStack cards
- Projects cards
- CTA
- Footer panels

### Responsividade

Breakpoints recorrentes:

- `560px`: refinamentos mobile estreito.
- `640px`: Hero e Navbar mobile.
- `760px` / `780px`: containers e grids intermediários.
- `860px`: Projects/CTA.
- `900px` / `901px`: troca principal entre mobile e desktop sticky.
- `1020px`, `1100px`, `1180px`: composições desktop avançadas.

Padrões:

- Mobile first na maior parte dos módulos.
- Sticky/scroll-driven complexo apenas no desktop.
- Em mobile, animações de layout viram fluxo normal.
- Cards empilham em uma coluna.
- Offsets decorativos são reduzidos para evitar overflow horizontal.

## Decisões Arquiteturais Atuais

- Conteúdo do site fica em `siteContent.js`, reduzindo duplicação entre Home, páginas internas e footer.
- Layout global é centralizado em `PageLayout`.
- Cada seção tem seu próprio CSS Module.
- Efeitos globais de atmosfera ficam separados em `tech-atmosphere.css`.
- Framer Motion é usado apenas onde há necessidade real de animação por scroll ou viewport.
- Animações decorativas simples ficam em CSS puro.
- A seção Services preserva a lógica de cards separada do design do bloco de texto.
- O componente `ServicesWaveBackground` foi mantido para reaproveitamento, embora não esteja montado na Home atualmente.

## Pontos de Atenção e Evolução Recomendada

- Atualizar documentação histórica que ainda cita valores antigos da seção Services, se ela precisar ser usada como fonte única de verdade.
- Validar visualmente a seção Services em desktop real depois dos ajustes de `overflow: visible` e `min-height`.
- Decidir se `Header.jsx` e `Header.module.css` continuam necessários, pois o layout atual usa `Navbar` diretamente.
- Adicionar fonte local ou import explícito se Space Grotesk e Inter forem requisitos visuais obrigatórios.
- Substituir textos temporários de contato quando houver número/link real.
- Substituir `projectPreviews` por cases reais apenas quando houver dados e imagens fornecidos.
- Se o `ServicesWaveBackground` não for reutilizado, considerar documentar claramente que ele é um efeito disponível, mas inativo.

## Arquivos de Documentação Relacionados

- `docs/home-services-layout.md`
- `docs/home-services-scroll-animation.md`
- `docs/services-wave-background.md`
- `docs/home-hero-redesign.md`
- `docs/home-benefits-redesign.md`
- `docs/home-techstack-redesign.md`
- `docs/home-tech-atmosphere.md`
- `docs/header-floating-navbar.md`
- `docs/footer-signature-redesign.md`
- `docs/agent-handoff-report.md`
