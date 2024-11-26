import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, TouchableOpacity } from "react-native";

import tw from "lib/tailwind";
import Text from "components/Text";
import Input from "components/Input";
import Screen from "components/screen";
import ProfAvatar from "components/ProfAvatar";
import { useFetchProfilesQuery } from "store/profiles";

const Chat: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Screen>
      <View style={tw`bg-white p-2`}>
        <Input
          placeholder="Search"
          style={tw`rounded-lg`}
          iconLeft={<Ionicons name="search" size={24} color="black" />}
        />
        <View>
          <Text style={tw`mt-3 mb-2`}>Frequently Chatted with</Text>
          <FlatList
            data={useFetchProfilesQuery().data}
            keyExtractor={(item) => item.id}
            horizontal
            ItemSeparatorComponent={() => <View style={tw`mr-2`} />}
            renderItem={({ item }) => (
              <ProfAvatar
                source={item.profilePicture}
                name={item.firstName}
                size={40}
                layout="col"
              />
            )}
          />
        </View>
        <Text style={tw`mt-3 mb-2`}>All Messages</Text>

        <FlatList
          data={useFetchProfilesQuery().data}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={tw`my-2 bg-gray-200 w-full h-[1px]`} />
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`flex flex-row items-center justify-between`}
              onPress={() => navigation.navigate("message")}
            >
              <ProfAvatar
                source={item.profilePicture}
                name={item.firstName}
                size={40}
                subtitle="Hey there"
              />
              <View style={tw`flex items-center`}>
                <Text appearance="hint" category="c1">
                  Yesterday
                </Text>
                <Text style={tw`bg-primary px-1 rounded-full text-white`}>
                  3
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Screen>
  );
};

export default Chat;
