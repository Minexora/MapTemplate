import jwtDefaultConfig from '@/@core/auth/jwt/jwtDefaultConfig'
import { getConfig } from '../../../../parameters'
const paramConfig = getConfig()

export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns = null

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // For Refreshing Token
  subscribers = []

  constructor (axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      config => {
        // Get token from localStorage
        const accessToken = this.getToken()

        config.baseURL = paramConfig.api

        // If token is present add it to request's Authorization Header
        if (accessToken) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // Add request/response interceptor
    this.axiosIns.interceptors.response.use(
      response => response,
      error => {
        const { config, response } = error
        const originalRequest = config

        if (response && response.status === 401) {
          const token = this.getRefreshToken()
          if (!this.isAlreadyFetchingAccessToken && token) {
            this.isAlreadyFetchingAccessToken = true
            this.refreshToken(token).then(r => {
              this.isAlreadyFetchingAccessToken = false
              // Update accessToken in localStorage
              this.setToken(r.data.token)
              this.setRefreshToken(r.data.refreshToken)

              this.onAccessTokenFetched(r.data.token)
            })
          }
          const retryOriginalRequest = new Promise(resolve => {
            this.addSubscriber(accessToken => {
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(this.axiosIns(originalRequest))
            })
          })
          return retryOriginalRequest
        }
        return Promise.reject(error)
      }
    )
  }

  onAccessTokenFetched (accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber (callback) {
    this.subscribers.push(callback)
  }

  getToken () {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken () {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  getUserData () {
    return JSON.parse(localStorage.getItem(this.jwtConfig.storageUserDataKeyName))
  }

  setToken (value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken (value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  setUserData (value) {
    localStorage.setItem(this.jwtConfig.storageUserDataKeyName, value)
  }

  login (...args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args)
  }

  post (url, payload) {
    return this.axiosIns.post(url, payload)
  }

  get (url, payload) {
    return this.axiosIns.get(url, payload)
  }

  delete (url) {
    return this.axiosIns.delete(url)
  }

  update (url, payload) {
    return this.axiosIns.update(url, payload)
  }

  refreshToken (token) {
    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: token
    })
  }
}
