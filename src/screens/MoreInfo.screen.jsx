import React from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { View, ImageBackground } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Core components
import tw from "../lib/tailwind";
import { updateUser } from "../store/auth";
import {
  Form,
  Submit,
  DateInput,
  Select,
  MultiSelector,
} from "../components/form";
import Text from "../components/Text";
import images from "../config/image";
import Screen from "../components/screen";
import NavigationDots from "../components/NavigationDots";
import Link from "../components/Link";

const ValidationSchema = Yup.object().shape({
  city: Yup.string().required().label("City"),
  country: Yup.string().required().label("Country"),
  interest: Yup.array().required().label("Interest"),
  dob: Yup.date().required().label("Date of Birth"),
  gender: Yup.string().required().oneOf(["Male", "featmale"]).label("Gender"),
});

const initialValues = {
  dob: "",
  gender: "",
  email: "",
  country: "",
  city: "",
  interest: "",
};

const Icon = () => (
  <MaterialCommunityIcons name="gender-male-female" size={24} color="black" />
);

const genders = [
  {
    label: "Male",
    value: "male",
  },

  {
    label: "Female",
    value: "female",
  },
];
const RegisterScreen = () => {
  const dispatch = useDispatch();

  return (
    <Screen>
      <ImageBackground
        style={tw`px-5 flex-1 flex content-center justify-center`}
        source={images.regiterBg}
      >
        <View style={tw`mb-5 mt-10`}>
          <Text category="h6" style={tw`text-black mb-[7px]`}>
            More Personal Information
          </Text>
          <Text category="p1" style={tw`text-black`}>
            Let&apos;s get to know you better
          </Text>
        </View>
        <Form
          validationSchema={ValidationSchema}
          initialValues={initialValues}
          onSubmit={(value) => {
            dispatch(updateUser(value));
          }}
          style={tw`flex-1 flex justify-between justify-items-center`}
        >
          <View style={tw`mb-5 flex-1`}>
            <DateInput
              label="Date of Birth"
              style={tw`mb-5 rounded`}
              required
              autoCapitalize="none"
              placeholder="Date of Birth"
              name="dob"
              type="text"
              autoComplete="new-email"
            />

            <Select
              label="Gender"
              items={genders}
              style={tw`mb-5 rounded`}
              required
              autoCapitalize="none"
              placeholder="Select your gender"
              name="gender"
              type="text"
              autoComplete="new-email"
              iconLeft={<Icon />}
            />
            {/*<Select
              label="Country"
              items={['Male', 'Female']}
              style={tw`mb-5 rounded-lg`}
              required
              autoCapitalize="none"
              placeholder="Country"
              name="country"
              type="text"
              autoComplete="new-email"
            />

            <Select
              label="City"
              items={['Male', 'Female']}
              style={tw`mb-5 rounded-lg`}
              required
              autoCapitalize="none"
              placeholder="City"
              name="city"
              type="text"
              autoComplete="new-email"
            />
             <MultiSelector
              label="Interests"
              items={['Male', 'Female']}
              style={tw`mb-5 rounded-lg`}
              required
              autoCapitalize="none"
              placeholder="City"
              name="interest"
              type="text"
              autoComplete="new-email"
            /> */}

            <Submit title="Register" />
            <NavigationDots selected={1} total={4} />
          </View>
          <View style={tw`bottom-0 flex flex-row justify-center`}>
            <Text category="c1" appearance="hint" style={tw`text-black mr-2`}>
              Already have an account
            </Text>

            <Link text="Log In" to="Login" />
          </View>
        </Form>
      </ImageBackground>
    </Screen>
  );
};

// RegisterScreen.propTypes = {}
export default RegisterScreen;
