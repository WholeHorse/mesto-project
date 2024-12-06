// Подключение модулей и плагинов
const path = require('path'); // Работа с путями
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Генерация HTML
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Очистка папки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Вынос CSS в отдельный файл

module.exports = {
  // Точка входа в приложение
  entry: { main: './src/components/index.js' },

  // Настройки выходного файла сборки
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''
  },

  // Режим работы: development
  mode: 'development',
  devServer: { // Настройки сервера разработки
    static: path.resolve(__dirname, './dist'), // Папка для статических файлов
    compress: true,
    port: 8080,
    open: true
  },

  // Правила обработки файлов
  module: {
    rules: [
      {
        // Для всех JS-файлов
        test: /\.js$/,
        use: 'babel-loader', // Обработка Babel
        exclude: '/node_modules/' // Исключение папки node_modules
      },
      {
        // Для ресурсов (изображений, шрифтов и т.д.)
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        // Для CSS-файлов
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, { // Извлечение CSS в файл
          loader: 'css-loader', // Обработка @import и url()
          options: { importLoaders: 1 } // Предварительная обработка перед css-loader
        },
          'postcss-loader' // Обработка PostCSS
        ]
      }
    ]
  },

  // Подключение плагинов
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // Шаблон HTML-файла
    }),
    new CleanWebpackPlugin(), // Очистка папки dist перед сборкой
    new MiniCssExtractPlugin() // Вынос CSS в отдельные файлы
  ]
}
