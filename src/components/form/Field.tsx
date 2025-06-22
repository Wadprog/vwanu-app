import React, { useCallback, useMemo, forwardRef } from 'react'
import { useFormikContext } from 'formik'
import { TextInput } from 'react-native'

import Input, { P } from '../Input'
import Error from './Error'
import FieldParams from './fieldParams'

type Props = FieldParams & P

const FormField = forwardRef<TextInput, Props>(
  ({ name, ...otherProps }, ref) => {
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

    // Memoize the input props
    const inputProps = useMemo(
      () => ({
        value: values[name],
        onBlur: handleBlur,
        onChangeText: handleTextChange,
        ...otherProps,
      }),
      [values[name], handleBlur, handleTextChange, otherProps]
    )

    const error = errors[name]
    const visible = touched[name]

    return (
      <>
        <Input {...inputProps} />
        <Error
          error={typeof error === 'string' ? error : undefined}
          visible={typeof visible === 'boolean' ? visible : false}
        />
      </>
    )
  }
)

FormField.displayName = 'FormField'

export default FormField
