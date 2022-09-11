import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
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
        console.log(res);
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

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then(res => {
        setCurrentUser(res);
      })
      .then(closeAllPopups())
      .catch((err) => console.log(err))
  };

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then(res => {
        setCurrentUser(res);
      })
      .then(closeAllPopups())
      .catch((err) => console.log(err))
  };

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then(newCard => {
        loadCards([newCard, ...cards]);
      })
      .then(closeAllPopups())
      .catch((err) => console.log(err))
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        loadCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  };

  function handleCardDelete(card) {
    api.deleteCardFromServer(card._id)
      .then(loadCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err));
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
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

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
