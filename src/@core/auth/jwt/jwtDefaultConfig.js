export default {
  // Endpoints
  loginEndpoint: '/user/login',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',
  checkTokenEndpoint: '',
  getDevicesOnline2: '/Tracker/GetDevicesOnline2',
  GetDeviceDataForLastTenMinutes: '/Tracker/GetDeviceDataForLastTenMinutes',

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
  storageUserDataKeyName: 'u',
  storageVehicles: 'V',
  vehicleTimes: 'Vt',
  resultTimes: 'VtR'
}
