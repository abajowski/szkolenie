const test = require('ava').serial
const handler = require('./index').handler

test.beforeEach(t => {
})

test.afterEach(() => {
})

test('Placeholder for test', async t => {
  await handler({})
  t.pass()
})
