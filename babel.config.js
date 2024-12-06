const presets = [
  ['@babel/preset-env', {
    // Настройка целей (браузеры и платформы)
    targets: {
      edge: '17',
      ie: '11',
      firefox: '50',
      chrome: '64',
      safari: '11.1'
    },

    // Метод добавления полифиллов для указанных целей
    // "entry" требует явного импорта core-js и regenerator-runtime
    useBuiltIns: "entry"
  }]
];

// Экспорт конфигурации для использования Babel
module.exports = { presets };
