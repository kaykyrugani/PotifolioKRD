import { useCallback } from 'react';
import { services } from '../../data/siteContent';
import { whatsappUrl } from '../../utils/contact';
import Button from '../ui/Button';
import styles from './Services.module.css';

const processFlow = ['Estratégia', 'Design', 'Desenvolvimento', 'Resultado'];

const serviceNarratives = {
  'Sites Institucionais': {
    category: 'Presença digital',
    title: 'Sites institucionais para fortalecer presença digital',
    description: 'Uma estrutura institucional clara para apresentar marca, serviços e diferenciais com autoridade, leitura fluida e base técnica preparada para busca.',
    benefits: [
      'Estrutura preparada para mecanismos de busca',
      'Experiência consistente em qualquer dispositivo',
      'Arquitetura de páginas com leitura objetiva',
      'Base semântica preparada para crescimento futuro',
    ],
    result: 'Uma presença digital profissional, organizada e pronta para gerar confiança.',
  },
  'Landing Pages': {
    category: 'Conversão',
    title: 'Landing pages para transformar campanhas em oportunidades',
    description: 'Páginas focadas em oferta, hierarquia visual e ação para apoiar campanhas, lançamentos e captação de leads com menos atrito.',
    benefits: [
      'Mensagem organizada por prioridade de decisão',
      'CTAs posicionados para orientar o próximo passo',
      'Carregamento rápido e navegação fluida',
      'Estrutura preparada para leitura e mensuração',
    ],
    result: 'Uma página objetiva para converter tráfego em contatos qualificados.',
  },
  Hospedagem: {
    category: 'Publicação',
    title: 'Hospedagem e publicação para colocar o site em operação',
    description: 'Preparação do ambiente, configuração inicial e publicação com atenção a estabilidade, segurança disponível e boas práticas de entrega.',
    benefits: [
      'Deploy orientado para reduzir riscos na publicação',
      'Configuração inicial alinhada ao projeto',
      'Boas práticas para estabilidade e acesso',
      'Ambiente preparado para manutenção futura',
    ],
    result: 'Um site publicado com base técnica organizada para operar com consistência.',
  },
  Manutenção: {
    category: 'Evolução',
    title: 'Manutenção para manter o site claro, atual e saudável',
    description: 'Ajustes, melhorias visuais e evolução contínua para preservar qualidade, atualizar conteúdo e manter a experiência alinhada ao negócio.',
    benefits: [
      'Correções pontuais com foco em estabilidade',
      'Melhorias visuais sem perder consistência',
      'Conteúdo atualizado com manutenção simples',
      'Acompanhamento técnico para evolução contínua',
    ],
    result: 'Um site mais confiável, atualizado e preparado para continuar evoluindo.',
  },
};

function getServiceNarrative(service) {
  return serviceNarratives[service.title] ?? {
    category: 'Solução digital',
    title: service.title,
    description: service.description,
    benefits: service.items,
    result: 'Uma solução digital mais clara, rápida e preparada para evoluir.',
  };
}

function getServiceCtaLabel(service) {
  if (service.ctaLabel) return service.ctaLabel;

  const normalizedTitle = service.title.toLowerCase();

  if (normalizedTitle.includes('landing')) return 'Criar minha landing page';
  if (normalizedTitle.includes('hosped')) return 'Ver opções de hospedagem';
  if (normalizedTitle.includes('manuten')) return 'Solicitar manutenção';
  if (normalizedTitle.includes('site')) return 'Conversar sobre site institucional';

  return 'Conversar sobre este serviço';
}

function ServicesDecoration() {
  return (
    <div className={styles.decoration} aria-hidden="true">
      <span className={styles.glowLeft} />
      <span className={styles.glowRight} />
      <svg className={styles.orbit} viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="servicesOrbitGradient" x1="28" y1="38" x2="224" y2="222" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00C2FF" />
            <stop offset="0.54" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <circle cx="130" cy="130" r="102" />
        <circle cx="130" cy="130" r="66" />
        <path d="M32 136c18-58 55-94 110-108 33-8 62-3 88 15" />
        <path d="M226 124c-22 62-62 98-119 108-32 6-60-2-82-22" />
        <circle className={styles.orbitDot} cx="213" cy="118" r="5" />
      </svg>
    </div>
  );
}

export default function Services({ reveal }) {
  const setSectionRef = useCallback((node) => {
    reveal?.setRevealSectionRef('services', node);
  }, [reveal]);

  return (
    <section
      id="servicos"
      className={reveal?.getRevealSectionClassName(styles.servicesSection, 'services') ?? styles.servicesSection}
      ref={setSectionRef}
      aria-labelledby="services-title"
    >
      <ServicesDecoration />

      <div className={styles.servicesContainer}>
        <header className={styles.sectionIntro}>
          <div className={styles.sectionHeading}>
            <span className={`${styles.eyebrow} ${reveal?.styles.revealEyebrow ?? ''}`}>Serviços</span>
            <h2 id="services-title" className={reveal?.styles.revealTitle}>
              Soluções digitais para presença, performance e conversão.
            </h2>
          </div>

          <div className={styles.sectionContext}>
            <p className={reveal?.styles.revealDescription}>
              Desenvolvimento de sites, landing pages, hospedagem e manutenção com foco em clareza,
              velocidade e resultado comercial. Cada solução é pensada para fortalecer sua presença digital
              e transformar visitantes em oportunidades reais.
            </p>

            <ol className={styles.processFlow} aria-label="Fluxo de construção da solução digital">
              {processFlow.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
          </div>
        </header>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => {
            const narrative = getServiceNarrative(service);

            return (
              <article className={`${styles.card} ${index === 0 ? styles.cardFeatured : ''}`} key={service.title}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.cardCategory}>{narrative.category}</span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardCopy}>
                    <h3>{narrative.title}</h3>
                    <p>{narrative.description}</p>
                  </div>

                  <div className={styles.cardBenefits}>
                    <span>Benefícios da solução</span>
                    <ul>
                      {narrative.benefits.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.serviceResult}>
                    <span>Resultado esperado</span>
                    <strong>{narrative.result}</strong>
                  </div>

                  <Button
                    className={styles.cardCta}
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant={index === 0 ? 'primary' : 'secondary'}
                  >
                    {getServiceCtaLabel(service)}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
