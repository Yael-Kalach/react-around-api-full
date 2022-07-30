import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(user => user._id === currentUser._id);

  const cardLikeButtonClassName = (
    `elements__button elements__button_like ${isLiked ? 'elements__button_like_active' : ''}`
  ); 
  const cardDeleteButtonClassName = (
    `elements__button elements__button_trash ${isOwn ? 'elements__button_trash_visible' : 'elements__button_trash_hidden'}`
  ); 
  
  const handleClick = () => {
    onCardClick(card);
  }  

  const handleLikeClick = () => {
    onCardLike(card)
  }

  const handleDeleteClick = () => {
    onCardDelete(card)
  }
    return(
      <article className="elements__card">
        <button type="button" aria-label="trash" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        <img className="elements__image" src={card.link} alt={card.name} onClick={handleClick} />
        <div className="elements__title">
          <h2 className="elements__text">{card.name}</h2>
          <div className="elements__container">
            <button type="button" aria-label="like" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <span className="elements__counter">{card.likes.length}</span>
          </div>
        </div>
      </article>
    )
  }
export default Card