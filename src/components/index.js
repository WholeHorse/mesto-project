// Импорт стилей для Webpack
import '../pages/index.css'

// Импорт модулей
import { createCard, renderCard } from './card.js';
import { closePopup, openPopup } from './modal.js';
import { enableValidation, toggleButtonState } from './validate.js';
import { getCards, getUser, editProfileInfo, addCard, editAvatar } from './api.js';
export { clickLargeImage, renderUserInfo, renderLoading, settings };

// Список всех попапов для обработки закрытия через оверлей
const popupList = document.querySelectorAll('.popup');

// Кнопки закрытия попапов
const btnClosePopupList = document.querySelectorAll('.popup__close-button');

// Кнопки открытия попапов
const btnOpenEditProfile = document.querySelector('.profile__edit-button');
const btnOpenNewCardPopup = document.querySelector('.profile__add-button');
const btnOpenAvatarPopup = document.querySelector('.profile__avatar-button');

// Форма добавления карточки
const formAddCard = document.querySelector('.popup__input-container_type_add'); // выбираем форму добавления карточки

// Инпуты формы добавления карточки
const cardName = document.querySelector('.popup__text-input_type_card-name'); // выбираем инпут для названия карточки
const cardSrc = document.querySelector('.popup__text-input_type_link'); // выбираем инпут для линка картинки

// Поля профиля пользователя
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

// Попап добавления карточки
const popupNewCard = document.querySelector('.popup_type_add_card'); // для класса popup__opened

// Попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.querySelector('.popup__input-container_type_profile');
const nameInput = formEditProfile.querySelector('.popup__text-input_type_name');
const jobInput = formEditProfile.querySelector('.popup__text-input_type_description');

// Поля для изменения аватара
const profileAvatar = document.querySelector('.profile__avatar');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const formEditAvatar = document.querySelector('.popup__input-container_type_avatar'); // форма изменения аватара
const avatarInput = formEditAvatar.querySelector('.popup__text-input_type_avatar'); // инпут аватара

// Попап просмотра изображения
const imagePopupForm = document.querySelector('.popup_type_image');
const popupLabel = imagePopupForm.querySelector('.popup__label');
const largeImage = document.querySelector('.popup__image'); // Большое изображение в попапе

// Настройки валидации
const settings = {
  formSelector: ".popup__input-container",
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__input-error_active'
}

// Инициализация валидации
enableValidation(settings);

// Загрузка начальных данных пользователя и карточек
Promise.all([getCards(), getUser()])
  .then(([cardsInfo, userInfo]) => {
    renderUserInfo(userInfo); // Отображение информации о пользователе
    cardsInfo.reverse().forEach(card => {
      renderCard(createCard(card, userInfo)) // Отображение карточек
    });
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
  })

// Функция отображения состояния загрузки
function renderLoading(evt, text) {
  const btn = evt.target.querySelector('.popup__submit');
  btn.textContent = text;
}

// Функция открытия попапа с изображением
function clickLargeImage(cardSrcValue, cardNameValue) {
  openPopup(imagePopupForm);
  largeImage.src = cardSrcValue;
  largeImage.alt = cardNameValue;
  popupLabel.textContent = cardNameValue;
}

// Функция добавления карточки с изображением
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt, 'Создание...');
  addCard(cardName.value, cardSrc.value)
    .then((card) => {
      renderCard(createCard(card, userData));
    })
    .then(() => {
      closePopup(popupNewCard);
      formAddCard.reset();
      const cardFormInputs = Array.from(evt.srcElement.querySelectorAll('.popup__text-input'));
      toggleButtonState(cardFormInputs, evt.submitter, settings);
    })
    .catch(res => console.log(`Ошибка при добавлении новой карточки: ${res.status}`))
    .finally(() => {
      renderLoading(evt, 'Создать');
    })
}

// Функция сохранения информации о пользователе
function handleFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt, 'Сохранение...');
  editProfileInfo(`${nameInput.value}`, `${jobInput.value}`, evt)
    .then((res) => {
      renderUserInfo(res, evt);
    })
    .then(() => {
      closePopup(popupEditProfile);
      formAddCard.reset();
      evt.submitter.classList.add('popup__submit_inactive');
      evt.submitter.disabled = true;
    })
    .catch((res) => {
      console.log(`Ошибка при обновлении информации о пользователе: ${res.status}`);
    })
    .finally(() => {
      renderLoading(evt, 'Сохранить');
    })
}

let userData

// Функция отрисовки информации о пользователе
function renderUserInfo(userInfo) {
  profileAvatar.src = userInfo.avatar;
  profileName.textContent = userInfo.name;
  profileJob.textContent = userInfo.about;
  userData = userInfo
}

// Функция сохранения аватара
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt, 'Сохранение...');
  editAvatar(avatarInput.value, evt)
    .then((res) => {
      renderUserInfo(res);
      closePopup(popupEditAvatar);
      formEditAvatar.reset();
      evt.submitter.classList.add('popup__submit_inactive');
      evt.submitter.disabled = true;
    })
    .catch(() => console.log('Ошибка при обновлении аватара'))
    .finally(() => {
      renderLoading(evt, 'Сохранить');
    });
}

// Слушатели событий для форм и кнопок
formEditAvatar.addEventListener('submit', handleAvatarSubmit);
formAddCard.addEventListener('submit', handleCardFormSubmit);
formEditProfile.addEventListener('submit', handleFormSubmit);

// Слушатели на попапы
btnOpenAvatarPopup.addEventListener('click', () => openPopup(popupEditAvatar));
btnOpenEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// Открытие попапа новой карточки
btnOpenNewCardPopup.addEventListener('click', () => openPopup(popupNewCard));

// Закрытие попапов по нажатию на крестик
btnClosePopupList.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Закрытие попапов по клику на оверлей
popupList.forEach((item) => {
  item.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
  });
});
