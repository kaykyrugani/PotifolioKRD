import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectsPage from './pages/ProjectsPage';
import ProjectCasePage from './pages/ProjectCasePage';
import ServicesPage from './pages/ServicesPage';
import Seo from './components/seo/Seo';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const frame = window.requestAnimationFrame(() => {
      const anchor = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;

      if (anchor) {
        anchor.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash, pathname]);

  return null;
}

function App() {
  return (
    <>
      <Seo />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/servicos" element={<ServicesPage />} />
        <Route path="/projetos" element={<ProjectsPage />} />
        <Route path="/projetos/:slug" element={<ProjectCasePage />} />
        <Route path="/tecnologias" element={<Navigate to="/servicos" replace />} />
        <Route path="/contato" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
