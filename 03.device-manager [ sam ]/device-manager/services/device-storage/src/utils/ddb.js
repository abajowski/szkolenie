const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient()

async function batchWriteItem (tableName, items) {
  if (items.length === 0) return

  const putRequests = items.map(item => {
    return {
      PutRequest: {
        Item: item
      }
    }
  })

  const params = {
    RequestItems: {
      [tableName]: putRequests
    }
  }

  try {
    await documentClient.batchWrite(params).promise()
  } catch (err) {
    console.error(`Error when saving a batch of db: ${err}`)
    throw err
  }
}

module.exports = {
  batchWriteItem
}
