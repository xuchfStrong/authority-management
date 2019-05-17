import Cookies from 'js-cookie'

const TokenKey = 'access-token'
const IsAdminKey = 'isAdmin'
const LoginAcount = 'LoginAcount'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getIsAdmin() {
  return Cookies.get(IsAdminKey)
}

export function setIsAdmin(isAdmin) {
  return Cookies.set(IsAdminKey, isAdmin)
}

export function removeIsAdmin() {
  return Cookies.remove(IsAdminKey)
}

export function getLoginAcount() {
  return Cookies.get(LoginAcount)
}

export function setLoginAcount(loginAcount) {
  return Cookies.set(LoginAcount, loginAcount)
}

export function removeLoginAcount() {
  return Cookies.remove(LoginAcount)
}
