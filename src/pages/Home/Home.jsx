import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CarrinhoSidebar from '../../components/CarrinhoSidebar';
import ProdutoCard from '../../components/ProdutoCard';
import './style.css';

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(() => setProdutos([]));
  }, []);

  const adicionarAoCarrinho = (id, nome, preco) => {
    const existente = carrinho.find(item => item.id === id);
    if (existente) {
      const novoCarrinho = carrinho.map(item =>
        item.id === id ? { ...item, qtd: item.qtd + 1 } : item
      );
      setCarrinho(novoCarrinho);
    } else {
      setCarrinho([...carrinho, { id, nome, preco, qtd: 1 }]);
    }
  };

  const removerItem = (nome) => {
    const novoCarrinho = carrinho
      .map(item =>
        item.nome === nome ? { ...item, qtd: item.qtd - 1 } : item
      )
      .filter(item => item.qtd > 0);
    setCarrinho(novoCarrinho);
  };

  return (
    <>
      <Header abrirCarrinho={() => setCarrinhoAberto(true)} carrinhoQtd={carrinho.reduce((a, b) => a + b.qtd, 0)} />

      <main>
        <section className="hero" id="inicio">
          <div className="hero-content">
            <h1>Comidas <span className="highlight">Deliciosas</span>,<br />Pertinho de Você!</h1>
            <p>Peça agora e aproveite ofertas imperdíveis.</p>
          </div>
          <div className="hero-img">
            <img src="/img/hero1.png" alt="Pessoa comendo pizza" />
          </div>
        </section>

        <section className="categorias" id="categorias">
          <h2>Categorias Populares no Yummy 🍕</h2>
          <div className="categorias-grid">
            <div className="categoria"><img src="/img/hamburguer-icon.png" alt="Hambúrguer" /><p>Hambúrguer</p></div>
            <div className="categoria"><img src="/img/marmita-icon.png" alt="Marmita" /><p>Marmita</p></div>
            <div className="categoria"><img src="/img/pizza-icon.png" alt="Pizza" /><p>Pizza</p></div>
            <div className="categoria"><img src="/img/saladas-icon.png" alt="Saladas" /><p>Saladas</p></div>
          </div>
        </section>

        <section className="restaurantes" id="restaurantes">
          <h2>Pedidos dos Restaurantes mais Populares do Yummy</h2>
          <div className="restaurantes-grid">
            {produtos.map((produto, index) => (
              <ProdutoCard key={index} {...produto} adicionarAoCarrinho={adicionarAoCarrinho} />
            ))}
          </div>
        </section>
      </main>

      <CarrinhoSidebar
        carrinho={carrinho}
        carrinhoAberto={carrinhoAberto}
        fecharCarrinho={() => setCarrinhoAberto(false)}
        removerItem={removerItem}
      />

      <Footer />
    </>
  );
};

export default Home;
