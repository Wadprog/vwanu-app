import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

import tw from "../lib/tailwind";
export interface Medias {
  url: string;
  id: string;
  height: number;
}

interface ImageGridProps {
  medias: Medias[];
  style?: any;
  onImageTouch?: (id: number) => void;
}

const ImageGrid: React.FC<ImageGridProps> = (props) => {
  const { leftColumn, rightColumn } = splitImages(props.medias);
  return (
    <View>
      <ScrollView
        contentContainerStyle={tw` flex flex-row`}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {leftColumn.map((image) => (
            <TouchableOpacity
              key={image.id}
              style={styles.imageContainer}
              onPress={() => {
                props?.onImageTouch && props?.onImageTouch(image.id);
              }}
            >
              <Image
                source={{ uri: image.url }}
                style={{
                  width: Dimensions.get("screen").width / 2 - 8,
                  height: image.height,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View>
          {rightColumn.map((image) => (
            <TouchableOpacity
              key={image.id}
              style={styles.imageContainer}
              onPress={() => {
                props?.onImageTouch && props?.onImageTouch(image.id);
              }}
            >
              <Image
                source={{ uri: image.url }}
                style={{
                  width: Dimensions.get("screen").width / 2,
                  height: image.height,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  imageContainer: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
  },
});

const splitImages = (images: Medias[]) => {
  const leftColumn: any[] = [];
  const rightColumn: any[] = [];
  let leftHeight = 0;
  let rightHeight = 0;

  images.forEach((image: { height: number }) => {
    if (leftHeight <= rightHeight) {
      leftColumn.push(image);
      leftHeight += image.height;
    } else {
      rightColumn.push(image);
      rightHeight += image.height;
    }
  });

  return { leftColumn, rightColumn };
};
