import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import api from '../utils/api';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setCardPopupOpen] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, loadCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInformation()
      .then(res => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err))
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then(res => {
        console.log(res)
        loadCards(res.map(item => ({
          _id: item._id,
          name: item.name,
          link: item.link,
          likes: item.likes,
          owner: item.owner
        })));
      })
      .catch((err) => console.log(err))
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  };

  function handleCardClick(card) {
    setCardPopupOpen(card);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setCardPopupOpen({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <CardsContext.Provider value={cards}>
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onDeleteCard={handleDeleteCardClick}
        onCardClick={handleCardClick}
        setCards={loadCards}
      />
      <Footer />

      <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText='Изменить'>
        <input type="url" id="popup__input_type_avatar-link" className="popup__input popup__input_type_avatar-link" name="avatar"
          placeholder="Ссылка на новый аватар" required />
        <span id="popup__input_type_avatar-link-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm name="place" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText='Добавить'>
        <input type="text" id="popup__input_type_place" className="popup__input popup__input_type_place" name="name"
          placeholder="Название" required minLength="2" maxLength="30" />
        <span id="popup__input_type_place-error" className="popup__error"></span>
        <input type="url" id="popup__input_type_link" className="popup__input popup__input_type_link" name="link"
          placeholder="Ссылка на картинку" required />
        <span id="popup__input_type_link-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText='Сохранить'>
        <input type="text" id="popup__input_type_name" className="popup__input popup__input_type_name" name="name"
          placeholder="Имя" required minLength="2" maxLength="40" />
        <span id="popup__input_type_name-error" className="popup__error"></span>
        <input type="text" id="popup__input_type_job" className="popup__input popup__input_type_job" name="about"
          placeholder="Призвание" required minLength="2" maxLength="200" />
        <span id="popup__input_type_job-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm name="delete-card" title="Вы уверены?" isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} buttonText=''>
        <button type="button" className="popup__button" aria-label="Подтвердить удаление">Да</button>
        <button className="popup__close-icon" type="button" aria-label="Закрыть"></button>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} >

      </ImagePopup>

    </div>
    </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
