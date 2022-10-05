import React from 'react';
import Popup from './Popup';

const PopupWithForm = (props) => {
  return (
    <Popup isOpen={props.isOpen} name={props.name} onClose={props.onClose}>
      <h2 className={`popup__title popup__title_type_${props.name}`}>
        {props.title}
      </h2>
      <form
        action='submit'
        className='form popup__form'
        name={props.name}
        onSubmit={props.onSubmit}
      >
        {props.children}
        <fieldset className='form__fieldset'>
          <button
            className={`form__button form__button_type_${props.name}`}
            type='submit'
          >
            {props.buttonText}
          </button>
        </fieldset>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
