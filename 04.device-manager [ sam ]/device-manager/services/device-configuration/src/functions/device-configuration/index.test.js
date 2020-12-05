const sinon = require('sinon').createSandbox()
const test = require('ava').serial
const handler = require('./index').handler
const ddb = require('./../../utils/ddb')
const devices = require('./../../lib/device-configuration')
const _ = require('lodash/fp')

test.beforeEach(t => {
  t.context.batchWriteItemStub = sinon.stub(ddb, 'batchWriteItem').returns('item')
  t.context.getDevicesConfigurationStub = sinon.stub(devices, 'getDevicesConfiguration')
  t.context.chunkStub = sinon.stub(_, 'chunk').returns([1, 2])
})

test.afterEach(() => {
  sinon.restore()
})

test('Handler gets devices from event and maps them to desired format', async t => {
  const event = { xx: 'xx' }
  await handler(event)
  t.true(t.context.getDevicesConfigurationStub.called)
  t.deepEqual(t.context.getDevicesConfigurationStub.args[0][0], event)
})

test('Handler chunks devices into smaller parts ', async t => {
  const event = {}
  await handler(event)
  t.true(t.context.chunkStub.called)
})

test('Handler saves devices to the database', async t => {
  const event = {}
  const rsp = await handler(event)
  t.true(t.context.batchWriteItemStub.calledTwice)
  t.deepEqual(rsp, [ 'item', 'item' ])
})
