import React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { View, ImageBackground } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Custom dependencies
import tw from "../lib/tailwind";
import images from "../config/image";
import Text from "../components/Text";
import Screen from "../components/screen";
import Button from "../components/Button";
import NavigationDots from "../components/NavigationDots";
import { Form, Submit, ImageField } from "../components/form";
// import { fullLogin } from '../store/auth'

const ValidationSchema = Yup.object().shape({
  profilePicture: Yup.string().required().label("Profile Picture").nullable(),
});

const initialValues = {
  profilePicture: null,
};

const IconWithArrow = () => (
  <MaterialCommunityIcons
    name="chevron-right"
    size={24}
    color={tw.color("text-primary font-bold")}
    style={tw`-ml-4         `}
    selectionColor={tw`bg-red-500`}
  />
);

const ProfilePictureForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();

  return (
    <Screen>
      <ImageBackground
        style={tw`px-5 flex-1 flex content-center justify-center`}
        source={images.regiterBg}
      >
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
          onSubmit={handleSubmit}
          style={tw`flex-1 flex justify-between`}
        >
          <View style={tw` flex items-center`}>
            <ImageField name="profilePicture" style={tw`w-3/4 h-[70px]"/>`} />
            <View style={tw`mt-5`}>
              <Text style={tw`text-[#979292] text-lg text-center`}>
                Choose a profile picture
              </Text>
              <Text
                style={tw`text-[#979292] text-center text-lg w-[55%] text-wrap`}
              >
                A Profile picture helps you connect more
              </Text>
            </View>
          </View>
          <View>
            <View style={tw`flex flex-row justify-between`}>
              <Button
                title="Skip"
                appearance="ghost"
                style={tw`text-black`}
                textStyle={tw`text-black`}
              />
              <Submit
                title="Register"
                accessoryRight={IconWithArrow}
                appearance="ghost"
                style={tw`text-black`}
                textStyle={tw`text-black`}
              />
            </View>
            <NavigationDots selected={3} total={4} />
          </View>
        </Form>
      </ImageBackground>
    </Screen>
  );
};

ProfilePictureForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
export default ProfilePictureForm;
