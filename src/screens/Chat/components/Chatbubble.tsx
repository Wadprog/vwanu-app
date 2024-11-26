import React from "react";
import { View, StyleSheet } from "react-native";
import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";

import tw from "lib/tailwind";
import Text from "components/Text";

interface ChatBubbleProps {
  content: string;
  time: string;
  direction?: "left" | "right";
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  direction = "right",
  ...prop
}) => {
  return (
    <View style={tw`bg-primary p-[10px] ml-[45%] rounded-3xl m-w-[50%]`}>
      <Text style={styles.text}>{prop.content}</Text>
      <Text category="c1" appearance="hint" style={tw`text-right`}>
        {formatDistanceToNowStrict(new Date("2021-11-12"))}
      </Text>
      <View style={tw`bg-red-500 absolute w-[20px] h-[25px] r-[-10px]`} />
      <View style={styles.rightArrowOverlap} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0078fe",
    padding: 10,
    marginLeft: "45%",
    borderRadius: 20,
    marginTop: 5,
    marginRight: "5%",
    maxWidth: "50%",
    alignSelf: "flex-end",
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
  rightArrow: {
    position: "absolute",
    backgroundColor: "#0078fe",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10,
  },
  rightArrowOverlap: {
    position: "absolute",
    backgroundColor: "red",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },
});

export default ChatBubble;
/**<View
              style={tw`flex items-center justify-between bg-red-300 p-3 rounded-tr-3xl rounded-tl-lg rounded-bl-lg w-[90%]`}
            >
              <View style={tw`flex items-center`}>
                <Text appearance="hint" category="c1">
                  {item.content}
                </Text>
                <Text appearance="hint" category="c1">
                  {item.time}
                </Text>
              </View>
            </View> */
