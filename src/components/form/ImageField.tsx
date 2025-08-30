import React from 'react'
import { useFormikContext } from 'formik'

// Custom dependencies
import Error from './Error'
import ImageInput, { ImageInputProps } from '../ImageInput'

interface ImageFieldProps
  extends Omit<
    ImageInputProps,
    'onChangeImage' | 'uri' | 'onBlur' | 'onChange'
  > {
  name: string
  onChange?: (uri: string) => void
}

const ImageField: React.FC<ImageFieldProps> = ({
  name,
  onChange,
  ...props
}) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext<any>()

  return (
    <>
      <ImageInput
        onBlur={() => setFieldTouched(name)}
        onChangeImage={(uri) => {
          onChange && onChange(uri)
          setFieldValue(name, uri)
        }}
        uri={values[name]}
        {...props}
      />

      <Error
        error={typeof errors[name] === 'string' ? errors[name] : undefined}
        visible={typeof touched[name] === 'boolean' ? touched[name] : false}
      />
    </>
  )
}

export default ImageField
