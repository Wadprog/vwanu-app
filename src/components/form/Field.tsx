import React, { useCallback } from 'react'
import { useFormikContext } from 'formik'

import Input, { P } from '../Input'
import Error from './Error'
import FieldParams from './fieldParams'

type Props = FieldParams & P

const FormField: React.FC<Props> = ({ name, ...otherProps }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext<any>()

  // Memoized change handler
  const handleTextChange = useCallback(
    (text: string) => {
      setFieldValue(name, text)
    },
    [setFieldValue, name]
  )

  // Memoized blur handler
  const handleBlur = useCallback(() => {
    setFieldTouched(name)
  }, [setFieldTouched, name])
  return (
    <>
      <Input
        value={values[name]}
        onBlur={handleBlur}
        onChangeText={handleTextChange}
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
