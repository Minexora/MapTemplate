import useJwt from '@/auth/jwt/useJwt'
import { permGroups, Groups } from '@/auth/permissions'

export const isUserLoggedIn = () => {
  return localStorage.getItem('userData') || localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
}

export const getUserData = () => JSON.parse(localStorage.getItem('u'))

export const checkPerm = (perms) => {
  try {
    const userData = getUserData()
    const userGroup = Groups[userData.data.userType]
    return permGroups[userGroup].includes(perms)
  } catch (err) {
    // console.log('Error Perms: ', err)
    return false
  }
}
