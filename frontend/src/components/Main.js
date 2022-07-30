import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <div className="profile__picture" style={{ backgroundImage: `url(${currentUser.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center'}} alt={`${currentUser.name}'s avatar`} />
          <button type="button" aria-label="avatar" className="profile__button profile__button_type_avatar" onClick={props.onEditAvatarClick}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" aria-label="edit" className="profile__button profile__button_type_edit" onClick={props.onEditProfileClick}></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button type="button" aria-label="add" className="profile__button profile__button_type_add" onClick={props.onAddPlaceClick}></button>
      </section>
      <section className="elements">
        {props.cards}
      </section>
    </main>
  )
}
export default Main;