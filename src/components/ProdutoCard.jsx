import React from 'react';
import { Link } from 'react-router-dom';

// 1. Adicione 'id' na lista de props que o componente recebe
const ProdutoCard = ({ 
  id, // <--- ADICIONE AQUI
  nome = 'Produto sem nome', 
  preco = 0, 
  imagem,
  restaurante = 'Restaurante não informado', 
  descricao, 
  adicionarAoCarrinho 
}) => {
  
  const slug = restaurante
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-');

  return (
    <div className="card">
      {}
      <div className="card-img">
        <img src={imagem || '/img/placeholder.png'} alt={nome} />
        <div className="card-nome">
          <Link to={`/restaurantes/${slug}`}>{restaurante}</Link>
        </div>
      </div>

      <p><strong>{nome}</strong></p>
      {descricao && <p className="descricao">{descricao}</p>}

      <span className="preco">R$ {preco.toFixed(2)}</span>

      {adicionarAoCarrinho && (
        // 2. Passe o 'id' como o primeiro argumento na chamada da função
        <button onClick={() => adicionarAoCarrinho(id, nome, preco)} className="btn-carrinho">
          <img src="/img/cart.png" alt="Carrinho" /> +
        </button>
      )}
    </div>
  );
};

export default ProdutoCard;