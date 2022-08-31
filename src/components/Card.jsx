import React from 'react';
import '../index.css';

function Card({name, likes, link, onCardClick}) {
    function handleClick() {
        onCardClick({name, link})
    }
    return (
        <article className="elements__item">
        <img src={link} alt={name} className="elements__image" onClick={handleClick}/>
        <div className="elements__place-name-box">
          <h2 className="elements__place-name">{name}</h2>
          <div className="elements__likes-place">
            <button className="elements__heart-icon" type="button" aria-label="Лайк"></button>
            <p className="elements__likes-number">{likes}</p>
          </div>
        </div>
        <button className="elements__delete-icon" type="button" aria-label="Удалить"></button>
      </article>
    )
}

export default Card;