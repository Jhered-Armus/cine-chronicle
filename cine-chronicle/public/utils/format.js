const formatUsername = (username) => {
  if (!username) return ''
  const capitalized = username.charAt(0).toUpperCase() + username.slice(1)
  return capitalized.length > 10 ? capitalized.slice(0, 10) : capitalized
}

export { formatUsername }

export const key = '196ff2bd'
