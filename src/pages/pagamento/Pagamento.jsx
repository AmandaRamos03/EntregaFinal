import React, { useEffect, useState } from 'react';
import Entrega from './Entrega';
import ResumoPedido from './ResumoPedido';
import MetodoPagamento from './MetodoPagamento';
import './style.css';

const Pagamento = () => {
  return (
    <main className="checkout-container">
      <h1>Finalizar Compra</h1>
      <div className="checkout-content">
        <Entrega />
        <ResumoPedido />
      </div>
      <MetodoPagamento />
    </main>
  );
};

export default Pagamento;
