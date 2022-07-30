import React from "react"
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({onSubmitCard, isOpen, onClose}){
  // States
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')
  
  // Handlers
  function handleAddLink(e) {
    setLink(e.target.value);
  }

  function handleAddTitle(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onSubmitCard({
        name: name,
        link: link,
      });
  } 
  
  // Form reset
  React.useEffect(() => {
    if (isOpen) {
      setName(''); 
      setLink(''); 
    }
  }, [isOpen])

  return(
    <PopupWithForm name='add' title='New place' isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} buttonText='Create'>
      <input id="title-input" type="text" name="name" placeholder="Title" value={name || ''} onChange={handleAddTitle} className="form__input_type_title form__input" required minLength="1" maxLength="30" />
      <span id="title-input-error" className="form__error"></span>
      <input id="image-input" type="url" name="link" placeholder="Image link" value={link || ''} onChange={handleAddLink} className="form__input_type_image form__input" required />
      <span id="image-input-error" className="form__error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup