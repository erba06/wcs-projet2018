const LOCALSTORAGE_JWT = 'JWT'
const SESSIONSTORAGE_JWT = 'JWT_SESSION'

export default {
  set: function (token) {
    this.remove()
    localStorage.setItem(LOCALSTORAGE_JWT, token)
  },
  get: () =>
    localStorage.getItem(LOCALSTORAGE_JWT) ||
    sessionStorage.getItem(SESSIONSTORAGE_JWT),
  remove: () => {
    localStorage.removeItem(LOCALSTORAGE_JWT)
    sessionStorage.removeItem(SESSIONSTORAGE_JWT)
  },
  setSessionStorage: function (token) {
    this.remove()
    sessionStorage.setItem(SESSIONSTORAGE_JWT, token)
  }
}