import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import '../index.css';
import Card from './Card';

function Main(props) {

  const cards = React.useContext(CardsContext)
  const userInfo = React.useContext(CurrentUserContext);

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
          <Card name={card.name} link={card.link} likes={card.likes.length} key={card._id} onCardClick={props.onCardClick}/>
        ))}
      </section>

    </main >
  )
}

export default Main;