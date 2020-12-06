const AWS = require('aws-sdk')
const joi = require('joi')
const { BadRequestError } = require('../../utils/errors')

const schema = joi.object({
  deviceId: joi.string().guid(),
  name: joi.string()
}).required()

async function sendInformationAboutDevice (event) {
  const SNS = new AWS.SNS()

  const params = {
    TopicArn: process.env.CREATE_DEVICE_TOPIC,
    Message: JSON.stringify(event)
  }
  return SNS.publish(params).promise()
}

module.exports.handler = async (event) => {
  try {
    console.info(`Received event: ${JSON.stringify(event)}`)

    const { error } = joi.validate(event, schema)
    if (error) throw new BadRequestError(error)

    await sendInformationAboutDevice(event)
  } catch (err) {
    console.error(`The execution of the service failed`)
    throw err
  }
}
