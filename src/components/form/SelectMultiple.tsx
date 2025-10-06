import React from 'react'
import { useFormikContext } from 'formik'

import Error from './Error'
import FieldParams from './fieldParams'
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'

export interface ListItem {
  label: string
  value: string
}

interface MultiSelectorProps extends FieldParams {
  items: ListItem[]
  IdleComponent: React.ComponentType<ListItem>
  SelectedComponent: React.ComponentType<ListItem>
  name: string
  required?: boolean
  wrapperStyle?: StyleProp<ViewStyle>
  maxSelected?: number
  selectedItemsCount?: (arg: number) => void
}
const MultiSelector: React.FC<MultiSelectorProps> = ({
  name,
  items,
  SelectedComponent,
  IdleComponent,
  required,
  wrapperStyle = {},
  maxSelected = items.length,
  selectedItemsCount,
}) => {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
    setFieldError,
  } = useFormikContext<any>()

  const handleSelect = (item: ListItem) => {
    const selectedItems = values[name] || []

    if (selectedItems.includes(item.value)) {
      setFieldValue(
        name,
        selectedItems.filter(
          (selectedValue: string) => selectedValue !== item.value
        )
      )
      selectedItemsCount && selectedItemsCount(values[name]?.length - 1 || 0)
    } else {
      if (selectedItems.length >= maxSelected) {
        setFieldError(name, `You can only select ${maxSelected} items`)
        return
      }
      setFieldValue(name, [...selectedItems, item.value])
      selectedItemsCount && selectedItemsCount(values[name]?.length + 1 || 0)
    }
    setFieldTouched(name)
    console.log('selectedItemsCount', values[name])
  }

  const selectedItems = values[name] || []

  return (
    <View style={wrapperStyle}>
      {items.map((item) => {
        const isSelected = selectedItems.includes(item.value)
        return (
          <View key={item.value}>
            <TouchableOpacity onPress={() => handleSelect(item)}>
              {isSelected && SelectedComponent ? (
                <SelectedComponent {...item} />
              ) : !isSelected && IdleComponent ? (
                <IdleComponent {...item} />
              ) : null}
            </TouchableOpacity>
          </View>
        )
      })}
      {required && (
        <Error
          error={typeof errors[name] === 'string' ? errors[name] : undefined}
          visible={typeof touched[name] === 'boolean' ? touched[name] : false}
        />
      )}
    </View>
  )
}

export default MultiSelector
