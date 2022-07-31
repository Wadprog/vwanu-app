import React from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';

// Custom Dependencies
import Button from '../Button';

// eslint-disable-next-line react/prop-types
function SubmitBtn({ title, ...otherProps }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} {...otherProps} />;
}

SubmitBtn.prototype = {
  title: PropTypes.string.isRequired,
  otherProps: PropTypes.object,
};

export default SubmitBtn;
