import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import cartIcon from '/img/cart.png';
import logo from '/img/logo.png';
import setaIcon from '/img/seta.png';
import hamburgueriaLogo from '/img/hamburgueriaLogo.png';
import produtos from './data';
import RatingForm from '../../../components/RatingForm';
import RatingList from '../../../components/RatingList';

const HamburgueriaDoChefe = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [avaliacoes, setAvaliacoes] = useState([]);

  const adicionarAoCarrinho = (item) => {
    setCarrinho([...carrinho, item]);
  };

  const irParaPagamento = () => {
    console.log('Indo para o pagamento...');
  };

  const total = carrinho.reduce((soma, item) => soma + item.preco, 0).toFixed(2);

  const handleNovaAvaliacao = (novaAvaliacao) => {
    setAvaliacoes(prev => [...prev, novaAvaliacao]);
  };

  return (
    <>
      <header>
        <div className="header-container">
          <div className="logo">
            <img src={logo} alt="Yummy Logo" />
          </div>
          <div className="header-actions">
            <div className="header-actions">
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/cadastro" className="btn-cadastro">Cadastro</Link>
            </div>
            <button className="btn-carrinho" onClick={() => setCarrinhoAberto(true)}>
              🛒 Carrinho <span>{carrinho.length}</span>
            </button>
          </div>
        </div>
      </header>

      {carrinhoAberto && (
        <div id="carrinhoAba" className="carrinho-lateral">
          <button className="btn" onClick={() => setCarrinhoAberto(false)}>X</button>
          <h3>Seu Carrinho</h3>
          <ul>
            {carrinho.map((item, index) => (
              <li key={index}>{item.nome} - R$ {item.preco.toFixed(2)}</li>
            ))}
          </ul>
          <p className="entrega-msg">Taxa de entrega: R$ 5,00</p>
          <p><strong>Total:</strong> R$ {parseFloat(total) + 5}</p>
          <button className="btn-ir-pagamento" onClick={irParaPagamento}>
            Próximo <img src={setaIcon} alt="Seta" style={{ width: '18px', marginLeft: '8px' }} />
          </button>
        </div>
      )}

      <section className="restaurant-banner">
        <div className="restaurant-logo">
          <img src={hamburgueriaLogo} alt="Logo Hamburgueria do Chefe" />
        </div>
        <div className="restaurant-details">
          <h1>Hamburgueria do Chefe</h1>
          <p>Aberta até: 00:00</p>
          <p>Mínimo do Pedido: R$ 15,00</p>
          <p>Tempo de entrega: 20–35 min</p>
        </div>
      </section>

      <section className="menu">
        <h2>Hambúrgueres</h2>
        <div className="menu-items">
          {produtos.map((produto, index) => (
            <div className="menu-item" key={index}>
              <img src={produto.imagem} alt={produto.nome} />
              <h3>{produto.nome}</h3>
              <p>{produto.descricao}</p>
              <br />
              <span>R$ {produto.preco.toFixed(2)}</span>
              <button className="btn-carrinho" onClick={() => adicionarAoCarrinho(produto)}>
                <img src={cartIcon} alt="Ícone Carrinho" /> +
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Avaliações */}
      <section className="avaliacoes">
        <h2>Avaliações</h2>
        <RatingForm restauranteId="hamburgueria-do-chefe" onAvaliar={handleNovaAvaliacao} />
        <RatingList avaliacoes={avaliacoes} />
      </section>

      <footer className="footer" id="informacoes">
        <div className="footer-col">
          <img src={logo} alt="Yummy Logo" />
          <p>Compre com segurança e rapidez no Yummy!</p>
        </div>
        <div className="footer-col">
          <h4>Receba ofertas exclusivas</h4>
          <input type="email" placeholder="Digite seu e-mail" />
          <button className="btn verde">Inscrever</button>
        </div>
        <div className="footer-col">
          <h4>Páginas Legais</h4>
          <ul>
            <li><a href="#">Termos de Uso</a></li>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Sobre o Yummy</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Links Importantes</h4>
          <ul>
            <li><a href="#">Ajuda e Suporte</a></li>
            <li><a href="#">Cadastro de Restaurantes</a></li>
            <li><a href="#">Seja nosso parceiro</a></li>
          </ul>
        </div>
      </footer>

      <div className="bottom-bar">
        &copy; 2025 Yummy. Todos os direitos reservados.
      </div>
    </>
  );
};

export default HamburgueriaDoChefe;
