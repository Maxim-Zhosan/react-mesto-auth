import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
  }

  return (
    <div className="page">
    <Header />
    <Main 
    onEditProfile={handleEditProfileClick} 
    onAddPlace={handleAddPlaceClick} 
    onEditAvatar={handleEditAvatarClick} 
    onDeleteCard={handleDeleteCardClick}
    />
    <Footer />

    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input type="url" id="popup__input_type_avatar-link" className="popup__input popup__input_type_avatar-link" name="avatar"
          placeholder="Ссылка на новый аватар" required />
        <span id="popup__input_type_avatar-link-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm name="place" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input type="text" id="popup__input_type_place" className="popup__input popup__input_type_place" name="name"
          placeholder="Название" required minLength="2" maxLength="30" />
        <span id="popup__input_type_place-error" className="popup__error"></span>
        <input type="url" id="popup__input_type_link" className="popup__input popup__input_type_link" name="link"
          placeholder="Ссылка на картинку" required />
        <span id="popup__input_type_link-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input type="text" id="popup__input_type_name" className="popup__input popup__input_type_name" name="name"
          placeholder="Имя" required minLength="2" maxLength="40" />
        <span id="popup__input_type_name-error" className="popup__error"></span>
        <input type="text" id="popup__input_type_job" className="popup__input popup__input_type_job" name="about"
          placeholder="Призвание" required minLength="2" maxLength="200" />
        <span id="popup__input_type_job-error" className="popup__error"></span>
      </PopupWithForm>

      <PopupWithForm name="delete-card" title="Вы уверены?" isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups}>
        <button type="button" className="popup__button" aria-label="Подтвердить удаление">Да</button>
        <button className="popup__close-icon" type="button" aria-label="Закрыть"></button>
      </PopupWithForm>

  </div>
  );
}

export default App;
