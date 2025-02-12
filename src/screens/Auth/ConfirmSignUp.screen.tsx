import React from 'react'
import { string, object } from 'yup'

import tw from '../../lib/tailwind'
import PageWrapper from '../../components/PageWrapper'
import { Form, Field, Submit } from '../../components/form'
import useAuthContext from 'hooks/useAuthContext'

const ValidationSchema = object().shape({
  confirmationCode: string().required().label('Email'),
})

const ConfirmSignUpScreen: React.FC = () => {
  const { confirmSignup, loading, error } = useAuthContext()

  return (
    <PageWrapper
      title="Personal Information"
      subtitle="Please fill the following"
      pageNumber={0}
      loading={loading}
      error={null}
    >
      <Form
        validationSchema={ValidationSchema}
        initialValues={{
          confirmationCode: '',
        }}
        onSubmit={async (values) => {
          await confirmSignup(values.confirmationCode)
        }}
      >
        <Field
          required
          autoCapitalize="none"
          placeholder="Email"
          name="confirmationCode"
          style={tw`mb-5 rounded-lg`}
        />

        <Submit title="Submit" />
      </Form>
      //{' '}
    </PageWrapper>
  )
}
export default ConfirmSignUpScreen
