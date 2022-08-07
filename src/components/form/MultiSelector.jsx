import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
// Custom dependencies
import Error from './Error';
import MultiSelect from '../MultiSelect';

const MultiSelector = ({ name, items, ...otherProps }) => {
  const { setFieldTouched, setFieldValue, errors, touched } = useFormikContext();

  const handleMultiValue = (values) => values.map((item) => item.name);

  return (
    <>
      <MultiSelect
        items={items}
        onBlur={() => setFieldTouched(name)}
        onValueChange={(value) => setFieldValue(name, handleMultiValue(value))}
        {...otherProps}
      />

      <Error error={errors[name]} visible={touched[name]} />
    </>
  );
};

MultiSelector.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default MultiSelector;
