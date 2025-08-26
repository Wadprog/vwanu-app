import React from 'react'
import { useFormikContext } from 'formik'
// Custom dependencies
import Error from './Error'
import Select from '../Select'
import tw from 'lib/tailwind'
import FieldParams from './fieldParams'

interface FormSelectProps extends FieldParams {
  items: Array<{ label: string; value: string }>
  whenSelect?: (arg: string) => void
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  items,
  whenSelect,
  ...otherProps
}) => {
  const { setFieldTouched, setFieldValue, errors, touched } =
    useFormikContext<any>()

  return (
    <>
      <Select
        items={items}
        onBlur={() => setFieldTouched(name)}
        onSelect={(value) => {
          whenSelect && whenSelect(value)
          setFieldValue(name, value)
        }}
        {...otherProps}
        style={tw`py-3 rounded`}
      />

      <Error
        error={typeof errors[name] === 'string' ? errors[name] : undefined}
        visible={typeof touched[name] === 'boolean' ? touched[name] : false}
      />
    </>
  )
}

export default FormSelect
