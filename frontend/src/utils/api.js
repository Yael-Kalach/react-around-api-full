class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl
      this._headers = headers
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.status}`);
    }
  
    getInitialCards() {
      return fetch (`${this._baseUrl}/cards`, {
        headers: this._headers
      })
        .then(this._checkResponse)
    }
  
    getUserInformation() {
      return fetch (`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
        .then(this._checkResponse)
    }
  
    editUserInformation(data){
      return fetch (`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data)
      })
        .then(this._checkResponse)
    }
  
    editUserAvatar(data){
      return fetch (`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data)
      })
        .then(this._checkResponse)
    }
  
    createCard(data){
      return fetch (`${this._baseUrl}/cards`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify(data)
      })
        .then(this._checkResponse)
    }
  
    deleteCard(cardId){
      return fetch (`${this._baseUrl}/cards/${cardId}`, {
        headers: this._headers,
        method: 'DELETE',
      })
        .then(this._checkResponse)
    }
  
    likeCard(cardId){
      return fetch (`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: 'PUT',
      })
        .then(this._checkResponse)
    }
  
    unlikeCard(cardId){
      return fetch (`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: 'DELETE',
      })
        .then(this._checkResponse)
    }

    changeLikeCardStatus(cardId, isNotLiked) {
      if (isNotLiked) {
        return this.likeCard(cardId);
      } else {
        return this.unlikeCard(cardId);
      }
    }
  }
  
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "cf053b19-b17e-4293-83f1-18e0a87c8336",
    "Content-Type": "application/json"
  }
});

export default api