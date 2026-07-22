export const SITE_URL = 'https://potifolio-krd.vercel.app';
export const SITE_NAME = 'Kayky Rugani Dev';
export const SOCIAL_IMAGE_URL = '';

export const ROUTE_SEO = Object.freeze({
  '/': {
    title: 'Kayky Rugani | Criação de Sites e Landing Pages em Franca',
    description: 'Desenvolvedor web especializado na criação de sites profissionais e landing pages para empresas em Franca e região. Projetos modernos, responsivos e personalizados.',
  },
  '/sobre': {
    title: 'Sobre Kayky Rugani | Desenvolvedor Web em Franca',
    description: 'Conheça Kayky Rugani, desenvolvedor web em Franca focado em sites, landing pages, SEO técnico, performance e experiências digitais profissionais.',
  },
  '/servicos': {
    title: 'Criação de Sites e Landing Pages em Franca | Kayky Rugani',
    description: 'Criação de sites institucionais, landing pages e manutenção para empresas em Franca e região, com foco em SEO, performance e conversão.',
  },
  '/projetos': {
    title: 'Projetos de Sites e Landing Pages | Kayky Rugani Dev',
    description: 'Conheça projetos de sites, landing pages e experiências digitais desenvolvidos com estratégia, responsividade, SEO técnico e foco em resultados.',
  },
  '/tecnologias': {
    title: 'Tecnologias para Desenvolvimento Web | Kayky Rugani Dev',
    description: 'Tecnologias aplicadas à criação de sites rápidos, responsivos e preparados para SEO, performance, manutenção e evolução contínua.',
  },
  '/contato': {
    title: 'Contato | Criação de Sites em Franca | Kayky Rugani',
    description: 'Entre em contato com Kayky Rugani Dev para criar sites profissionais e landing pages para empresas, autônomos e negócios em Franca e região.',
  },
});

export function normalizePathname(pathname) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.replace(/\/+$/, '');
}

export function getCanonicalUrl(pathname) {
  const normalizedPathname = normalizePathname(pathname);
  return normalizedPathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalizedPathname}`;
}
