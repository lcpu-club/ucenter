import md5 from 'crypto-js/md5'

const gravatarUrl = 'https://www.gravatar.com/avatar/'

export function gravatar(email: string, size = 80) {
  if (!email) return ''
  const hash = md5(email.trim().toLowerCase())
  return `${gravatarUrl}${hash}?s=${size}`
}
