const ddb = require('./../../utils/ddb')
const device = require('./../../lib/device-configuration')
const _ = require('lodash/fp')

const NUMBER_OF_REQUESTS_IN_BATCH = 25 // MAX 25

module.exports.handler = async (event) => {
  try {
    console.info(`Received event: ${JSON.stringify(event)}`)

    const devicesConfiguration = device.getDevicesConfiguration(event)
    const devicesConfigurationInChunks = _.chunk(NUMBER_OF_REQUESTS_IN_BATCH, devicesConfiguration)

    const promisedDeviceConfigurationInDdb = devicesConfigurationInChunks.map(chunk => ddb.batchWriteItem(process.env.DEVICE_CONFIGURATION_TABLE, chunk))
    const rsp = await Promise.all(promisedDeviceConfigurationInDdb)

    return rsp
  } catch (err) {
    console.error(`The execution of the service failed`)
    throw err
  }
}
