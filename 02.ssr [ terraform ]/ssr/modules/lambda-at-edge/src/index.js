exports.handler = async (event, context) => {
  const request = event.Records[0].cf.request
  request.headers['x-api-key'] = [{ key: 'x-api-key', value: 'key' }]
  return request
}
