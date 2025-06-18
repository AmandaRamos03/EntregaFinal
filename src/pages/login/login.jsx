import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/Header';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      const data = await response.json();
      if (response.ok) {
        // Salva o token no localStorage (ou outro local seguro)
        localStorage.setItem('token', data.token);
        alert('Login realizado com sucesso!');
        navigate('/');
      } else {
        alert(data.error || 'Erro ao fazer login.');
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
          <h2>Entrar na Yummy</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <button type="submit">Entrar</button>

            <div className="extra">
              <p>
                Não tem uma conta? <Link to="/cadastro">Criar conta</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
