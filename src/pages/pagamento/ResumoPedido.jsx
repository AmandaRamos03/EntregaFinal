import React, { useEffect, useState } from 'react';

const ResumoPedido = () => {
  const [resumo, setResumo] = useState([]);
  const [total, setTotal] = useState(0);
  const taxaEntrega = 5;

  useEffect(() => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let subtotal = 0;

    const itens = carrinho.map(item => {
      const totalItem = item.qtd * item.preco;
      subtotal += totalItem;
      return { nome: item.nome, qtd: item.qtd, totalItem };
    });

    setResumo(itens);
    setTotal(subtotal + taxaEntrega);
  }, []);

  return (
    <aside className="resumo">
      <h2>Resumo do Pedido</h2>
      {resumo.length === 0 ? (
        <p style={{ color: 'gray' }}>Carrinho vazio.</p>
      ) : (
        <>
          {resumo.map((item, i) => (
            <div className="item" key={i}>
              <p>{item.nome} (x{item.qtd})</p>
              <span>R$ {item.totalItem.toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="item"><p>Subtotal</p><span>R$ {(total - taxaEntrega).toFixed(2)}</span></div>
          <div className="item"><p>Taxa de Entrega</p><span>R$ {taxaEntrega.toFixed(2)}</span></div>
          <div className="item total"><p><strong>Total</strong></p><span><strong>R$ {total.toFixed(2)}</strong></span></div>
        </>
      )}
    </aside>
  );
};

export default ResumoPedido;
