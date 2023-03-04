export const system = 'debug'

// api: 'http://116.202.113.209:5322',
const debugConfig = {
  api: 'http://157.90.93.133:4203',
  api1: 'http://localhost:4203',
  self_ip: 'http://157.90.93.133:4203'
}

export function getConfig () {
  if (system === 'debug') {
    return debugConfig
  }
}
