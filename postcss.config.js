// postcss.config.js

// Подключение необходимых плагинов
const autoprefixer = require('autoprefixer'); // Добавляет кроссбраузерные префиксы
const cssnano = require('cssnano'); // Минифицирует CSS

module.exports = {
  plugins: [
    autoprefixer, // Автоматическое добавление префиксов
    cssnano({ preset: 'default' }) // Минификация с использованием стандартных настроек
  ]
};
