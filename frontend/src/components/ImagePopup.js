import React from 'react';
import Popup from './Popup';

const ImagePopup = props => {
  return (
    <Popup isOpen={props.isOpen} name={props.name} onClose={props.onClose}>
      <img
        src={props.card.link}
        alt={`A beautiful scene in ${props.card.name}`}
        className="popup__image"
      />
      <p className="popup__caption">{props.card.name}</p>
    </Popup>
  );
};

export default ImagePopup;
