import React from 'react';
import { useEffect } from 'react';

const Popup = ({ isOpen, name, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    function handleOverlayClickClose() {
      if (!isOpen) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscClose);

    document.addEventListener('click', handleOverlayClickClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);

      document.removeEventListener('click', handleOverlayClickClose);
    };
  }, [isOpen, onClose]);
  return (
    <div onClick={onClose}>
      <div className={`popup ${isOpen ? 'popup_opened' : ''} `}>
        <div
          className={`popup__container ${name} `}
          onClick={(e) => {
            // do not close modal if anything inside modal content is clicked
            e.stopPropagation();
          }}
        >
          {children}
          <button
            className={`popup__close-button ${`popup__close-button_type_${name}`}`}
            type='button'
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
