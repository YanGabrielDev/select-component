export const removeAccent = (str: string) => {
  const withOutAccent = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  const lowerCase = withOutAccent.toLowerCase()

  return lowerCase
}
