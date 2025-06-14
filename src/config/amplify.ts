import { Amplify } from 'aws-amplify'
import config from '../amplifyconfiguration.json'

Amplify.configure({
  ...config,
  Auth: {
    Cognito: {
      userPoolId: config.aws_user_pools_id,
      userPoolClientId: config.aws_user_pools_web_client_id,
      identityPoolId: config.aws_cognito_identity_pool_id,
      allowGuestAccess: false,
    },
  },
})

export default Amplify
