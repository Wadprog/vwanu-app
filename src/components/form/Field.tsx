import React from 'react'
import { useFormikContext } from 'formik'

import Input, { P } from '../Input'
import Error from './Error'
import FieldParams from './fieldParams'

type Props = FieldParams & P

const FormField: React.FC<Props> = ({ name, ...otherProps }) => {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext<any>()
  return (
    <>
      <Input
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
      />
      <Error
        error={typeof errors[name] === 'string' ? errors[name] : undefined}
        visible={typeof touched[name] === 'boolean' ? touched[name] : false}
      />
    </>
  )
}

export default FormField
