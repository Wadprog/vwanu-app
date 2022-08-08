import React from 'react';
import { Text, View } from 'react-native';
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
  { id: 1, name: 'item-1' },
  { id: 2, name: 'item-2' },
  { id: 1, name: 'item-1' },
  { id: 2, name: 'item-2' },
  { id: 1, name: 'item-1' },
  { id: 2, name: 'item-2' },
  { id: 1, name: 'item-1' },
  { id: 2, name: 'item-2' },
  { id: 1, name: 'item-1' },
  { id: 2, name: 'item-2' },
  { id: 1, name: 'item-1' },
  { id: 2, name: 'item-2' },
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
  >
    <View style={tw`flex-1`}>
      <Text
        style={tw`text-cs-primary text-left text-2xl font-semibold mb-5 mt-3`}
      >
        Provide basic information
      </Text>
      <View style={tw`flex  flex-1 justify-between  p-2`}>
        <View style={tw`flex max-h-5/6`}>
          <DateInput name="birthday" />

          <Select name="gender" items={['Male', 'Female']} />
          <Select name="country" items={['RD', 'HT']} />
          <MultiSelector name="interestedBy" items={items} />
        </View>
        <View style={tw`mb-1`}>
          <Submit
            title="Next"
            // title={isLoading ? <Loader /> : 'Next'}
          />
        </View>
      </View>
    </View>
  </Form>
);

PersonalInfo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
export default PersonalInfo;
