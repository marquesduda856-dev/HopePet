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
import Chatbot from './pages/Chatbot';
import EncontrouAnimal from './pages/EncontrouAnimal';
import Busca from './pages/Busca';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/historias" element={<Historias />} />
            <Route path="/historias/nova" element={<EnviarHistoria />} />
            <Route path="/historias/:id" element={<HistoriaDetalhes />} />
            <Route path="/ongs" element={<Ongs />} />
            <Route path="/ongs/indique" element={<IndiqueOng />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/pergunte-ao-hope" element={<Chatbot />} />
            <Route path="/encontrou-animal" element={<EncontrouAnimal />} />
            <Route path="/busca" element={<Busca />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
