import React, { useState } from 'react';

const Entrega = () => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');

  const enviarDadosEntrega = () => {
    if (!nome || !endereco) {
      alert('Por favor, preencha nome e endereço.');
      return;
    }

    const dadosEntrega = { nome, endereco, telefone };
    localStorage.setItem('dadosEntrega', JSON.stringify(dadosEntrega));
    alert('Dados enviados com sucesso!');
  };

  return (
    <section className="entrega">
      <h2>Informações de Entrega</h2>
      <input type="text" placeholder="Seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input type="text" placeholder="Rua, Número, Bairro, Cidade" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
      <input type="text" placeholder="(00) 00000-0000 (Opcional)" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      <button className="btn-enviar" onClick={enviarDadosEntrega}>Enviar Dados</button>
    </section>
  );
};

export default Entrega;
