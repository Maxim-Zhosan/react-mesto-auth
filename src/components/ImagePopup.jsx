import React from 'react';
import '../index.css';

function ImagePopup() {
    return (
        <div className="popup popup_type_zoom">
        <div className="popup__zoom">
          <figure className="popup__picture">
            <img src="/" alt="" className="popup__image" />
            <figcaption className="popup__caption"></figcaption>
          </figure>
          <button className="popup__close-icon" type="button" aria-label="Закрыть"></button>
        </div>
      </div>
    );
}

export default ImagePopup;