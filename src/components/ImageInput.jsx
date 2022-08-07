import { View, Image, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
// Custom  dependencies
import tw from '../lib/tailwind';

const ImageInput = ({
  uri,
  onChangeImage,
  style,
  disableChangeImage = false,
  ...otherProps
}) => {
  const handleChange = async () => {
    if (disableChangeImage) return;
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      onChangeImage(result.uri);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handleChange}>
      <View
        style={[
          tw`bg-blue-200 p-4 rounded-[45px] w-30 h-30 flex justify-center items-center m-2 overflow-hidden drop-shadow-sm`,
          style,
        ]}
      >
        {!uri && <MaterialCommunityIcons name="camera" size={30} />}
        {uri && (
          <Image
            source={{
              uri,
            }}
            style={tw`object-scale-down w-30 h-30`}
            {...otherProps}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

ImageInput.propTypes = {
  uri: PropTypes.string,
  onChangeImage: PropTypes.func.isRequired,
  disableChangeImage: PropTypes.bool,
  style: PropTypes.object,
};
export default ImageInput;
