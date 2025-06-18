import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import HamburgueriaDoChefe from "./pages/restaurantes/HamburgueriaDoChefe/HamburgueriaDoChefe.jsx";
import MarmitaSaudavel from "./pages/restaurantes/MarmitaSaudavel/MarmitaSaudavel.jsx";
import PizzariaDoSeuZe from "./pages/restaurantes/PizzariaDoSeuZe/PizzariaDoSeuZe.jsx";
import Cadastro from './pages/cadastro/Cadastro.jsx';
import Login from './pages/Login/Login.jsx';
import Pagamento from './pages/pagamento/Pagamento';
import CadastroRestaurante from './pages/restaurantes/cadastroRestaurante/cadastroRestaurante.jsx';
import Sucesso from './pages/pagamento/Sucesso';
import ScrollToTop from './components/ScrollToTop';


function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/restaurantes/hamburgueria-do-chefe" element={<HamburgueriaDoChefe />} />
        <Route path="/restaurantes/marmita-saudavel" element={<MarmitaSaudavel />} />
        <Route path="/restaurantes/pizzaria-do-seu-ze" element={<PizzariaDoSeuZe />} />
        <Route path="/restaurantes/cadastroRestaurante" element={<CadastroRestaurante/>}/>
       <Route path="/cadastro" element={<Cadastro />} />
       <Route path="/login" element={<Login />} />
       <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/sucesso" element={<Sucesso />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
