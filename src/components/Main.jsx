import React from 'react';
import '../index.css';
import api from '../utils/api';
import Card from './Card';

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, loadCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInformation()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => console.log(err))
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then(res => {
        loadCards(res.map(item => ({
          _id: item._id,
          name: item.name,
          link: item.link,
          likes: item.likes
        })));
      })
      .catch((err) => console.log(err))
  }, [])


  return (

    <main className="content">

      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }}></div>
        <div className="profile__profile-info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__description">{userDescription}</p>
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