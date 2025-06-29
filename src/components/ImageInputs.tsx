import { FlatList, TouchableOpacity, View, Text, Animated } from 'react-native'
import React, { useRef } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// Custom import
import tw from '../lib/tailwind'
import { ListItem } from '../../types'
import ImageInput, { ImageInputProps } from './ImageInput'

interface MultiImageSelector extends Omit<ImageInputProps, 'onChangeImage'> {
  onSelect: (urls: string[]) => void
  onBlur?: () => void
}

const MultiImagePicker: React.FC<MultiImageSelector> = ({
  onSelect,
  ...otherProps
}) => {
  const [selectedItems, setSelectedItems] = React.useState<ListItem[]>([])
  const slideAnim = useRef(new Animated.Value(0)).current

  const removeItem = (item: ListItem) => {
    // Animate removal
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      const itemSelected = selectedItems.filter((i) => i !== item)
      setSelectedItems(itemSelected)
      onSelect(itemSelected.map((i) => i.value))
      slideAnim.setValue(0)
    })
  }

  const addItem = (item: ListItem) => {
    const itemSelected = [...selectedItems, item]
    setSelectedItems(itemSelected)
    onSelect(itemSelected.map((i) => i.value))

    // Animate addition
    Animated.spring(slideAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const ImageItem = ({ item, index }: { item: ListItem; index: number }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start()
    }

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start()
    }

    return (
      <Animated.View
        style={[styles.imageContainer, { transform: [{ scale: scaleAnim }] }]}
      >
        <TouchableOpacity
          style={styles.imageWrapper}
          onPress={() => removeItem(item)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          {/* Remove button */}
          <View style={styles.removeButton}>
            <MaterialCommunityIcons name="close" size={16} color="white" />
          </View>

          {/* Image index badge */}
          <View style={styles.indexBadge}>
            <Text style={styles.indexText}>{index + 1}</Text>
          </View>

          <ImageInput
            uri={item.value}
            onChangeImage={() => removeItem(item)}
            disableChangeImage
            style={styles.selectedImage}
          />
        </TouchableOpacity>
      </Animated.View>
    )
  }

  const AddImageButton = () => (
    <View style={styles.addButtonContainer}>
      <ImageInput
        onChangeImage={(uri) => {
          addItem({ value: uri, label: Math.random().toString() })
        }}
        style={styles.addButton}
        {...otherProps}
      />
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="file-image" size={20} color="#374151" />
          <Text style={styles.headerTitle}>Photos & Videos</Text>
        </View>
        {selectedItems.length > 0 && (
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{selectedItems.length}/10</Text>
          </View>
        )}
      </View>

      {/* Images Grid */}
      <FlatList
        ListHeaderComponent={<AddImageButton />}
        horizontal
        data={selectedItems}
        keyExtractor={(item) => item.label}
        renderItem={({ item, index }) => (
          <ImageItem item={item} index={index} />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Helper text */}
      {selectedItems.length === 0 && (
        <Text style={styles.helperText}>
          Tap to add photos or videos to your post. You can add up to 10 media
          files.
        </Text>
      )}

      {selectedItems.length > 0 && (
        <Text style={styles.helperText}>
          Tap on any media to remove it from your post.
        </Text>
      )}
    </View>
  )
}

const styles = {
  container: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  headerLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#374151',
    marginLeft: 8,
  },
  countBadge: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  countText: {
    fontSize: 12,
    fontWeight: '500' as const,
    color: '#3B82F6',
  },
  listContent: {
    paddingHorizontal: 4,
  },
  separator: {
    width: 12,
  },
  addButtonContainer: {
    position: 'relative' as const,
    marginRight: 12,
  },
  addButton: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed' as const,
  },
  addButtonOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: 12,
    pointerEvents: 'none' as const,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '500' as const,
    color: '#6B7280',
    marginTop: 4,
  },
  imageContainer: {
    position: 'relative' as const,
  },
  imageWrapper: {
    position: 'relative' as const,
    borderRadius: 12,
    overflow: 'hidden' as const,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  removeButton: {
    position: 'absolute' as const,
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  indexBadge: {
    position: 'absolute' as const,
    top: 6,
    left: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(59, 130, 246, 0.9)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    zIndex: 9,
  },
  indexText: {
    fontSize: 10,
    fontWeight: '600' as const,
    color: 'white',
  },
  helperText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center' as const,
    marginTop: 12,
    paddingHorizontal: 16,
    lineHeight: 20,
  },
}

export default MultiImagePicker
