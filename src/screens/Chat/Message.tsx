import React from "react";
import { View, FlatList } from "react-native";

import tw from "lib/tailwind";
import Text from "components/Text";
import Screen from "components/screen";
import ChatBubble from "./components/Chatbubble";

const chatMessages = [
  {
    id: "1",
    name: "Someone V.",
    content: "Hey there",
    time: "11/12/2021",
    count: 3,
  },
  {
    id: "2",
    name: "Someone V.",
    content: "Hey there",
    time: "12/21/2021",
    count: 3,
  },
  {
    id: "3",
    name: "Someone V.",
    content: "Hey there",
    time: "11/12/2024",
    count: 3,
  },
];

const Message: React.FC = () => {
  return (
    <Screen>
      <Text>Someon V.</Text>
      <Text>Last seen 2hrs ago</Text>
      <Text>Yesterday</Text>
      <View style={tw`bg-white p-2`}>
        <FlatList
          data={chatMessages}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={tw`my-2 bg-gray-200 w-full h-[1px]`} />
          )}
          renderItem={({ item }) => <ChatBubble {...item} />}
        />
      </View>
    </Screen>
  );
};

export default Message;
