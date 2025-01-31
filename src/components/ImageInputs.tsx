import { FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
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

  const removeItem = (item: ListItem) => {
    const itemSelected = selectedItems.filter((i) => i !== item)
    setSelectedItems(itemSelected)
    onSelect(itemSelected.map((i) => i.value))
  }

  const addItem = (item: ListItem) => {
    const itemSelected = [...selectedItems, item]
    setSelectedItems(itemSelected)
    onSelect(itemSelected.map((i) => i.value))
  }

  return (
    <FlatList
      ListHeaderComponent={() => (
        <ImageInput
          onChangeImage={(uri) => {
            addItem({ value: uri, label: Math.random().toString() })
          }}
          {...otherProps}
        />
      )}
      horizontal
      data={selectedItems}
      keyExtractor={(item) => item.label}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[tw`relative`]}
          onPress={() => removeItem(item)}
        >
          <MaterialCommunityIcons
            name="close-circle"
            size={30}
            color="red"
            style={[tw`absolute top-0 right-0 z-10`]}
          />
          <ImageInput
            uri={item.value}
            onChangeImage={() => removeItem(item)}
            disableChangeImage
          />
        </TouchableOpacity>
      )}
    />
  )
}

export default MultiImagePicker
