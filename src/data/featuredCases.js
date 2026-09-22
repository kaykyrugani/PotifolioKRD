import ucanCaseImage from '../assets/imagesCases/PrintUcanLP.png';
import companyCaseImage from '../assets/imagesCases/topIMG.png';
import pomboCaseImage from '../assets/imagesCases/pomboIMG.png';
import aicCaseImage from '../assets/imagesCases/PrintAic.png';
import dutraCaseImage from '../assets/imagesCases/PrintPropostaDutra.png';
import territorioCaseImage from '../assets/imagesCases/PrintTerritorioDoCafe.png';

export const featuredCases = [
  {
    id: '01',
    slug: 'ucan-landing-page',
    name: 'Landing Page para Agência de Marketing (U CAN)',
    objective: 'Transformar performance em oportunidades reais de vendas, captando leads qualificados.',
    challenge: 'Comunicar um serviço técnico (gestão de tráfego, automação, dados) de forma clara e gerar confiança imediata.',
    solution: 'Landing page com estrutura de funil, seções de planos e preços, e prova de processo (diagnóstico, implementação, otimização).',
    result: 'Página pronta para campanhas pagas, com hierarquia clara entre problema, solução e planos.',
    stack: ['React', 'SEO', 'Performance', 'UX'],
    image: ucanCaseImage,
    imageAlt: 'Landing page da agência de marketing U CAN',
    imageWidth: 1920,
    imageHeight: 13108,
    link: 'https://ucanmkt.com.br/',
  },
  {
    id: '02',
    slug: 'site-institucional-empresa',
    name: 'Site Institucional para Top Locações',
    objective: 'Apresentar serviços com clareza e fortalecer a presença digital.',
    challenge: 'Organizar informações comerciais sem deixar a experiência pesada.',
    solution: 'Estrutura institucional objetiva, com hierarquia visual clara e foco em credibilidade.',
    result: 'Site rápido, responsivo e preparado para gerar confiança no primeiro contato.',
    stack: ['React', 'UX'],
    image: companyCaseImage,
    imageAlt: 'Site institucional da Locações Top',
    imageWidth: 1920,
    imageHeight: 8860,
    link: 'https://locacoestop.com.br/',
  },
  {
    id: '03',
    slug: 'ecommerce-pombo-chester',
    name: 'Site institucional para banda Pombo Chester',
    objective: 'Vender Chesters e derivados diretamente pelo site, sem depender só de redes sociais.',
    challenge: 'Converter visitante em pedido sem checkout complexo, em um produto sazonal e concorrido.',
    solution: "Site com foco em SEO local (busca por 'Chester' + cidade/região) e formulário de pedido simplificado, direto para WhatsApp/e-mail.",
    result: 'Mais visibilidade orgânica na época de alta demanda e redução de fricção no pedido.',
    stack: ['SEO', 'Copywriting', 'E-commerce'],
    image: pomboCaseImage,
    imageAlt: 'E-commerce da Pombo Chester',
    imageWidth: 1906,
    imageHeight: 7336,
    link: 'https://pombo-chester.vercel.app/',
  },
  {
    id: '04',
    slug: 'aic-agencia-inteligencia',
    name: 'Agência de Inteligência Concorrencial (AIC)',
    objective: 'Apresentar a agência e direcionar clientes para a plataforma de registro autoral em blockchain.',
    challenge: 'Explicar um serviço técnico (propriedade intelectual, compliance concorrencial) de forma acessível para quem não é da área jurídica.',
    solution: 'Site institucional com hierarquia clara de serviços e CTA direto para a plataforma de registro.',
    result: 'Presença profissional que transmite autoridade técnica e facilita o primeiro contato.',
    stack: ['React', 'UX', 'Copywriting'],
    image: aicCaseImage,
    imageAlt: 'Site da Agência de Inteligência Concorrencial',
    imageWidth: 1920,
    imageHeight: 5925,
    link: 'https://www.agenciadeinteligencia.com.br/',
  },
  {
    id: '05',
    slug: 'proposta-clinica-vdutra',
    name: 'Proposta Comercial — Clínica VDutra',
    objective: 'Apresentar um diagnóstico da presença digital atual da clínica e propor uma nova estrutura.',
    challenge: 'Mostrar, com dados e argumentos, onde a clínica está perdendo oportunidades — sem soar genérico.',
    solution: 'Página de proposta estruturada como estudo de caso, com cenário atual, problemas identificados e plano de ação.',
    result: 'Material de vendas que já demonstra, na prática, a qualidade do trabalho entregue.',
    stack: ['UX', 'SEO', 'Estratégia'],
    image: dutraCaseImage,
    imageAlt: 'Proposta comercial para a Clínica VDutra',
    imageWidth: 1920,
    imageHeight: 17378,
    link: 'https://proposta-v-druta.vercel.app/',
  },
  {
    id: '06',
    slug: 'territorio-do-cafe',
    name: 'Território do Café',
    objective: 'Apresentar o complexo cafeeiro (produção, torra, cursos e loja) em um único site.',
    challenge: 'Organizar um negócio com várias frentes (venda B2B, loja, cursos, blog) sem confundir o visitante.',
    solution: 'Estrutura por seções claras — serviços, laboratório de provas, loja e conteúdo — com hierarquia visual que guia a navegação.',
    result: 'Site institucional completo que sustenta tanto vendas B2B quanto e-commerce.',
    stack: ['React', 'SEO', 'UX'],
    image: territorioCaseImage,
    imageAlt: 'Site institucional Território do Café',
    imageWidth: 1920,
    imageHeight: 7227,
    link: 'https://territoriodocafe33.com.br/',
  },
];

export const featuredCaseTags = [...new Set(featuredCases.flatMap((project) => project.stack))];

export function getFeaturedCaseBySlug(slug) {
  return featuredCases.find((project) => project.slug === slug);
}
