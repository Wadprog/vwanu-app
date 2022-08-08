/* eslint-disable operator-linebreak */
import React from 'react';
import DatePicker from 'react-native-datepicker';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';

// Custom dependencies
import Error from './Error';
import tw from '../../lib/tailwind';

function DateInput({ name, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <>
      <DatePicker
        onBlur={() => setFieldTouched(name)}
        onDateChange={(date) => setFieldValue(name, date)}
        date={values[name]}
        style={tw`bg-blue-200 rounded-full p-2 w-full`}
        customStyles={{
          dateIcon: {
            // display: 'none',
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
            borderRadius: 4,
            borderColor: 'transparent',
          },
        }}
        {...otherProps}
      />
      <Error error={errors[name]} visible={touched[name]} style={tw`block`} />
    </>
  );
}

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  otherProps: PropTypes.object,
};
export default DateInput;
