import React from "react";
import { View, TouchableOpacity } from "react-native";

// Custom import
import Text from "./Text";
import tw from "../lib/tailwind";

export interface WrapperProps {
  label?: string;
  style?: object;
  children?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onIconRightPress?: () => void;
  onIconLeftPress?: () => void;
  disabled?: boolean;
}

const Wrapper: React.FC<WrapperProps> = (props) => {
  return (
    <View>
      {props.label && (
        <Text style={tw`text-black mb-1`} category="c1" appearance="hint">
          {props.label}
        </Text>
      )}
      <View
        style={[
          tw` p-2 mb-1  border flex  bg-[#F2F2F2] border-[#006175]${
            props.disabled ? "border-opacity-400 bg-opacity-50" : ""
          }`,
          props.style,
        ]}
      >
        <View style={tw`flex py-1 flex-row items-center justify-between `}>
          <View style={tw`flex flex-row items-center justify-between `}>
            {props.iconLeft && (
              <TouchableOpacity
                onPress={props.disabled ? () => {} : props.onIconLeftPress}
              >
                {props.iconLeft}
              </TouchableOpacity>
            )}
            <View>{props.children}</View>
          </View>
          {props.iconRight && (
            <TouchableOpacity
              onPress={props.disabled ? undefined : props.onIconRightPress}
            >
              {props.iconRight}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

Wrapper.defaultProps = {
  iconLeft: null,
  iconRight: null,
  onIconRightPress: () => {},
  onIconLeftPress: () => {},
};
export default Wrapper;
