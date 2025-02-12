import React from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

import tw from 'lib/tailwind'
import Kore from 'assets/svg/Kore'
import useToggle from 'hooks/useToggle'
import animations from 'config/animations'
import CommentForm from 'components/CommentForm'
import AnimationLoader from 'components/AnimationLoader'

const IMG_SIZE = 80
const SPACING = 10
const { width, height } = Dimensions.get('screen')

const ImageGallery: React.FC<{}> = () => {
  console.log('\n\n\n\n')
  console.log('*************')
  console.log('Loaded ImageGallery')
  console.log('\n\n\n\n')
  const route = useRoute()
  const navigation = useNavigation()
  // @ts-ignore
  const images = route?.params?.Media || []

  const [activeIndex, setActiveIndex] = React.useState(
    //@ts-ignore
    route?.params?.initialSlide || 0
  )

  const topRef = React.useRef<FlatList>(null)
  const thumbRef = React.useRef<FlatList>(null)
  const animationRef = React.useRef<AnimationLoader>(null)
  const [liked, toggleLiked] = useToggle(false)

  const snapPoints = ['40%']
  const handleLike = (): void => {
    if (!liked) {
      toggleLiked()
      return
    }

    animationRef.current?.play()
  }
  const bottomSheetRef = React.useRef<BottomSheet>(null)
  const scrollToActiveIndex = (index: number) => {
    setActiveIndex(index)

    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    })

    if (index * IMG_SIZE - IMG_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMG_SIZE + SPACING) - width / 2 + IMG_SIZE / 2,
        animated: true,
      })
    }
  }

  const handleOpenComments = () => {
    bottomSheetRef.current?.expand()
  }

  return (
    <View style={tw`flex-1 `}>
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
                source={{ uri: item.original }}
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
          style={{ position: 'absolute', bottom: 20 }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          onMomentumScrollEnd={(ev) => {
            const index = Math.floor(ev.nativeEvent.contentOffset.x / width)
            scrollToActiveIndex(index)
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                scrollToActiveIndex(index)
              }}
            >
              <Image
                source={{ uri: item.original }}
                style={{
                  width: IMG_SIZE,
                  height: IMG_SIZE,
                  borderRadius: SPACING,
                  marginBottom: 10,
                  marginRight: 10,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? 'white' : 'transparent',
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
            onPress={handleOpenComments}
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

        <View
          style={tw`absolute bottom-40 h-100 w-[${width * 0.75}px] right-10`}
        >
          <AnimationLoader
            source={animations.confeti}
            loop={false}
            ref={animationRef}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          style={tw`absolute bg-white rounded-full p-2 bg-opacity-50 top-10 right-3 `}
        >
          <MaterialCommunityIcons
            name="close"
            style={tw`text-black`}
            size={24}
          />
        </TouchableOpacity>
      </View>
      {/* @ts-ignore */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Initially hidden
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={(props) => (
          <>
            {/* @ts-ignore */}
            <BottomSheetBackdrop {...props} />
          </>
        )}
      >
        {/* @ts-ignore */}
        <BottomSheetView style={tw`flex-1 px-1`}>
          {/* @ts-ignore */}
          <CommentForm postId={route.params?.id!.toString()} />
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

export default ImageGallery
