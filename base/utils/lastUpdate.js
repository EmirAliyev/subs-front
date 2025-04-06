// helpers/date.js
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ru' // Импортируем русский язык

// Подключаем плагин для работы с относительным временем
dayjs.extend(relativeTime)

// Устанавливаем локаль на русский
dayjs.locale('ru')

/**
 * Функция для получения текста "Последнее обновление: X часов/дней назад"
 * @param {string} date - Дата последнего обновления в формате ISO
 * @returns {string} Текст с количеством времени (часы, дни и т.д.)
 */
export const getLastUpdatedText = (date) => {
  if (!date) return 'Неизвестно'

  // Получаем относительное время от текущего момента
  return `Обновлено: ${dayjs(date).fromNow(true)} назад`
}
