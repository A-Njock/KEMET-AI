import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Outils from './pages/Outils';
import Formations from './pages/Formations';
import Immobilier from './pages/Immobilier';
import AchatVente from './pages/AchatVente';
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/outils" element={<Outils />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/immobilier" element={<Immobilier />} />
        <Route path="/achat-vente" element={<AchatVente />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;

