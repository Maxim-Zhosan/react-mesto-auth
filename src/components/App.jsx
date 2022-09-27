import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import api from '../utils/api';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [selectedCard, setCardPopupOpen] = React.useState({});
  const [regStatus, setRegStatus] = React.useState("");
  const [deletedCard, setDeletedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [headerLink, setHeaderLink] = React.useState({name: "", link: "/"});
  const [cards, loadCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInformation()
      .then(res => {
        setCurrentUser(res);
      });
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

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setDeletedCard(card);
  };

  function handleInfoTooltipActivation() {
    setIsInfoTooltipPopupOpen(true);
  }

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

  function handleHeaderLink(data) {
    setHeaderLink(data)
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

  function handleRegisterUser(data) {
    api.registerNewUser(data)
      .then(res => {
        setRegStatus(res);
      })
      .then(handleInfoTooltipActivation)
      .catch((err) => console.log(err))
  };


  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setCardPopupOpen({});
    setDeletedCard({});
    setRegStatus("");
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cards}>
          <div className="page">
            <Header headerLink={headerLink} />
            <Switch>

              <Route exact path="/sign-up">
                <Register setHeaderLink={handleHeaderLink} onRegisterUser={handleRegisterUser}/>
                <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isSuccess={regStatus} titleSuccess={'Вы успешно зарегистрировались!'} titleError={'Что-то пошло не так! Попробуйте ещё раз.'} />
              </Route>

              <Route path="/sign-in">
                <Login setHeaderLink={handleHeaderLink}/>
              </Route>

              <ProtectedRoute exact path="/" isLoggedIn={isLoggedIn} >
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onDeleteCard={handleDeleteCardClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  setHeaderLink={handleHeaderLink}
                />
                <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete} card={deletedCard}/>
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              </ProtectedRoute>

              <Route path="/">
                <Login setHeaderLink={handleHeaderLink}/>
              </Route>

            </Switch>
          </div>
        </CardsContext.Provider>
      </CurrentUserContext.Provider>
  );
}

export default App;
