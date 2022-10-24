import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = props => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;

  // Check if the card was liked by the current user
  const isLiked = props.card.likes.some(user => user === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = `card__like-button ${isLiked &&
    'card__like-button_active'}`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeCard() {
    props.onLikeCard(props.card);
  }
  function handleDelete() {
    props.onDeleteClick(props.card);
  }

  return (
    <li className="card">
      {isOwn && (
        <button
          type="button"
          aria-label="delete card"
          className="card__image-trash"
          onClick={handleDelete}
        />
      )}
      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__info-title">{props.card.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="like card"
            onClick={handleLikeCard}
          />
          <span className="card__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};
export default Card;
