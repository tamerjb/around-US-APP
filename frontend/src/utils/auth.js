// const BASE_URL = 'https://register.nomoreparties.co';
let node_env = 'production';

let BASE_URL =
  node_env === 'production'
    ? 'https://www.aroundtamer.students.nomoredomainssbs.ru'
    : 'http://localhost:3001';

const customFetch = (url, headers) => {
  return fetch(url, headers).then(res =>
    res.ok ? res.json() : Promise.reject(res.statusText)
  );
};

export const register = (email, password) => {
  return customFetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
};
export const login = (email, password) => {
  return customFetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
};
export const checkToken = token => {
  return customFetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  });
};
