import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

// Custom dependencies
import Error from './Error';
import ImageInput from '../ImageInput';

const ImageField = ({ name, ...otherProps }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();

  return (
    <>
      <ImageInput
        onBlur={() => setFieldTouched(name)}
        onChangeImage={(uri) => setFieldValue(name, uri)}
        uri={values[name]}
        {...otherProps}
      />

      <Error error={errors[name]} visible={touched[name]} />
    </>
  );
};

ImageField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ImageField;
