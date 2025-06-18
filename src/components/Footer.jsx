import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const validarEmail = (valor) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  };

  const handleInscrever = () => {
    if (validarEmail(email)) {
      alert('Inscrição enviada!');
      setEmail('');
    } else {
      alert('Digite um e-mail válido.');
    }
  };

  return (
    <>
      <footer className="footer" id="informacoes">
        <div className="footer-col">
          <img src="/img/logo.png" alt="Yummy Logo" />
          <p>Compre com segurança e rapidez no Yummy!</p>
        </div>

        <div className="footer-col">
          <h4>Receba ofertas exclusivas</h4>
          <form onSubmit={(e) => { e.preventDefault(); handleInscrever(); }}>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn verde">Inscrever</button>
          </form>
        </div>

        <div className="footer-col">
          <h4>Páginas Legais</h4>
          <ul>
            <li><span>Termos de Uso</span></li>
            <li><span>Política de Privacidade</span></li>
            <li><span>Sobre o Yummy</span></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Links Importantes</h4>
          <ul>
            <li><span>Ajuda e Suporte</span></li>
            <li><span>Cadastro de Restaurantes</span></li>
            <li><span>Seja nosso parceiro</span></li>
          </ul>
        </div>
      </footer>

      <div className="bottom-bar">
        &copy; 2025 Yummy. Todos os direitos reservados.
      </div>
    </>
  );
};

export default Footer;
