import React from "react";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Image, TouchableWithoutFeedback } from "react-native";
import { TextInputProps } from "react-native";

// Custom  dependencies
import tw from "../lib/tailwind";

interface ImageInputProps extends TextInputProps {
  uri: string;
  onChangeImage: (uri: string) => void;
  style?: object;
  disableChangeImage?: boolean;
  otherProps?: React.ComponentProps<typeof Image>;
}
const ImageInput: React.FC<ImageInputProps> = (props) => {
  const handleChange = async () => {
    if (props.disableChangeImage) return;
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      props.onChangeImage(result.uri);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handleChange}>
      <View
        style={[
          tw`bg-gray-200 p-4 rounded-2xl w-[106px] h-[118px] p-10 flex justify-center items-center m-2 overflow-hidden drop-shadow-sm`,
          props.style,
        ]}
      >
        {!props.uri && <MaterialCommunityIcons name="camera" size={30} />}
        {props.uri && (
          <Image
            source={{ uri: props.uri }}
            style={tw` w-full h-full`}
            {...props.otherProps}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageInput;
