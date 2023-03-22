import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './tooltip';
import * as auth from '../utils/auth';

function App() {
  ////////////////////////////////////////////////////////////
  //////////////// OtherHooks ////////////////////////////////
  ////////////////////////////////////////////////////////////
  const history = useHistory();

  ////////////////////////////////////////////////////////////
  //////////////// Use State Hooks ///////////////////////////
  ////////////////////////////////////////////////////////////
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: '',
    link: '',
  });
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: 'Loading..',
    about: 'Loading..',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [infoTooltipType, setInfoTooltipType] = useState('');
  //state for loggedIn
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('jwt'));

  //state for user data
  const [userData, setUserData] = useState({
    email: '',
  });
  //state for checking token
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  ////////////////////////////////////////////////////////////
  //////////////// UseEffect Hooks ///////////////////////////
  ////////////////////////////////////////////////////////////

  useEffect(() => {
    if (token) {
      api
        .getInitialCards(token)
        .then((res) => {
          setCards(res);
        })
        .catch(console.log);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      api
        .getUserInfo(token)
        .then((user) => {
          setCurrentUser(user);
        })
        .catch(console.log);
    }
  }, [token]);

  //check token
  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res._id) {
            setLoggedIn(true);
            setUserData({ email: res.email });
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
          history.push('/signin');
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    } else {
      setIsCheckingToken(false);
    }
  }, [history]);
  ////////////////////////////////////////////////////////////
  //////////////// Event Handlers ///////////////////////////
  ////////////////////////////////////////////////////////////

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePreviewOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  const handleDeleteClick = (card) => {
    setIsDeletePopupOpen(true);
    setSelectedCard(card);
  };
  const handleCardClick = (card) => {
    setIsImagePreviewOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };
  function handleCardDelete(e) {
    e.preventDefault();
    setIsLoading(true);

    api
      .deleteCard(selectedCard._id, token)
      .then((res) => {
        const newCards = cards.filter(
          (currentCard) => currentCard._id !== selectedCard._id
        );
        setCards(newCards);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdateAvatar(url) {
    setIsLoading(true);
    api
      .setUserAvatar(url, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }
  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .setUserInfo({ name, about }, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };
  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .createCard(card, token)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegister({ email, password }) {
    setIsLoading(true);
    auth
      .register(email, password)
      .then((res) => {
        if (res.data._id) {
          setInfoTooltipType('successful');
          history.push('/signin');
        } else {
          setInfoTooltipType('unsuccessful');
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipType('unsuccessful');
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
        setIsLoading(false);
      });
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          setUserData({ email });
          localStorage.setItem('jwt', res.token);
          setToken(res.token);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipType('unsuccessful');
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsCheckingToken(false);
        setIsLoading(false);
      });
  }

  function handleSignout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setCurrentUser({
      name: '',
      about: '',
    });
    history.push('/signin');
  }
  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user === currentUser._id);
    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._id, isLiked, token)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch(console.log);
  }

  return (
    <div className="body">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          email={userData.email}
          handleSignout={handleSignout}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            isCheckingToken={isCheckingToken}
          >
            <Main
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onDeleteClick={handleDeleteClick}
              onCardLike={handleCardLike}
              cards={cards}
            />
          </ProtectedRoute>
          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login handleLogin={handleLogin} isLoading={isLoading} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          name="avatar"
        />
        <AddPlacePopup
          isLoading={isLoading}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          closeOverlay={closeAllPopups}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <DeletePopup
          isLoading={isLoading}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmitDelete={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePreviewOpen}
          onClose={closeAllPopups}
          name="popup__preview-container"
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          type={infoTooltipType}
          isTooltipOpen={isInfoTooltipOpen}
          name="tooltip"
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
