import React from 'react'
import { useFormikContext } from 'formik'

// Custom dependencies
import Error from './Error'
import ImageInputs from '../ImageInputs'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'

interface ImageFieldProps {
  name: string
  onChange?: (uri: string | string[]) => void
  style?: object
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
      <ImageInputs
        onBlur={() => setFieldTouched(name)}
        onSelect={(uris) => {
          onChange && onChange(uris)
          setFieldValue(name, uris)
        }}
        InitialImage={<MaterialCommunityIcons name="camera-plus" size={30} />}
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
