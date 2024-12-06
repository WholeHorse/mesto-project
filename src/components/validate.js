export { enableValidation, toggleButtonState };

/**
 * Проверяет валидность конкретного поля ввода.
 * @param {HTMLFormElement} formElement - Форма, содержащая поле.
 * @param {HTMLInputElement} inputElement - Поле ввода для проверки.
 * @param {Object} settings - Настройки, переданные для валидации.
 */
function isValid(formElement, inputElement, settings) {
  // Если поле не соответствует шаблону, устанавливаем кастомное сообщение
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  // Отображаем или скрываем ошибку в зависимости от валидности поля
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

/**
 * Отображает сообщение об ошибке для поля.
 * @param {HTMLFormElement} formElement - Форма, содержащая поле.
 * @param {HTMLInputElement} inputElement - Поле ввода с ошибкой.
 * @param {string} errorMessage - Текст сообщения об ошибке.
 * @param {Object} settings - Настройки, переданные для валидации.
 */
function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Элемент с текстом ошибки
  inputElement.classList.add(settings.inputErrorClass); // Добавляем класс ошибки для инпута
  errorElement.classList.add(settings.errorClass); // Показываем текст ошибки
  errorElement.textContent = errorMessage; // Устанавливаем текст ошибки
}

/**
 * Скрывает сообщение об ошибке для поля.
 * @param {HTMLFormElement} formElement - Форма, содержащая поле.
 * @param {HTMLInputElement} inputElement - Поле ввода, для которого убирается ошибка.
 * @param {Object} settings - Настройки, переданные для валидации.
 */
function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass); // Убираем класс ошибки с инпута
  errorElement.classList.remove(settings.errorClass); // Скрываем текст ошибки
  errorElement.textContent = ''; // Очищаем текст ошибки
}

/**
 * Проверяет, есть ли в форме невалидные поля.
 * @param {Array<HTMLInputElement>} inputList - Список всех полей формы.
 * @returns {boolean} - Возвращает true, если хотя бы одно поле невалидно.
 */
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

/**
 * Управляет состоянием кнопки отправки формы.
 * @param {Array<HTMLInputElement>} inputList - Список всех полей формы.
 * @param {HTMLButtonElement} buttonElement - Кнопка отправки формы.
 * @param {Object} settings - Настройки, переданные для валидации.
 */
function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass); // Блокируем кнопку
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass); // Активируем кнопку
    buttonElement.disabled = false;
  }
}

/**
 * Включает валидацию для всех форм на странице.
 * @param {Object} settings - Настройки, переданные для валидации.
 */
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector)); // Получаем все формы
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings); // Добавляем обработчики для каждой формы
  });
};

/**
 * Устанавливает обработчики событий на все поля формы.
 * @param {HTMLFormElement} formElement - Форма, для которой добавляются обработчики.
 * @param {Object} settings - Настройки, переданные для валидации.
 */
function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector)); // Список полей формы
  const buttonElement = formElement.querySelector(settings.submitButtonSelector); // Кнопка отправки формы

  toggleButtonState(inputList, buttonElement, settings); // Проверяем состояние кнопки при загрузке

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, settings); // Проверяем валидность поля
      toggleButtonState(inputList, buttonElement, settings); // Переключаем состояние кнопки
    });
  });
}
