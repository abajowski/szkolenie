const sinon = require('sinon').createSandbox()
const test = require('ava').serial
const handler = require('./post').handler
const AWS = require('aws-sdk')
const { BadRequestError } = require('../../utils/errors')

test.beforeEach(t => {
})

test.afterEach(() => {
  sinon.restore()
})

test('Handler validate event and throws an error if payload does not match the schema', async t => {
  const event = [{ xx: 'xx' }]
  await t.throwsAsync(handler.bind(handler, event), { instanceOf: BadRequestError })
})

test.only('Handler validate event and sends it to the sns topic', async t => {
  const event = {
    deviceId: '066546df-3a45-4620-9d29-2332083449f1',
    name: 'xxx'
  }

  process.env.CREATE_DEVICE_TOPIC = 'xxx'

  const publishStub = sinon.stub().returns({
    promise: () => {}
  })

  sinon.stub(AWS, 'SNS').returns({ publish: publishStub })

  await handler(event)

  t.deepEqual(publishStub.args[0][0], {
    Message: '{"deviceId":"066546df-3a45-4620-9d29-2332083449f1","name":"xxx"}',
    TopicArn: 'xxx'
  })
})
