import React from "react";

import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { string, object } from "yup";

import tw from "../../lib/tailwind";
import Kore from "../../assets/svg/Kore";
import { Medias } from "../../components/ImageGrid";
import { useFetchPostsQuery } from "../../store/post";
import { Ionicons } from "@expo/vector-icons";
import useToggle from "../../hooks/useToggle";
import { Form, Field, Submit } from "../../components/form";
import AnimationLoader from "../../components/AnimationLoader";
import animations from "../../config/animations";

const { width, height } = Dimensions.get("screen");
const IMG_SIZE = 80;
const SPACING = 10;

const validationSchema = object().shape({
  comment: string().required("Comment is required"),
});

const ImageGallery: React.FC<{}> = () => {
  const { data = [] } = useFetchPostsQuery();
  const images = data[2]?.medias || [];
  const [activeIndex, setActiveIndex] = React.useState(0);

  const topRef = React.useRef<FlatList>(null);
  const thumbRef = React.useRef<FlatList>(null);
  const animationRef = React.useRef<AnimationLoader>(null);
  const [showCommentBox, toggleShowCommentBox] = useToggle(false);
  const [liked, toggleLiked] = useToggle(false);

  const handleLike = (): void => {
    if (!liked) {
      toggleLiked();
      return;
    }

    animationRef.current?.play();
  };
  const scrollToActiveIndex = (index: number) => {
    console.log("I have been called");
    setActiveIndex(index);

    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    if (index * IMG_SIZE - IMG_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMG_SIZE + SPACING) - width / 2 + IMG_SIZE / 2,
        animated: true,
      });
    }
  };

  const handleSubmit = (values: any) => {
    console.log("values", values);
  };
  return (
    <View style={tw`flex-1 relative`}>
      <FlatList
        ref={topRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ width, height }}>
            <Image
              source={{ uri: item.url }}
              style={[StyleSheet.absoluteFillObject]}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <FlatList
        ref={thumbRef}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ position: "absolute", bottom: 20 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        onMomentumScrollEnd={(ev) => {
          const index = Math.floor(ev.nativeEvent.contentOffset.x / width);
          console.log("calling scrollToActiveIndex");
          scrollToActiveIndex(index);
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              console.log("calling scrollToActiveIndex");
              scrollToActiveIndex(index);
            }}
          >
            <Image
              source={{ uri: item.url }}
              style={{
                width: IMG_SIZE,
                height: IMG_SIZE,
                borderRadius: SPACING,
                marginBottom: 10,
                marginRight: 10,
                borderWidth: 2,
                borderColor: activeIndex === index ? "white" : "transparent",
              }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={tw`absolute bottom-[${IMG_SIZE * 2}px] right-2 `}>
        <TouchableOpacity
          onPress={handleLike}
          style={tw`bg-white bg-opacity-50 items-center justify-center 
           rounded-full w-10 h-10 mb-3`}
        >
          <Kore />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleShowCommentBox}
          style={tw`bg-white bg-opacity-50 items-center justify-center 
            rounded-full w-10 h-10`}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {showCommentBox && (
        <Form
          validationSchema={validationSchema}
          initialValues={{ comment: "" }}
          // @ts-ignore
          handleSubmit={handleSubmit}
          style={tw`absolute top-0 left-0 `}
        >
          <TouchableOpacity
            onPress={toggleShowCommentBox}
            style={[
              tw`bg-black bg-opacity-50 items-center justify-center flex-1`,
              { width, height },
            ]}
          >
            <Field
              name="comment"
              placeholder="comment on this post"
              style={tw`rounded w-[${width * 0.9}px]`}
            />
            <Submit title="submit" appearance="ghost" />
          </TouchableOpacity>
        </Form>
      )}
      <View style={tw`absolute bottom-40 h-100 w-[${width * 0.75}px] right-10`}>
        <AnimationLoader
          source={animations.confeti}
          loop={false}
          ref={animationRef}
        />
      </View>
    </View>
  );
};

export default ImageGallery;
