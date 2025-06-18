import React, { useState } from 'react';

const RatingForm = ({ restauranteId, onAvaliar }) => {
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');

  const handleSend = () => {
    if (nota === 0) {
      alert('Selecione uma nota antes de enviar.');
      return;
    }
    const novaAvaliacao = { restauranteId, nota, comentario, data: new Date() };
    onAvaliar(novaAvaliacao);
    setNota(0);
    setComentario('');
  };

  return (
    <div className="rating-form">
      <div className="estrelas">
        {[1, 2, 3, 4, 5].map(num => (
          <span
            key={num}
            onClick={() => setNota(num)}
            style={{ cursor: 'pointer', color: nota >= num ? '#FFD700' : '#ccc', fontSize: '1.5rem' }}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        placeholder="Deixe aqui seu comentário (opcional)"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />
      <button onClick={handleSend}>Enviar Avaliação</button>
    </div>
  );
};

export default RatingForm;
