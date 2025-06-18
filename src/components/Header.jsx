import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

const Header = ({ abrirCarrinho, carrinhoQtd }) => {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <img src="/img/logo.png" alt="Yummy Logo" />
        </div>

        <nav>
          <ul>
            <li><a href="#inicio">Início</a></li>
            <li><a href="#categorias">Categorias</a></li>
            <li><a href="#restaurantes">Restaurantes</a></li>
            <li><a href="#informacoes">Informações</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <Link to="/login" className="btn login">Login</Link>
          <Link to="/cadastro" className="btn cadastro">Cadastrar</Link>
          <Link to="/restaurantes/cadastroRestaurante" className="btn cadastro-restaurante">Cadastrar Restaurante</Link>
          
          <button className="btn-carrinho" onClick={abrirCarrinho}>
            🛒 Carrinho <span id="contador-carrinho">{carrinhoQtd}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
