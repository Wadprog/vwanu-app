import React from 'react';
import * as Yup from 'yup';
// Customs imports

import { View, Button } from 'react-native';
import { Text } from '@ui-kitten/components';

// import routes from '../navigation/routes'
import tw from 'tailwind-react-native-classnames';
import { Field, Form, Submit } from '../components/form';
import BTN from '../components/Button';

import Screen from '../components/Screen';

// Components

const ValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  pin: Yup.string().required().min(4).label('Pin'),
});
// Main Function To Export
const WelcomeScreen = () => (
  <Screen>
    <View style={[tw` h-full z-0 from-sky-300`]}>
      <Text
        category="h1"
        style={[tw`text-blue-500 text-center text-yellow-500 py-20`]}
      >
        Welcome
      </Text>
      <View
        style={tw` bg-white h-full z-10  rounded-t-3xl pt-4 px-4 flex flex-column items-stretch`}
      >
        <Text style={tw`text-yellow-500  text-lg font-bold mb-10`}>
          Sign in to vwanu
        </Text>
        <Form
          validationSchema={ValidationSchema}
          initialValues={{ email: '', pin: '' }}
          onSubmit={() => {}}
        >
          <Field
            autoCapitalize="none"
            autoCorrect={false}
            editable={false}
            icon="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Email"
            name="email"
          />

          <Field
            autoCapitalize="none"
            autoCorrect={false}
            editable={false}
            icon="key"
            textContentType="password"
            placeholder="Pin"
            secureTextEntry
            name="password"
          />
          <View style={tw`flex  flex-row justify-between`}>
            <Button title="forge password" style={tw` text-right`} />
            <Button title="forge password" style={tw` text-right`} />
          </View>
          <Submit title="Login" />
        </Form>
        <View style={tw`flex  flex-row justify-center`}>
          <Button title="forge password" style={tw` text-right`} />
          <Button title="forge password" style={tw` text-right`} />
        </View>

        <View
          style={tw`flex  justify-self-end absolute bottom-10 flex-row justify-center px-4`}
        >
          <Button title="forge password" style={tw` text-right grow`} />
          <BTN title="Register" style={[tw``, { width: '50%' }]} />
        </View>
      </View>
    </View>
  </Screen>
);

export default WelcomeScreen;
