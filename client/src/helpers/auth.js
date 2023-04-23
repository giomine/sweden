import { Buffer } from 'buffer'

const tokenName = 'user-token'

export const getToken = () => localStorage.getItem(tokenName)
export const setToken = (token) => localStorage.setItem(tokenName, token)

// decode payload
export const getPayload = () => {
  const token = getToken()
  if (!token) return false
  const splitToken = token.split('.')
  const payloadString = splitToken[1]
  return JSON.parse(Buffer.from(payloadString, 'base64'))
}

// check expiration time
export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const timeNow = Date.now() / 1000
  return (payload.exp > timeNow) ? true : false
}

// remove token from local storage and navigate to /login
export const handleLogout = (navigate) => {
  localStorage.removeItem(tokenName)
  navigate('/login/')
}