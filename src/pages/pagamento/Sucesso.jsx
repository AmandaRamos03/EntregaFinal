import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/sucesso.css';

const Sucesso = () => {
  const navigate = useNavigate();

  return (
    <div className="sucesso-container">
      <img
        src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
        alt="Verificado"
        className="verificado"
      />
      <h1>Pedido efetuado com sucesso!</h1>
      <button className="voltar" onClick={() => navigate('/')}>
        Voltar à página inicial
      </button>
    </div>
  );
};

export default Sucesso;
