import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = ({
  onCardLike,
  cards,
  onEditProfileClick,
  onEditAvatarClick,
  onAddPlaceClick,
  onCardClick,
  onDeleteClick
}) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div onClick={onEditAvatarClick} className="profile__image-container">
          <img
            src={currentUser.avatar}
            alt="Profile"
            className="profile__image"
          />
        </div>
        <div className="profile__info">
          <div className="profile__person">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfileClick}
              className="profile__edit-button"
              type="button"
            />
          </div>
          <p className="profile__title">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlaceClick}
          className="profile__add-button"
          type="button"
        />
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map(card => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onDeleteClick={onDeleteClick}
                onLikeCard={onCardLike}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Main;
