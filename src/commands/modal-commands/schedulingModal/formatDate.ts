export function formatDate(date: string) {
  const [month, day, year] = date.split('/').map((string) => Number(string))
  return new Date(2000 + year, month - 1, day)
}
