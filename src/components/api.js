export { addCard, deleteCard, likeCard, deleteLikeCard, editAvatar, getUser, editProfileInfo, getCards }

// Конфигурация API
const config = {
  baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
  headers: {
    authorization: '66609c41-4c09-4cb2-96c3-972ab97a1142',
    'Content-Type': 'application/json'
  }
};

// Обработка ответа от сервера
const getResponseData = (res) => {
  if (!res.ok) {
    console.error(`Ошибка: ${res.status} - ${res.statusText}`);
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// === API функции ===

// Получение данных о текущем пользователе
function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }).then(getResponseData);
}

// Обновление информации о пользователе
function editProfileInfo(userName, userJob,) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userJob
    })
  }).then(getResponseData);
}

// Обновление аватара пользователя
function editAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  }).then(getResponseData);
}

// Получение списка карточек
function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(getResponseData);
}

// Добавление новой карточки
function addCard(cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  }).then(getResponseData);
}

// Удаление карточки
function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  }).then(getResponseData);
}

// Поставить лайк карточке
function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  }).then(getResponseData);
}

// Удалить лайк с карточки
function deleteLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(getResponseData);
}
