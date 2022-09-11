import '../index.css';
import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = React.useState('');
    const [link, setDescription] = React.useState('');
    React.useEffect(() => {
        setName('');
        setDescription('');
    }, []);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace ({
            name: name,
            link: link
        });
    }

    return (
        <PopupWithForm name="place" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText='Добавить'>
            <input type="text" id="popup__input_type_place" className="popup__input popup__input_type_place" name="name"
                placeholder="Название" required minLength="2" maxLength="30" onChange={handleChangeName} />
            <span id="popup__input_type_place-error" className="popup__error"></span>
            <input type="url" id="popup__input_type_link" className="popup__input popup__input_type_link" name="link"
                placeholder="Ссылка на картинку" required onChange={handleChangeLink} />
            <span id="popup__input_type_link-error" className="popup__error"></span>
        </PopupWithForm>
    )
}


export default AddPlacePopup;