import React from "react";
import * as Yup from "yup";
import { View, Text } from "react-native";

import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
// Core components
import tw from "../lib/tailwind";

import { Form, Field, Submit, Switch } from "../components/form";

import Screen from "../components/screen";

const ValidationSchema = Yup.object().shape({
  // eslint-disable-next-line newline-per-chained-call
  email: Yup.string().required().min(6).email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const LoginScreen = ({ navigation }) => (
  <Screen style={tw`mx-0`}>
    <View
      style={tw`place-items-center bg-base-100 shadow-t-2xl rounded-t-[30px] lg:rounded-none px-4 md:px-8 -mt-28 z-10 md:mx-36 lg:mt-0 lg:mx-0 lg:h-screen h-full py-8`}
    >
      <Form
        validationSchema={ValidationSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={() => {}}
      >
        <Field
          required
          autoCapitalize="none"
          placeholder="Email"
          name="email"
          type="email"
        />
        <Field
          required
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          name="password"
          type="password"
          showPassword
        />

        <View style={tw`flex flex-row justify-between px-2 my-5`}>
          <View style={tw`flex flex-row justify-between items-center`}>
            <Switch />
            <Text style={tw`text-gray-400 font-bold ml-1`}>Remember me</Text>
          </View>
          <TouchableWithoutFeedback>
            <Text style={tw`text-cs-primary font-bold ml-1`}>
              Forget Password
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <Submit
          style={tw`rounded-full text-md btn-md`}
          title="Login"
          /* isLoading ? <Loader /> */
        />
        <View className="mt-9 text-center">
          <View style={tw`flex flex-row justify-center my-5 items-center `}>
            <Text
              style={tw`text-blue-600  text-center inline text-lg md:text-lg mr-2`}
            >
              Or sign Up with
            </Text>
            <MaterialCommunityIcons
              name="facebook"
              size={30}
              style={tw`text-blue-700 mr-2`}
            />

            <MaterialCommunityIcons
              name="twitter"
              size={30}
              style={tw`text-blue-300 mr-2`}
            />

            <MaterialCommunityIcons
              name="google-plus"
              size={30}
              style={tw`text-red-700 mr-2`}
            />
          </View>
        </View>
        <View style={tw`mt-8 lg:hidden`}>
          <View
            style={tw`text-center mt-4 flex flex-row justify-center align-center items-center`}
          >
            <Text style={tw`text-lg text-cs-primary font-semibold md:text-xl`}>
              Not a member ?
            </Text>

            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("SignUp");
              }}
              style={tw`rounded-3xl md:px-8 ml-1 text-base-100 bg-blue-700 p-2 px-3 flex flex-row items-center justify-center ml-1`}
            >
              <Text style={tw` text-lg font-semibold text-white `}>
                Registert
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Form>
    </View>
  </Screen>
);

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default LoginScreen;
