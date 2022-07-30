function ImagePopup({card, isOpen, onClose}) {
  return (
    <div className={`popup image-popup ${isOpen && 'popup_visible'}`}>
    <div className="popup__overlay image-popup__overlay" onClick={onClose}></div>
      <div className="image-popup__container">
        <button type="button" aria-label="close" className="popup__close-button image-popup__close-button" onClick={onClose} />
        <img className="image-popup__image" src={card && card.link} alt={card && card.name} />
        <p className="image-popup__caption">{card && card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup