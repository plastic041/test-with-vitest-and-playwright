/**
 * Format a date to a string in the format MM-DD
 */
export function formatDate(date: Date): string {
  const month = date.getMonth() + 1
  const day = date.getDate()

  const monthString = month.toString().padStart(2, '0')
  const dayString = day.toString().padStart(2, '0')

  return `${monthString}-${dayString}`
}
