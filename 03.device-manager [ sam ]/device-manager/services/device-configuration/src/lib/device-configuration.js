
function prepareConfiguration (msg) {
  const data = JSON.parse(msg.body)
  const device = JSON.parse(data.Message)

  return {
    deviceId: device.deviceId,
    configuration: {
      ver: '1.0.0',
      license: 'MIT',
      endpoint: 'http://'
    }
  }
}

function getDevicesConfiguration (records) {
  if (records.Records) records = records.Records

  return records.map(prepareConfiguration)
}

module.exports = {
  getDevicesConfiguration
}
