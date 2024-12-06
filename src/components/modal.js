export { openPopup, closePopup };

/**
 * Закрытие попапа при нажатии на клавишу Escape.
 * @param {KeyboardEvent} evt - Объект события клавиатуры.
 */
function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened'); // Находим текущий открытый попап
    closePopup(currentPopup);
  }
}

/**
 * Закрытие попапа.
 * Убирает класс открытого попапа и удаляет обработчик события нажатия клавиши Escape.
 * @param {HTMLElement} popupElement - Элемент попапа, который нужно закрыть.
 */
function closePopup(popupElement) {
  if (!popupElement) return; // Проверяем, передан ли элемент
  popupElement.classList.remove('popup_opened'); // Убираем класс, открывающий попап
  document.removeEventListener('keydown', closeOnEsc); // Удаляем слушатель закрытия по ESC
}

/**
 * Открытие попапа.
 * Добавляет класс для отображения попапа и навешивает обработчик закрытия по клавише Escape.
 * @param {HTMLElement} popupElement - Элемент попапа, который нужно открыть.
 */
function openPopup(popupElement) {
  if (!popupElement) return; // Проверяем, передан ли элемент
  popupElement.classList.add('popup_opened'); // Добавляем класс, открывающий попап
  document.addEventListener('keydown', closeOnEsc); // Добавляем слушатель закрытия по ESC
}
