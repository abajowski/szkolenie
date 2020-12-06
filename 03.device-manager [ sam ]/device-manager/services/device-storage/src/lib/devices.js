
function prepareDevice (msg) {
  const data = JSON.parse(msg.body)
  const device = JSON.parse(data.Message)

  return device
}

function getDevices (records) {
  if (records.Records) records = records.Records

  return records.map(prepareDevice)
}

module.exports = {
  getDevices
}
