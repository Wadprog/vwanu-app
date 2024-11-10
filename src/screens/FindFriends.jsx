import React from "react";
import * as Yup from "yup";
import { View, ImageBackground } from "react-native";

import { Form, MultiImageSelector, Submit } from "../components/form";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

// Core components
import tw from "../lib/tailwind";
import Text from "../components/Text";
import images from "../config/image";
import Screen from "../components/screen";
import NavigationDots from "../components/NavigationDots";
import Button from "../components/Button";

const us = [
  {
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    id: 1,
    firstName: "John",
  },
  {
    profilePicture:
      "https://images.unsplash.com/photo-1657299141984-dd9196274cde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    id: 2,
    firstName: "Jane",
  },
  {
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    id: 3,
    firstName: "Anne",
  },
  {
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    id: 4,
    firstName: "Thomas",
  },
  {
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    id: 5,
    firstName: "John",
  },

  {
    profilePicture:
      "https://images.unsplash.com/photo-1657299141984-dd9196274cde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    id: 6,
    firstName: "Jane",
  },
  {
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    id: 7,
    firstName: "Anne",
  },
  {
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    id: 8,
    firstName: "Thomas",
  },
  {
    profilePicture:
      "https://images.unsplash.com/photo-1657299141984-dd9196274cde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    id: 9,
    firstName: "Jane",
  },
  {
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    id: 10,
    firstName: "Anne",
  },
  {
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    id: 11,
    firstName: "Thomas",
  },
];

const initialValues = {
  users: [],
};
const ValidationSchema = Yup.object().shape({
  users: Yup.array().required().label("users"),
});

// const FindFriends = ({ handleSubmit, onBack }) => (
//   <View style={tw`flex-1`}>
//     <Text style={tw`text-cs-primary font-bold text-lg `}>
//       Select all the person you want to follow
//     </Text>
//     <Form
//       validationSchema={ValidationSchema}
//       initialValues={initialValues}
//       onSubmit={handleSubmit}
//     >
//       <View
//         style={tw`flex-1 pb-10 flex pb-1 justify-between items-center relative`}
//       >
//         <View style={tw` h-5/6 `}>
//           <MultiImageSelector items={us} name="users" />
//         </View>
//         <View style={tw` justify-self-end self-end mb-2 justify-end  w-full`}>
//           <View style={tw`flex flex-row justify-between items-center`}>
//             <TouchableHighlight
//               onPress={() => {
//                 onBack();
//               }}
//             >
//               <Text style={tw`text-cs-primary font-bold text-lg `}> Back</Text>
//             </TouchableHighlight>
//             <View style={tw`flex flex-row justify-end items-center w-3/4`}>
//               <TouchableHighlight onPress={() => {}}>
//                 <Text style={tw`text-cs-primary  text-lg`}>(skip)</Text>
//               </TouchableHighlight>

//               <View style={tw`grow`}>
//                 <Submit title="Finish" />
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//     </Form>
//   </View>
// );

const IconWithArrow = () => (
  <MaterialCommunityIcons
    name="chevron-right"
    size={24}
    color={tw.color("text-primary font-bold")}
    style={tw`-ml-4         `}
    selectionColor={tw`bg-red-500`}
  />
);

const FindFriends = () => {
  const handleSubmit = (values) => {
    console.log(" registering wi la ");
    console.log(values);
  };

  return (
    <Screen>
      <ImageBackground
        style={tw`px-5 flex-1 flex content-center justify-center`}
        source={images.regiterBg}
      >
        <View style={tw`mb-5 mt-10`}>
          <Text category="h6" style={tw`text-black mb-[7px]`}>
            Connect with new people
          </Text>
          <Text category="p1" style={tw`text-black`}>
            Find your friend and connect with them
          </Text>
        </View>
        <Form
          validationSchema={ValidationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          style={tw`flex-1 flex justify-between justify-items-center`}
        >
          <View />
          <MultiImageSelector items={us} name="users" />
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
          <NavigationDots selected={2} total={4} />
        </Form>
      </ImageBackground>
    </Screen>
  );
};
FindFriends.propTypes = {};
export default FindFriends;
