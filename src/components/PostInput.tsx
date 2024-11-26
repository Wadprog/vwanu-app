import { View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { string, object } from "yup";

import { Avatar } from "react-native-paper";

import tw from "../lib/tailwind";
import Img from "../assets/svg/Image";
import { Form, Field, Submit } from "./form";
import { getCurrentUser } from "../store/auth";
import VerticalIcons from "../assets/svg/Vertical";

import image from "../config/image";
const ValidationSchema = object().shape({
  post: string().required("Post is required"),
});

const PostInput = () => {
  const user = useSelector(getCurrentUser);
  return (
    <Form
      validationSchema={ValidationSchema}
      initialValues={{ post: "" }}
      //@ts-ignore
      onSubmit={(values) => {}}
      style={tw`bg-white`}
    >
      <View style={tw`flex flex-row overflow-hidden my-2`}>
        <Avatar.Image
          source={{
            uri:
              user?.user?.profilePicture ||
              "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
          }}
          size={50}
        />

        <Field
          name="post"
          placeholder="What's on your mind?"
          style={tw`border-[#F2F3F5] border-[1px] bg-white ml-2 rounded-2xl mb-0 w-[78] flex-1`}
          iconRight={
            <View style={tw`flex flex-row`}>
              <Img />
              <VerticalIcons />
            </View>
          }
        />
      </View>
    </Form>
  );
};

export default PostInput;
