const sinon = require('sinon').createSandbox()
const test = require('ava').serial
const ddb = require('.//ddb')
const AWS = require('aws-sdk')

test.afterEach(() => {
  sinon.restore()
})

test('batchWriteItem', async t => {
  const devices = [{ deviceId: '38a13bc7-24fa-4f22-a64d-53d8583997ae', name: 'name' }]
  const batchWriteStub = sinon.stub(AWS.DynamoDB.DocumentClient.prototype, 'batchWrite').returns({ promise: () => { } })
  const dbRequest = {
    RequestItems: {
      table: [{
        PutRequest: {
          Item: {
            deviceId: '38a13bc7-24fa-4f22-a64d-53d8583997ae',
            name: 'name'
          }
        }
      }]
    }
  }
  await ddb.batchWriteItem('table', devices)
  t.deepEqual(batchWriteStub.args[0][0], dbRequest)
})
