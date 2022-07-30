function InfoToolTip( props ) {
    return (
      <div className= {`popup info-popup ${props.isOpen ? 'popup_visible' : ''}`}>
        <div className="popup__overlay" onClick={props.onClose}></div>
        <div className="popup__container">
          <button type="button" aria-label="close" className="popup__close-button" onClick={props.onClose}></button>
          <img className={`info-popup__image ${props.isSuccessful ? 'info-popup__image_success' : 'info-popup__image_error'}`} />
          <p className="info-popup__caption">{props.isSuccessful ? `Success! You have now been registered.` : `Oops, something went wrong! Please try again.`}</p>
        </div>
      </div>
    ) 
  }

export default InfoToolTip