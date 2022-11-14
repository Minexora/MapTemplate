export const system = 'debug'

// api: 'http://116.202.113.209:5322',
const debugConfig = {
  api1: 'http://116.202.113.209:4203',
  api: 'http://localhost:4203',
  self_ip: 'http://116.202.113.209:4203'
}

export function getConfig () {
  if (system === 'debug') {
    return debugConfig
  }
}
