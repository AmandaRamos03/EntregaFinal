import React from 'react';

const RatingList = ({ avaliacoes }) => {
  const media = avaliacoes.length > 0
    ? (avaliacoes.reduce((soma, item) => soma + item.nota, 0) / avaliacoes.length).toFixed(1)
    : 0;
    
  return (
    <div className="rating-list">
      <h3>Avaliações</h3>
      <p>Média: {media} / 5</p>
      <ul>
        {avaliacoes.map((av, index) => (
          <li key={index}>
            <div>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: i < av.nota ? '#FFD700' : '#ccc' }}>★</span>
              ))}
            </div>
            {av.comentario && <p>{av.comentario}</p>}
            <small>{new Date(av.data).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatingList;
