import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Custom dependencies
import tw from '../../lib/tailwind';
import { Form, Submit, ImageField } from '../../components/form';

const ValidationSchema = Yup.object().shape({
  profilePicture: Yup.string().required().label('Profile Picture').nullable(),
});

const initialValues = {
  profilePicture: null,
};

const ProfilePictureForm = ({ handleSubmit, onBack }) => (
  <Form
    validationSchema={ValidationSchema}
    initialValues={initialValues}
    onSubmit={handleSubmit}
    className="mt-4 lg:shadow-2xl border bg-white border-gray-300 lg:rounded-t-3xl md:px-24 lg:px-10"
  >
    <Text
      style={tw`text-black text-left text-2xl font-semibold mb-5 mt-3 text-cs-primary`}
    >
      Select your profile picture
    </Text>

    <View style={tw` flex items-center`}>
      <ImageField name="profilePicture" />
    </View>
    <View style={tw`flex flex-row items-center`}>
      <TouchableWithoutFeedback onPress={onBack}>
        <View style={tw`flex items-center justify-center`}>
          <MaterialCommunityIcons
            name="arrow-left-drop-circle"
            size={30}
            color="black"
          />
          <Text>(Back)</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={tw`flex flex-row items-center ml-auto`}>
        <TouchableWithoutFeedback onPress={handleSubmit}>
          <Text style={tw`text-cs-primary mr-1 text-lg`}>(Skip)</Text>
        </TouchableWithoutFeedback>
        <Submit
          style={tw`w-24 `}
          title="Next"
          // title={isLoading ? <Loader /> : 'Next'}
        />
      </View>
    </View>
  </Form>
);

ProfilePictureForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
export default ProfilePictureForm;
