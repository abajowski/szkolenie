const test = require('ava')
const devices = require('./devices')
const event = require('./fixtures/event.json')

test('getDevices takes event and returns all devices from it', t => {
  const rsp = devices.getDevices(event)
  t.deepEqual(rsp, [ { deviceId: '38a13bc7-24fa-4f22-a64d-53d8583997ae', name: 'name' } ])
})
