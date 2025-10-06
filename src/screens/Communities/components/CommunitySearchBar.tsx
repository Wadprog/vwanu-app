import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Input from 'components/Input'
import tw from 'lib/tailwind'

interface CommunitySearchBarProps {
  onSearchChange: (text: string) => void
}

const CommunitySearchBar: React.FC<CommunitySearchBarProps> = ({
  onSearchChange,
}) => {
  return (
    <View style={tw`px-4 py-2 my-3`}>
      <Input
        placeholder="Search..."
        accessoryRight={
          <Ionicons
            name="search"
            size={24}
            color={tw.color('text-primary')}
            style={tw`mr-2 rounded-3xl`}
          />
        }
        onChangeText={onSearchChange}
      />
    </View>
  )
}

export default CommunitySearchBar
