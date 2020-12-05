import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'

import { withAuthenticator } from 'aws-amplify-react'
Amplify.configure(aws_exports)

function App() {
  return (
    <Header as="h1">
      Hello World!
    </Header>
  )
}

export default withAuthenticator(App, {
  includeGreetings: true,
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
})
