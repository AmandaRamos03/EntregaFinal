import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MetodoPagamento = () => {
  const [metodo, setMetodo] = useState('');
  const navigate = useNavigate();

  const copiarCodigoPix = () => {
    navigator.clipboard.writeText('00020126430014BR.GOV.BCB.PIX0114...')
      .then(() => alert('Código Pix copiado com sucesso!'))
      .catch(() => alert('Não foi possível copiar o código.'));
  };

  // Integração com backend para finalizar pedido
  const finalizarPagamento = async () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
      alert('Carrinho vazio!');
      return;
    }
    // Simulação de campos obrigatórios (ajuste conforme seu fluxo real)
    const restauranteId = 1; // Exemplo fixo
    const enderecoId = 1; // Exemplo fixo
    const formaPagamentoId = metodo === 'pix' ? 1 : metodo === 'credito' ? 2 : 3; // Exemplo
    const itens = carrinho.map(item => ({ produtoId: item.id, quantidade: item.qtd }));
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3001/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ restauranteId, enderecoId, formaPagamentoId, itens })
      });
      if (response.ok) {
        alert('Pedido realizado com sucesso!');
        localStorage.removeItem('carrinho');
        navigate('/sucesso');
      } else {
        const data = await response.json();
        alert(data.error || 'Erro ao finalizar pedido.');
      }
    } catch (error) {
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <section className="pagamento">
      <h2>Métodos de Pagamento</h2>
      <div className="opcoes">
        <button className={`tab ${metodo === 'pix' ? 'ativo' : ''}`} onClick={() => setMetodo('pix')}>Pix</button>
        <button className={`tab ${metodo === 'credito' ? 'ativo' : ''}`} onClick={() => setMetodo('credito')}>Crédito</button>
        <button className={`tab ${metodo === 'debito' ? 'ativo' : ''}`} onClick={() => setMetodo('debito')}>Débito</button>
      </div>

      {metodo === 'pix' && (
        <div className="pagamento-info">
          <img src="/img/qrcode.png" className="qr" alt="QR Code Pix" />
          <p><strong>Pague com Pix</strong><br />Escaneie o QR Code ou copie o código abaixo para pagar.</p>
          <input readOnly value="00020126430014BR.GOV.BCB.PIX0114..." />
          <button className="copiar" onClick={copiarCodigoPix}>Copiar Código Pix</button>
          <button className="btn-finalizar" onClick={finalizarPagamento}>Finalizar Pagamento</button>
        </div>
      )}

      {metodo === 'credito' && (
        <div className="pagamento-info">
          <p><strong>Pague com Cartão de Crédito</strong></p>
          <input type="text" placeholder="Número do Cartão" />
          <input type="text" placeholder="Nome no Cartão" />
          <input type="text" placeholder="Validade (MM/AA)" />
          <input type="text" placeholder="CVV" />
          <button className="btn-finalizar" onClick={finalizarPagamento}>Finalizar Pagamento</button>
        </div>
      )}

      {metodo === 'debito' && (
        <div className="pagamento-info">
          <p><strong>Pague com Cartão de Débito</strong></p>
          <input type="text" placeholder="Número do Cartão" />
          <input type="text" placeholder="Banco" />
          <input type="text" placeholder="Validade (MM/AA)" />
          <button className="btn-finalizar" onClick={finalizarPagamento}>Finalizar Pagamento</button>
        </div>
      )}
    </section>
  );
};

export default MetodoPagamento;
