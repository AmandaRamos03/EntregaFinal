import React from 'react';
import { useNavigate } from 'react-router-dom';

const CarrinhoSidebar = ({ carrinho, carrinhoAberto, fecharCarrinho, removerItem }) => {
  const navigate = useNavigate();

  const subtotal = carrinho.reduce((total, item) => total + item.preco * item.qtd, 0);
  const taxaEntrega = 5;
  const total = subtotal + taxaEntrega;

  const subtotalFormatado = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const taxaEntregaFormatada = taxaEntrega.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const totalFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const irParaPagamento = () => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    navigate('/pagamento'); // Página futura
  };

  return (
    <div className={`carrinho-lateral ${carrinhoAberto ? 'aberto' : ''}`}>
      <button className="btn" onClick={fecharCarrinho}>X</button>
      <h3>Seu Carrinho</h3>
      <ul>
        {carrinho.map((item, index) => (
          <li key={index}>
            {item.qtd}x {item.nome} – {(item.qtd * item.preco).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
            <button onClick={() => removerItem(item.nome)}>❌</button>
          </li>
        ))}
      </ul>
      <p className="entrega-msg">Taxa de entrega: {taxaEntregaFormatada}</p>
      <p><strong>Total:</strong> <span>{totalFormatado}</span></p>

      <button className="btn-finalizar" onClick={irParaPagamento}>
        Finalizar Pedido
      </button>
    </div>
  );
};

export default CarrinhoSidebar;
