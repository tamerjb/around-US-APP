import React from 'react';
import Popup from './Popup';

const ImagePopup = (props) => {
  return (
    <Popup isOpen={props.isOpen} name={props.name} onClose={props.onClose}>
      <p className='popup__caption'>{props.card.name}</p>

      <img
        src={props.card.link}
        alt={`A beautiful scene in ${props.card.name}`}
        className='popup__image'
      />
    </Popup>
  );
};

export default ImagePopup;
