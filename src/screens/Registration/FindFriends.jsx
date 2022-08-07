import React from 'react';
import * as Yup from 'yup';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

// Custom dependencies
import tw from '../../lib/tailwind';
import { Form, MultiImageSelector, Submit } from '../../components/form';

const us = [
  {
    profilePicture:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    id: 1,
    firstName: 'John',
  },
  {
    profilePicture:
      'https://images.unsplash.com/photo-1657299141984-dd9196274cde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    id: 2,
    firstName: 'Jane',
  },
  {
    profilePicture:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    id: 3,
    firstName: 'Anne',
  },
  {
    profilePicture:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    id: 4,
    firstName: 'Thomas',
  },
  {
    profilePicture:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    id: 1,
    firstName: 'John',
  },

  {
    profilePicture:
      'https://images.unsplash.com/photo-1657299141984-dd9196274cde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    id: 2,
    firstName: 'Jane',
  },
  {
    profilePicture:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    id: 3,
    firstName: 'Anne',
  },
  {
    profilePicture:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    id: 4,
    firstName: 'Thomas',
  },
  {
    profilePicture:
      'https://images.unsplash.com/photo-1657299141984-dd9196274cde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    id: 2,
    firstName: 'Jane',
  },
  {
    profilePicture:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    id: 3,
    firstName: 'Anne',
  },
  {
    profilePicture:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    id: 4,
    firstName: 'Thomas',
  },
];

const initialValues = {
  users: [],
};
const ValidationSchema = Yup.object().shape({
  users: Yup.array().required().label('users'),
});
const FindFriends = ({ handleSubmit }) => (
  <View>
    <Text style={tw` text-cs-primary font-bold text-lg `}>
      Select all the person you want to follow
    </Text>
    <Form
      validationSchema={ValidationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <View
        style={tw` bg-red-1500  pb-10 flex pb-1 justify-between items-center relative`}
      >
        <View style={tw` bg-green-1500 h-4/6  mb-4 `}>
          <MultiImageSelector items={us} name="users" />
        </View>
        <View
          style={tw` flex flex-1 h-2/6 bg-blue-1500 justify-self-end self-end mb-4 justify-end  w-full`}
        >
          <View>
            <Submit
              title="Finish"

              // title={isLoading ? <Loader /> : 'Next'}
            />
          </View>
        </View>
      </View>
    </Form>
  </View>
);

FindFriends.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
export default FindFriends;
