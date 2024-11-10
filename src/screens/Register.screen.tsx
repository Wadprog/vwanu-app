import React from "react";
import { useDispatch } from "react-redux";
import { View, ImageBackground } from "react-native";
import { string, ref, bool, object } from "yup";

// Core components
import tw from "../lib/tailwind";
import images from "../config/image";
import Text from "../components/Text";
import Link from "../components/Link";
import { Register } from "../store/auth";
import Screen from "../components/screen";
import NavigationDots from "../components/NavigationDots";
import { Form, Field, Submit, Switch } from "../components/form";

const ValidationSchema = object().shape({
  email: string().email().required().label("Email"),
  password: string().required().min(8).label("Password"),
  lastName: string().required().label("Last Name"),
  firstName: string().required().label("First Name"),
  passwordConfirmation: string()
    .required()
    .oneOf([ref("password"), ""], "Passwords must be match"),
  // termOfUse: bool().oneOf(
  //   [true],
  //   'You must accept the terms of use and the policy privacy'
  // ),
});

const initialValues = {
  firstName: "wads",
  lastName: "vav",
  email: "wad@df.lo",
  password: "1234567890",
  passwordConfirmation: "1234567890",
  // termOfUse: false,
};

const RegisterScreen: React.FC<{}> = () => {
  const dispatch = useDispatch();
  return (
    <Screen>
      <ImageBackground
        style={tw`px-5 flex-1 flex content-center justify-center`}
        source={images.regiterBg}
      >
        <>
          <View style={tw`mb-5 mt-10`}>
            <Text category="h6" style={tw`text-black mb-[7px]`}>
              Personal Information
            </Text>
            <Text category="p1" style={tw`text-black`}>
              Please fill the following
            </Text>
          </View>
          <Form
            validationSchema={ValidationSchema}
            initialValues={initialValues}
            onSubmit={(values) => dispatch<any>(Register(values))}
            style={tw`flex-1 flex justify-between justify-items-center`}
          >
            <>
              <View style={tw`mb-5 flex-1`}>
                <Field
                  label="First Name"
                  style={tw`mb-5 rounded-lg`}
                  required={true}
                  placeholder="First Name"
                  name="firstName"
                />

                <Field
                  label="Last Name"
                  key="lastName"
                  style={tw`mb-5 rounded-lg`}
                  required
                  autoCapitalize="none"
                  placeholder="Last Name"
                  name="lastName"
                />

                <Field
                  label="Email"
                  key="email"
                  style={tw`mb-5 rounded-lg`}
                  required
                  autoCapitalize="none"
                  placeholder="Email"
                  name="email"
                />

                <Field
                  label="Password"
                  key="password"
                  style={tw`mb-5 rounded-lg`}
                  required
                  autoCapitalize="none"
                  placeholder="Password"
                  name="password"
                />

                <Field
                  label="Password Confirmation"
                  key="passwordConfirmation"
                  style={tw`mb-5 rounded-lg`}
                  required
                  autoCapitalize="none"
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                />

                <View
                  style={tw`ml-2 my-2 flex flex-row items-center justify-left mb-9`}
                >
                  <Switch name="termOfUse" value={false} />
                  <View
                    style={tw` ml-2 flex flex-row items-center justify-left`}
                  >
                    <Text style={tw`text-black mr-1`}>I agree to the</Text>
                    <Link
                      text="Privacy"
                      to="privacy"
                      style={tw`text-secondary`}
                    />
                    <Text style={tw`text-black mx-1`}>and</Text>
                    <Link
                      text="Terms"
                      to="privacy"
                      style={tw`text-secondary`}
                    />
                  </View>
                </View>
                <Submit title="Register" />
                <NavigationDots selected={0} total={4} />
              </View>
              <View style={tw`bottom-0 flex flex-row justify-center`}>
                <Text
                  category="c1"
                  appearance="hint"
                  style={tw`text-black mr-2`}
                >
                  Already have an account
                </Text>

                <Link text="Log In" to="Login" />
              </View>
            </>
          </Form>
        </>
      </ImageBackground>
    </Screen>
  );
};

RegisterScreen.propTypes = {};
export default RegisterScreen;
