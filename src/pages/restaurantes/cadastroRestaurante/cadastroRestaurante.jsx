import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import './cadastroRestauranteStyle.css';

const CadastroRestaurante = () => {
  const [formData, setFormData] = useState({
    nome: '',
    taxaFrete: '',
    cozinhaId: '',
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidadeId: '1',
    },
    formasPagamentoIds: [],
  });

  const [cozinhas, setCozinhas] = useState([]);
  const [formasPagamento, setFormasPagamento] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // --- INÍCIO DA ALTERAÇÃO ---

      // 1. Pegar o token do localStorage, assim como na função de submit
      const token = localStorage.getItem('authToken');

      // 2. Se não houver token, não há porque continuar
      if (!token) {
        setError('Você precisa estar logado para acessar esta página.');
        setLoading(false);
        // Opcional: redirecionar para o login imediatamente
        // navigate('/login');
        return;
      }

      try {
        // 3. Adicionar o objeto de opções com os headers na chamada fetch
        const response = await fetch('http://localhost:3001/api/restaurantes/opcoes', {
          headers: {
            // Adiciona o token de autorização ao cabeçalho
            'Authorization': `Bearer ${token}`
          }
        });

      // --- FIM DA ALTERAÇÃO ---

        if (!response.ok) {
          // Se o token for inválido (expirado), o backend retornará 401 ou 403
          if (response.status === 401 || response.status === 403) {
            throw new Error('Sessão inválida ou expirada. Faça o login novamente.');
          }
          throw new Error('Falha ao carregar dados do formulário.');
        }

        const data = await response.json();

        setCozinhas(data.cozinhas);
        setFormasPagamento(data.formasPagamento);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]); // Adicionamos 'navigate' como dependência por ser usado no useEffect

  // O resto do seu componente continua igual...
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      endereco: { ...prev.endereco, [name]: value },
    }));
  };

  const handleFormasPagamentoChange = (e) => {
    const { value, checked } = e.target;
    const id = parseInt(value);
    
    setFormData(prev => {
      let novasIds = [...prev.formasPagamentoIds];
      if (checked) {
        novasIds.push(id);
      } else {
        novasIds = novasIds.filter(fpId => fpId !== id);
      }
      return { ...prev, formasPagamentoIds: novasIds };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('É necessário estar autenticado para cadastrar um restaurante.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/restaurantes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Restaurante cadastrado com sucesso!');
        navigate('/');
      } else {
        const data = await response.json();
        setError(data.error || 'Erro ao cadastrar restaurante.');
      }
    } catch (error) {
      setError('Erro de conexão com o servidor.');
    }
  };
  
  if (loading) {
      return <div>A carregar formulário...</div>;
  }

  return (
    <>
      <Header />
      <div className="form-container">
        <div className="form-box form-box-large"> 
          <h2>Cadastre o seu Restaurante</h2>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            
            <fieldset>
              <legend>Informações do Restaurante</legend>
              <label htmlFor="nome">Nome do Restaurante</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
              
              <label htmlFor="taxaFrete">Taxa de Frete (R$)</label>
              <input type="number" name="taxaFrete" step="0.01" value={formData.taxaFrete} onChange={handleChange} required />

              <label htmlFor="cozinhaId">Tipo de Cozinha</label>
              <select name="cozinhaId" value={formData.cozinhaId} onChange={handleChange} required>
                <option value="">Selecione...</option>
                {cozinhas.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </fieldset>

            <fieldset>
              <legend>Endereço</legend>
              <label htmlFor="cep">CEP</label>
              <input type="text" name="cep" value={formData.endereco.cep} onChange={handleEnderecoChange} required />
              <label htmlFor="logradouro">Logradouro</label>
              <input type="text" name="logradouro" value={formData.endereco.logradouro} onChange={handleEnderecoChange} required />
              <label htmlFor="numero">Número</label>
              <input type="text" name="numero" value={formData.endereco.numero} onChange={handleEnderecoChange} />
              <label htmlFor="bairro">Bairro</label>
              <input type="text" name="bairro" value={formData.endereco.bairro} onChange={handleEnderecoChange} required />
            </fieldset>

            <fieldset>
              <legend>Formas de Pagamento Aceites</legend>
              <div className="checkbox-group">
                {formasPagamento.map(fp => (
                  <label key={fp.id} className="checkbox-label">
                    <input type="checkbox" value={fp.id} onChange={handleFormasPagamentoChange} />
                    {fp.descricao}
                  </label>
                ))}
              </div>
            </fieldset>

            <button type="submit">Finalizar Cadastro</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CadastroRestaurante;