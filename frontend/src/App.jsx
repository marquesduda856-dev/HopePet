import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MiniNavbar as Navbar } from './components/ui/mini-navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Historias from './pages/Historias';
import EnviarHistoria from './pages/EnviarHistoria';
import HistoriaDetalhes from './pages/HistoriaDetalhes';
import Ongs from './pages/Ongs';
import IndiqueOng from './pages/IndiqueOng';
import Mapa from './pages/Mapa';

import EncontrouAnimal from './pages/EncontrouAnimal';
import Busca from './pages/Busca';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre';
import Adocao from './pages/Adocao';
import Cuidados from './pages/Cuidados';
import Protecao from './pages/Protecao';
import Conscientizacao from './pages/Conscientizacao';
import Comunidade from './pages/Comunidade';

import { useLocation } from 'react-router-dom';

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${!isHome ? 'pt-24 md:pt-28' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historias" element={<Historias />} />
          <Route path="/historias/nova" element={<EnviarHistoria />} />
          <Route path="/historias/:id" element={<HistoriaDetalhes />} />
          <Route path="/ongs" element={<Ongs />} />
          <Route path="/ongs/indique" element={<IndiqueOng />} />
          <Route path="/mapa" element={<Mapa />} />

          <Route path="/encontrou-animal" element={<EncontrouAnimal />} />
          <Route path="/busca" element={<Busca />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/adocao" element={<Adocao />} />
          <Route path="/cuidados" element={<Cuidados />} />
          <Route path="/protecao" element={<Protecao />} />
          <Route path="/conscientizacao" element={<Conscientizacao />} />
          <Route path="/comunidade" element={<Comunidade />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
