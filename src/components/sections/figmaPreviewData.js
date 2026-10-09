export const flowPreviewNodes = [
  { key: 'arrival', label: 'Chegada', caption: 'Hero com a promessa clara nos primeiros 5 segundos.', icon: 'arrival' },
  { key: 'proposal', label: 'Proposta', caption: 'Soluções explicadas por necessidade, sem jargão técnico.', icon: 'proposal' },
  { key: 'plans', label: 'Planos', caption: 'Preço visível antes de qualquer conversa.', icon: 'plans' },
  { key: 'contact', label: 'Contato', caption: 'Um clique até o WhatsApp, com a mensagem já pronta.', icon: 'contact' },
];

export const figmaStoryboardItems = [
  {
    key: 'flow',
    label: 'Fluxo',
    description: 'Define a organização das informações para conduzir o usuário até a ação mais importante da página.',
    activeTools: ['Wireframes', 'Protótipos'],
  },
  {
    key: 'interface',
    label: 'Interface',
    description: 'Define hierarquia visual, componentes e padrões para criar uma navegação clara.',
    activeTools: ['Componentes', 'Protótipos'],
  },
  {
    key: 'responsive',
    label: 'Responsivo',
    description: 'Garante uma experiência consistente em desktop, tablet e dispositivos móveis.',
    activeTools: ['UI Design', 'Versão desktop/mobile'],
  },
];

export const interfacePreviewCopy = {
  label: 'Wireframe para UI',
  wireframeCaption: 'Wireframe: só estrutura e hierarquia, sem cor.',
  uiCaption: 'UI: cor, tipografia e estados aplicados sobre a mesma estrutura.',
  componentCaption: (label, count) => `Componente: ${label} · reutilizado ${count}× no layout.`,
  components: [
    { key: 'logo', label: 'Logo', count: 1 },
    { key: 'button', label: 'Botão', count: 2 },
    { key: 'image', label: 'Imagem', count: 1 },
    { key: 'card', label: 'Card', count: 3 },
  ],
};

export const responsivePreviewCopy = {
  label: 'Um layout, três telas',
  presets: [
    { key: 'desktop', label: 'Desktop', width: 1280, icon: 'desktop' },
    { key: 'tablet', label: 'Tablet', width: 820, icon: 'tablet' },
    { key: 'mobile', label: 'Celular', width: 390, icon: 'mobile' },
  ],
  caption: (preset) => `${preset.label} · ${preset.width} px`,
};

export const miniPageCopy = {
  navigationItems: ['Home', 'Soluções', 'Sobre'],
  cards: [
    { key: 'first', lines: 2 },
    { key: 'second', lines: 2 },
    { key: 'third', lines: 2 },
  ],
};

export const miniPageComponentInstances = [
  { type: 'logo', key: 'brand' },
  { type: 'button', key: 'header-action' },
  { type: 'button', key: 'hero-action' },
  { type: 'image', key: 'hero-image' },
  ...miniPageCopy.cards.map((card) => ({ type: 'card', key: card.key })),
];
