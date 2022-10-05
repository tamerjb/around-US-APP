import React, { useEffect } from 'react';
import successfulIcon from '../images/icons/successful_icon.svg';
import unsuccessfulIcon from '../images/icons/unsuccessful_icon.svg';

import Popup from './Popup';

const InfoTooltip = ({ isOpen, onClose, type }) => {
  const success = type === 'successful';

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Popup isOpen={isOpen} name='tooltip' onClose={onClose}>
      <img
        src={success ? successfulIcon : unsuccessfulIcon}
        className='tooltip__image'
        alt={`${success ? 'successful' : 'unsuccessful'} attempt`}
      />
      <h2 className='tooltip__text'>
        {success
          ? 'Success! You have now been registered.'
          : 'Oops, something went wrong! Please try again.'}
      </h2>
    </Popup>
  );
};

export default InfoTooltip;
