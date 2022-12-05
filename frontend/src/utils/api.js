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

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    }).then(this._checkResponse);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    }).then(this._checkResponse);
  }

  setUserInfo({ name, about }, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._checkResponse);
  }

  createCard(data, token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(this._checkResponse);
  }

  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      method: 'DELETE'
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked, token) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        method: 'PUT'
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        method: 'DELETE'
      }).then(this._checkResponse);
    }
  }

  setUserAvatar(url, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      method: 'PATCH',
      body: JSON.stringify({
        avatar: url
      })
    }).then(this._checkResponse);
  }
}

let node_env = 'production';

let baseUrl =
  node_env === 'production'
    ? 'https://api.aroundus.tamir.students.nomoredomainssbs.ru'
    : 'http://localhost:3000';
const api = new Api({
  baseUrl
});

export default api;
