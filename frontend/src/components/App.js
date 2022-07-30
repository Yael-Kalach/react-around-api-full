import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { register, signIn, checkToken } from '../utils/auth.js';
import InfoToolTip from './InfoTooltip'

function App() {
  // navigation
  const navigate = useNavigate();
  // user and registration states
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(false)
  // card states
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([])
  // popup states
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = React.useState(false)
  const [isToolTipOpen, setIsToolTipOpen] = React.useState(false)

  // registration related handlers
  function handleRegistration(password, email) {
    register(password, email)
      .then((res) => {
        console.log(res)
        setIsRegistrationSuccessful(true)
        navigate('/signin')
      })
      .catch((err) => {
        setIsRegistrationSuccessful(false);
        if (err.status === 400) {
          console.log('400 - one of the fields was filled incorrectly');
        } 
        if (err.status === 401) {
          console.log("401 - the user with the specified email not found");
        }
        else {
          console.log(`Something is not working... Error: ${err}`);
        }
      })
      .finally(() => setIsToolTipOpen(!isToolTipOpen))
  }

  function handleLogin(password, email) {
    signIn(password, email)
      .then((response) => {
          localStorage.setItem("jwt", response.token);
          setCurrentUser({ ...currentUser, data: { email: email } });
          setIsLoggedIn(true);
          navigate('/');
          console.log(response);
          console.log(`Logged in successfully: ${currentUser}`);
      })
      .catch((err) => {
        setIsRegistrationSuccessful(false);
        setIsToolTipOpen(!isToolTipOpen)
        if (err.status === 400) {
          console.log('400 - one of the fields was filled incorrectly');
          } else {
            console.log(`Something is not working... Error: ${err}`);
          }
      })
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("jwt");
    console.log(`Logged out successfully: ${localStorage}`);
  }
  // Token mounting
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
      jwt &&
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
            console.log(res)
          }
          console.log(res)
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);
  // user info mounting
  React.useEffect(() => {
    isLoggedIn &&
    api.getUserInformation()
      .then((userData) => {
        setCurrentUser({ ...currentUser, ...userData})
      })
      .catch(console.log)
  }, [isLoggedIn])
  // initial cards mounting
  React.useEffect(() => {
    isLoggedIn &&
    api.getInitialCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((error) => console.log(error));
  }, [isLoggedIn]);
  // card related functions
  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => 
          currentCard._id === card._id ? newCard : currentCard));
      })
      .catch(console.log)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(cardEl => cardEl._id !== card._id)
        setCards(newCards);
      })
      .catch(console.log)
  }

  function handleAddPlaceSubmit(data){
    api.createCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
    })
    .then(closeAllPopups)
    .catch((error) => console.log(error));
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }
  
  // popup handlers
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleDeletePlaceClick() {
    setIsDeletePlacePopupOpen(!isDeletePlacePopupOpen)
  }

  function closeAllPopups(){
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsToolTipOpen(false)
    setSelectedCard(null);
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  // user update handlers
  function handleUpdateUser(data) {
    api.editUserInformation(data)
      .then((res) => {
        setCurrentUser({ ...currentUser, ...res })
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api.editUserAvatar(data)
      .then((res) => {
        setCurrentUser({ ...currentUser, ...res })
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLoggedIn={isLoggedIn} currentUser={currentUser} logout={handleLogout} />
        <main className="content">
          <Routes>
            <Route loggedIn={isLoggedIn} path='/' 
              element = {<ProtectedRoute loggedIn={isLoggedIn} component={Main} >
                <Main 
                  onDeletePlaceClick={handleDeletePlaceClick} 
                  onEditAvatarClick={handleEditAvatarClick} 
                  onEditProfileClick={handleEditProfileClick} 
                  onAddPlaceClick={handleAddPlaceClick} 
                  cards={cards.map((card) => (<Card 
                    key={card._id}
                    card={card}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />))} 
                />
              </ProtectedRoute>} >
            </Route>
            <Route path='/signup' element={<Register handleRegister={handleRegistration} />} />
            <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
            <Route exact path='/' element={isLoggedIn ? <Navigate to="/main" /> : <Navigate to="/signin" />} />
          </Routes>

          <InfoToolTip isSuccessful={isRegistrationSuccessful} isOpen={isToolTipOpen} onClose={closeAllPopups} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmitCard={handleAddPlaceSubmit} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <PopupWithForm name='delete-card' title='Are you sure?' isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} buttonText='Yes' onSubmit={handleCardDelete} />

          <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} card={selectedCard} />
          
        </main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
