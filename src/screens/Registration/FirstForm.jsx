import React from 'react';
import { Text } from 'react-native';
import * as Yup from 'yup';
import { differenceInYears } from 'date-fns';
import PropTypes from 'prop-types';

// Custom dependencies
import tw from '../../lib/tailwind';
import {
  Form,
  Submit,
  MultiSelector,
  Select,
  DateInput,
} from '../../components/form';

const items = [
  { id: 1, name: 'item-1' },
  { id: 2, name: 'item-2' },
];

const ValidationSchema = Yup.object().shape({
  country: Yup.string().required().label('Country'),
  gender: Yup.string().required().label('Gender'),
  interestedBy: Yup.array().required().label('Interest By'),
  birthday: Yup.date()
    .test(
      'birthday',
      'You should have 13 years old minimum to have an account on Vwanu ',
      (val) => differenceInYears(new Date(), val) >= 13
    )
    .required()
    .label('Date of Birth'),
});

const initialValues = {
  country: '',
  gender: '',
  interestedBy: [],
  birthday: '',
};

const PersonalInfo = ({ handleSubmit }) => (
  <Form
    validationSchema={ValidationSchema}
    initialValues={initialValues}
    onSubmit={handleSubmit}
    className="mt-4 lg:shadow-2xl border bg-white border-gray-300 lg:rounded-t-3xl md:px-24 lg:px-10"
  >
    <Text style={tw`text-black text-left text-2xl font-semibold mb-5 mt-3`}>
      Provide basic information
    </Text>

    <DateInput name="birthday" />

    <Select name="gender" items={['male', 'female']} />
    <Select name="country" items={['RD', 'HT']} />
    <MultiSelector name="interestedBy" items={items} />

    <Submit
      className="rounded-2xl text-base-100 text-md w-full ml-auto"
      title="Next"
      // title={isLoading ? <Loader /> : 'Next'}
    />
  </Form>
);

PersonalInfo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
export default PersonalInfo;
