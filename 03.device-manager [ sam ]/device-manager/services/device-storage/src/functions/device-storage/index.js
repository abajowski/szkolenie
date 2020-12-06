const ddb = require('./../../utils/ddb')
const device = require('./../../lib/devices')
const _ = require('lodash/fp')

const NUMBER_OF_REQUESTS_IN_BATCH = 25 // MAX 25

module.exports.handler = async (event) => {
  try {
    console.info(`Received event: ${JSON.stringify(event)}`)

    const devices = device.getDevices(event)
    const devicesInChunks = _.chunk(NUMBER_OF_REQUESTS_IN_BATCH, devices)

    const promisedDeviceInDdb = devicesInChunks.map(chunk => ddb.batchWriteItem(process.env.DEVICE_STORAGE_TABLE, chunk))
    const rsp = await Promise.all(promisedDeviceInDdb)

    return rsp
  } catch (err) {
    console.error(`The execution of the service failed`)
    throw err
  }
}
