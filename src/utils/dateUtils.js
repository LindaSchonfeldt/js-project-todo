/**
 * Format a date to a readable format in English.
 * @param {string|Date} dateInput - The date string or Date object
 * @param {string} [format='en-US'] - The locale format to use
 * @returns {string} Formatted date string
 */
export const formatDate = (dateInput, format = 'en-US') => {
  if (!dateInput) return ''

  const date = dateInput instanceof Date ? dateInput : new Date(dateInput)

  if (isNaN(date.getTime())) {
    return ''
  }

  return date.toLocaleDateString(format, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
