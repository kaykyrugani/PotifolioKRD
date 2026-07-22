import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getCanonicalUrl,
  normalizePathname,
  ROUTE_SEO,
  SITE_NAME,
  SOCIAL_IMAGE_URL,
} from '../../config/seo';

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function removeMeta(attribute, key) {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove();
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPathname = normalizePathname(pathname);
    const seo = ROUTE_SEO[normalizedPathname];
    const isPublicRoute = Boolean(seo);
    const currentSeo = seo ?? ROUTE_SEO['/'];
    const canonicalUrl = getCanonicalUrl(normalizedPathname);

    document.title = currentSeo.title;
    document.documentElement.lang = 'pt-BR';

    upsertMeta('name', 'description', currentSeo.description);
    upsertMeta('name', 'author', 'Kayky Rugani');
    upsertMeta('name', 'robots', isPublicRoute
      ? 'index, follow, max-image-preview:large'
      : 'noindex, follow');

    upsertMeta('property', 'og:title', currentSeo.title);
    upsertMeta('property', 'og:description', currentSeo.description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', 'pt_BR');

    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', currentSeo.title);
    upsertMeta('name', 'twitter:description', currentSeo.description);

    if (SOCIAL_IMAGE_URL) {
      upsertMeta('property', 'og:image', SOCIAL_IMAGE_URL);
      upsertMeta('name', 'twitter:image', SOCIAL_IMAGE_URL);
    } else {
      removeMeta('property', 'og:image');
      removeMeta('name', 'twitter:image');
    }

    upsertCanonical(canonicalUrl);
  }, [pathname]);

  return null;
}
