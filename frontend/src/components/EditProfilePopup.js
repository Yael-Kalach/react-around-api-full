import React from "react"
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup ({ onUpdateUser, isOpen, onClose }){
  // Current user context
  const currentUser = React.useContext(CurrentUserContext);
  // Inputs
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  //Mounting
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);
  //Handlers
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({
      name: name,
      about: description,
    });
  } 

  return(
    <PopupWithForm name='edit' title='Edit profile' isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} buttonText='Save'>
      <input id="name-input" type="text" name="name" placeholder="Name" value={name || ''} onChange={handleChangeName} className="form__input_type_name form__input" required minLength="2" maxLength="40" />
      <span id="name-input-error" className="form__error"></span>
      <input id="description-input" type="text" name="about" placeholder="About me" value={description || ''} onChange={handleChangeAbout} className="form__input_type_about form__input" required minLength="2" maxLength="200" />
      <span id="description-input-error" className="form__error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup