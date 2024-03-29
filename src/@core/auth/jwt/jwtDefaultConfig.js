export default {
  // Endpoints
  loginEndpoint: '/user/login',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',
  checkTokenEndpoint: '',
  getDevicesOnline2: '/Tracker/GetDevicesOnline2',
  getVehicleDistanceReport: 'Tracker/GetDiffDistsExp2',
  GetDeviceDataForLastTenMinutes: '/Tracker/GetDeviceDataForLastTenMinutes',
  getDeviceData: '/Tracker/GetDeviceData',
  getRegionList: '/Tracker/GetRegionList',
  getDeviceRegionData: '/Tracker/GetDeviceRegionData',
  getRegionDevicesData: '/Tracker/GetRegionDevicesData',

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
