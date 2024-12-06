import { clickLargeImage } from "./index.js";
import { deleteCard, likeCard, deleteLikeCard } from './api.js';
export { createCard, clickLikeCard, renderCard, updateLikeCounter };

// Контейнер для карточек
const cardsContainer = document.querySelector('.cards-grid');

// Шаблон карточки
const userTemplate = document.querySelector('#card-template').content;

/**
 * Создает карточку из переданной информации.
 * @param {Object} cardsInfo - Информация о карточке.
 * @param {Object} userInfo - Информация о текущем пользователе.
 * @returns {HTMLElement} - DOM-элемент карточки.
 */
function createCard(cardsInfo, userInfo) {
  // Клонируем шаблон карточки
  const cardElement = userTemplate.querySelector('.place').cloneNode(true);
  const cardElementPhoto = cardElement.querySelector('.place__photo');
  const btnLike = cardElement.querySelector('.place__like-button');
  const counterLikes = cardElement.querySelector('.place__like-counter');

  // Настройка кнопки удаления, доступной только для своих карточек
  if (userInfo._id === cardsInfo.owner._id) {
    cardElement.querySelector('.place__delete-button').addEventListener('click', (event) => {
      clickDeleteCard(event, cardsInfo._id);
    });
  } else {
    cardElement.querySelector('.place__delete-button').remove();
  }

  // Заполнение данных карточки
  counterLikes.textContent = cardsInfo.likes.length;
  cardElement.querySelector('.place__name').textContent = cardsInfo.name;
  cardElementPhoto.src = cardsInfo.link;
  cardElementPhoto.alt = cardsInfo.name;

  // Слушатель для увеличения изображения
  cardElementPhoto.addEventListener('click', () => {
    clickLargeImage(cardsInfo.link, cardsInfo.name);
  });

  // Слушатель для кнопки лайка
  btnLike.addEventListener('click', (event) => {
    clickLikeCard(event, cardsInfo._id, counterLikes);
  });

  // Установка активного состояния лайка, если текущий пользователь уже лайкал
  if (cardsInfo.likes.some((like) => like._id === userInfo._id)) {
    btnLike.classList.add('place__like-button_active');
  }

  return cardElement;
}

/**
 * Отображает карточку в DOM, добавляя её в начало контейнера.
 * @param {HTMLElement} card - DOM-элемент карточки.
 */
function renderCard(card) {
  cardsContainer.prepend(card);
}

/**
 * Обработчик удаления карточки.
 * @param {Event} event - Событие клика.
 * @param {string} cardId - ID карточки для удаления.
 */
function clickDeleteCard(event, cardId) {
  deleteCard(cardId)
      .then(() => {
        event.target.closest('.place').remove();
      })
      .catch((err) => console.error(`Ошибка при удалении карточки: ${err}`));
}

/**
 * Обработчик кнопки лайка.
 * @param {Event} event - Событие клика.
 * @param {string} cardId - ID карточки для лайка.
 * @param {HTMLElement} counterLikes - Элемент для отображения количества лайков.
 */
function clickLikeCard(event, cardId, counterLikes) {
  const btnLike = event.target;
  const likePromise = btnLike.classList.contains('place__like-button_active')
      ? deleteLikeCard(cardId)
      : likeCard(cardId);

  likePromise
      .then((res) => {
        updateLikeCounter(res, counterLikes);
        btnLike.classList.toggle('place__like-button_active');
      })
      .catch((err) => console.error(`Ошибка при обработке лайка: ${err}`));
}

/**
 * Обновляет количество лайков на карточке.
 * @param {Object} res - Ответ сервера.
 * @param {HTMLElement} counterLikes - Элемент для отображения количества лайков.
 */
function updateLikeCounter(res, counterLikes) {
  counterLikes.textContent = res.likes.length;
}
