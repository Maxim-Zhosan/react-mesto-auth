import React from 'react';
import '../index.css';

function Card({ name, likes, key, link, onCardClick, cardOwner, currentUser, onCardLike, card, onCardDelete }) {

  function handleClick() {
    onCardClick({ name, link })
  }
  function handleLikeClick() {
    onCardLike(card)
  }
  function handleDeleteClick() {
    onCardDelete(card)
  }

  const isOwn = cardOwner._id === currentUser;
  console.log(card)
  const cardDeleteButtonClassName = (`elements__delete-icon ${isOwn ? "elements__delete-icon_visible" : "elements__delete-icon_hidden"}`);
  const isLiked = likes.some(i => i._id === currentUser);
  const cardLikeButtonClassName = (`elements__heart-icon ${isLiked && "elements__heart-icon_liked"}`); 

  return (
    <article className="elements__item" key={key}>
      <img src={link} alt={name} className="elements__image" onClick={handleClick} />
      <div className="elements__place-name-box">
        <h2 className="elements__place-name">{name}</h2>
        <div className="elements__likes-place">
          <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleLikeClick}></button>
          <p className="elements__likes-number">{likes.length}</p>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить" onClick={handleDeleteClick}></button>
    </article>
  )
}

export default Card;