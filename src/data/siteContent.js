export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Serviços', path: '/servicos' },
  { label: 'Projetos', path: '/projetos' },
  { label: 'Tecnologias', path: '/tecnologias' },
  { label: 'Contato', path: '/contato' },
];

export const services = [
  {
    title: 'Sites Institucionais',
    description: 'Presença digital profissional para apresentar sua marca com clareza, autoridade e experiência responsiva.',
    items: ['Arquitetura de páginas', 'HTML semântico', 'SEO técnico base', 'Interface responsiva'],
    ctaLabel: 'Conversar sobre site institucional',
  },
  {
    title: 'Landing Pages',
    description: 'Páginas objetivas para campanhas, lançamentos e captação de leads com foco em conversão.',
    items: ['Hierarquia de oferta', 'CTAs estratégicos', 'Carregamento rápido', 'Estrutura para métricas'],
    ctaLabel: 'Criar minha landing page',
  },
  {
    title: 'Hospedagem',
    description: 'Preparação e publicação do site em ambiente moderno, com atenção a estabilidade e performance.',
    items: ['Deploy orientado', 'Configuração inicial', 'SSL quando disponível', 'Boas práticas de publicação'],
    ctaLabel: 'Ver opções de hospedagem',
  },
  {
    title: 'Manutenção',
    description: 'Ajustes, melhorias e evolução contínua para manter o site claro, atual e tecnicamente saudável.',
    items: ['Correções pontuais', 'Melhorias visuais', 'Atualizações de conteúdo', 'Acompanhamento técnico'],
    ctaLabel: 'Solicitar manutenção',
  },
];

export const technologies = ['React', 'JavaScript', 'HTML', 'CSS', 'Vite', 'Node.js', 'APIs', 'SEO', 'Performance'];

export const benefits = [
  {
    title: 'Sites profissionais que fortalecem sua presença digital',
    description: 'Criação de sites institucionais modernos, responsivos e otimizados para apresentar sua empresa com autoridade, melhorar a experiência do usuário e gerar mais oportunidades de contato.',
  },
  {
    title: 'Landing pages focadas em conversão',
    description: 'Desenvolvimento de landing pages rápidas e estratégicas para campanhas, lançamentos, tráfego pago e captação de leads, com copy clara, CTAs bem posicionados e estrutura pensada para transformar visitantes em clientes.',
  },
  {
    title: 'Performance, SEO técnico e carregamento rápido',
    description: 'Construção com código limpo, boas práticas de SEO, HTML semântico, responsividade e otimizações para melhorar velocidade, indexação e experiência em todos os dispositivos.',
  },
  {
    title: 'Manutenção, hospedagem e evolução contínua',
    description: 'Suporte para manter seu site seguro, atualizado e preparado para crescer, com ajustes, melhorias, publicação, hospedagem e acompanhamento técnico conforme a necessidade do projeto.',
  },
];

export const differentials = [
  'Design orientado a conversão, não apenas estética.',
  'Código organizado para manutenção e evolução simples.',
  'Interface mobile-first com hierarquia visual clara.',
  'SEO técnico e acessibilidade considerados desde a base.',
];

export const projectPreviews = [
  {
    title: 'Landing page comercial',
    category: 'Landing Page',
    filters: ['landing'],
    description: 'Estrutura para apresentar uma oferta, reforçar diferenciais e direcionar o contato.',
    objective: 'Captação de leads com uma primeira dobra objetiva, narrativa clara e CTAs posicionados para conversão.',
    solution: 'Hierarquia de oferta, blocos de prova, leitura rápida no mobile e base técnica preparada para campanhas.',
    indicators: ['SEO técnico', 'Responsivo', 'Performance otimizada', 'Copy estruturada', 'Deploy preparado'],
    stack: ['HTML', 'CSS', 'JavaScript', 'SEO'],
    preview: {
      eyebrow: 'Oferta digital',
      title: 'Captação orientada por CTA',
      details: ['Proposta clara', 'Prova visual', 'Contato direto'],
    },
    tone: 'cyan',
  },
  {
    title: 'Site institucional premium',
    category: 'Site institucional',
    filters: ['institucional', 'sites'],
    description: 'Estrutura para empresas e profissionais que precisam transmitir confiança e organização.',
    objective: 'Fortalecer autoridade da marca com presença digital organizada, responsiva e fácil de entender.',
    solution: 'Arquitetura institucional, seções comerciais, navegação clara e estrutura semântica para SEO técnico.',
    indicators: ['SEO técnico', 'Responsivo', 'Performance otimizada', 'Arquitetura de páginas', 'Deploy preparado'],
    stack: ['HTML semântico', 'CSS', 'JavaScript', 'Performance'],
    preview: {
      eyebrow: 'Presença digital',
      title: 'Autoridade para marcas e serviços',
      details: ['Institucional', 'Serviços', 'Contato'],
    },
    tone: 'violet',
  },
  {
    title: 'Página de serviços',
    category: 'Sites',
    filters: ['sites'],
    description: 'Apresentação objetiva de soluções, benefícios e chamada final para conversão.',
    objective: 'Explicar soluções com contexto suficiente para reduzir dúvidas e orientar o próximo passo.',
    solution: 'Fluxo editorial com benefícios, diferenciais, FAQ, sinais técnicos e chamada final para contato.',
    indicators: ['SEO técnico', 'Responsivo', 'Performance otimizada', 'Copy estruturada', 'Código escalável'],
    stack: ['Conteúdo', 'SEO', 'Responsivo', 'Deploy'],
    preview: {
      eyebrow: 'Oferta de serviços',
      title: 'Soluções organizadas por prioridade',
      details: ['Serviços', 'Benefícios', 'FAQ'],
    },
    tone: 'blue',
  },
  {
    title: 'Projeto personalizado',
    category: 'Projeto personalizado',
    filters: ['personalizado'],
    description: 'Estrutura para demandas específicas, integrações futuras e evolução técnica sob medida.',
    objective: 'Transformar necessidades específicas em uma interface planejada para evoluir com o projeto.',
    solution: 'Definição de escopo, componentes reutilizáveis, organização front-end e preparação para integrações.',
    indicators: ['Responsivo', 'Código escalável', 'Performance otimizada', 'Deploy preparado', 'Manutenção simples'],
    stack: ['JavaScript', 'Componentes', 'APIs', 'Manutenção'],
    preview: {
      eyebrow: 'Solução específica',
      title: 'Interface preparada para evolução',
      details: ['Fluxo próprio', 'Integrações', 'Escala'],
    },
    tone: 'teal',
  },
];
