import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/Header';
import './cadastro.css';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmar: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, email, senha, confirmar } = formData;
    if (!nome || !email || !senha || !confirmar) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    if (senha !== confirmar) {
      alert('As senhas não coincidem.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });
      if (response.ok) {
        alert('Conta criada com sucesso!');
        navigate('/');
      } else {
        const data = await response.json();
        alert(data.error || 'Erro ao criar conta.');
      }
    } catch (error) {
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <>
      <Header />
      <div className="form-container">
        <div className="form-box">
          <h2>Crie sua conta na Yummy</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome completo</label>
            <input
              type="text"
              id="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />

            <label htmlFor="confirmar">Confirmar Senha</label>
            <input
              type="password"
              id="confirmar"
              value={formData.confirmar}
              onChange={handleChange}
              required
            />

            <button type="submit">Criar Conta</button>

            <div className="extra">
              <p>
                Já tem uma conta? <Link to="/login">Fazer login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Cadastro;
