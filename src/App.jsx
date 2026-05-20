import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import TechnologiesPage from './pages/TechnologiesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/servicos" element={<ServicesPage />} />
      <Route path="/projetos" element={<ProjectsPage />} />
      <Route path="/tecnologias" element={<TechnologiesPage />} />
      <Route path="/contato" element={<Contact />} />
    </Routes>
  );
}

export default App;
