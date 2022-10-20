class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  // getInitialCards() {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     headers: this._headers
  //   }).then(this._checkResponse);
  // }
  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(this._checkResponse);
  }

  // getUserInfo() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     headers: this._headers
  //   }).then(this._checkResponse);
  // }
  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(this._checkResponse);
  }

  // setUserInfo({ name, about }) {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     headers: this._headers,
  //     method: 'PATCH',
  //     body: JSON.stringify({
  //       name: name,
  //       about: about
  //     })
  //   }).then(this._checkResponse);
  // }
  setUserInfo({ name, about }, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._checkResponse);
  }

  // createCard(data) {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     headers: this._headers,
  //     method: 'POST',
  //     body: JSON.stringify(data)
  //   }).then(this._checkResponse);
  // }
  // deleteCard(cardId) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}`, {
  //     headers: this._headers,
  //     method: 'DELETE'
  //   }).then(this._checkResponse);
  // }
  createCard(data, token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(this._checkResponse);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'DELETE'
    }).then(this._checkResponse);
  }

  // changeLikeCardStatus(cardId, isLiked) {
  //   if (!isLiked) {
  //     return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //       headers: this._headers,
  //       method: 'DELETE'
  //     }).then(this._checkResponse);
  //   } else {
  //     return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //       headers: this._headers,
  //       method: 'PUT'
  //     }).then(this._checkResponse);
  //   }
  // }
  changeLikeCardStatus(cardId, isLiked, token) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        method: 'PUT'
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        method: 'DELETE'
      }).then(this._checkResponse);
    }
  }

  // setUserAvatar(url) {
  //   return fetch(`${this._baseUrl}/users/me/avatar`, {
  //     headers: this._headers,
  //     method: 'PATCH',
  //     body: JSON.stringify({
  //       avatar: url
  //     })
  //   }).then(this._checkResponse);
  // }

  setUserAvatar(url, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'PATCH',
      body: JSON.stringify({
        avatar: url
      })
    }).then(this._checkResponse);
  }
}

let node_env = 'production';

// let baseUrl =
//   node_env === 'production' ? 'http://localhost:3001' : 'http://localhost:3001';
let baseUrl = 'http://localhost:3001';

const api = new Api({
  baseUrl
});

export default api;
