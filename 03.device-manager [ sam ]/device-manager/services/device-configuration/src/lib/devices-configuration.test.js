const test = require('ava')
const devices = require('./device-configuration')
const event = require('./fixtures/event.json')

test('getDevicesConfiguration takes event and returns configurations for devices', t => {
  const rsp = devices.getDevicesConfiguration(event)
  t.deepEqual(rsp, [{
    configuration: {
      endpoint: 'http://',
      license: 'MIT',
      ver: '1.0.0'
    },
    deviceId: '38a13bc7-24fa-4f22-a64d-53d8583997ae'
  }
  ])
})
