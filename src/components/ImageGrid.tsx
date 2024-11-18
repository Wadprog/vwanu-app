import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import tw from "../lib/tailwind";
export interface Medias {
  url: string;
  id: string;
  height: number;
}

interface ImageGridProps {
  medias: Medias[];
  style?: any;
}

const ImageGrid: React.FC<ImageGridProps> = (props) => {
  const navigation = useNavigation();
  const { leftColumn, rightColumn } = splitImages(props.medias);
  return (
    <TouchableOpacity
      onPress={() => {
        // @ts-ignore
        navigation.navigate("gallery", { medias: props.medias });
      }}
    >
      <ScrollView
        contentContainerStyle={tw` flex flex-row`}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {leftColumn.map((image) => (
            <View key={image.id} style={styles.imageContainer}>
              <Image
                source={{ uri: image.url }}
                style={{
                  width: Dimensions.get("screen").width / 2 - 8,
                  height: image.height,
                }}
              />
            </View>
          ))}
        </View>
        <View>
          {rightColumn.map((image) => (
            <View key={image.id} style={styles.imageContainer}>
              <Image
                source={{ uri: image.url }}
                style={{
                  width: Dimensions.get("screen").width / 2,
                  height: image.height,
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </TouchableOpacity>
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
