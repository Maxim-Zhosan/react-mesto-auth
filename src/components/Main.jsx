import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import '../index.css';
import Card from './Card';
import api from '../utils/api';

function Main(props) {

  const cards = React.useContext(CardsContext)
  const userInfo = React.useContext(CurrentUserContext);
  const setCards = props.setCards;

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === userInfo._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  };

  function handleCardDelete(card) {
    api.deleteCardFromServer(card._id)
      .then(setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err));
  };

  return (

    <main className="content">

      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${userInfo.avatar})` }}></div>
        <div className="profile__profile-info">
          <h1 className="profile__name">{userInfo.name}</h1>
          <p className="profile__description">{userInfo.about}</p>
        </div>
        <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
        <button className="profile__add-button" type="button" aria-label="Добавить карточку" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            name={card.name}
            link={card.link}
            likes={card.likes}
            key={card._id}
            onCardClick={props.onCardClick}
            cardOwner={card.owner}
            currentUser={userInfo._id}
            onCardLike={handleCardLike}
            card={card}
            onCardDelete={handleCardDelete}
          />
        ))}
      </section>

    </main >
  )
}

export default Main;