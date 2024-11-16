/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";

import { Button, ButtonProps } from "@ui-kitten/components";

// Custom dependencies
import Text from "./Text";
import tw from "../lib/tailwind";

export interface BtnProps extends ButtonProps {
  title: string;
  textStyle?: object;
}

const Btn: React.FC<BtnProps> = ({
  title,
  onPress,
  textStyle = undefined,
  ...props
}) => {
  return (
    <>
      {title ? (
        <Button onPress={onPress} {...props}>
          {textStyle ? (
            <Text style={[tw`text-black`, textStyle]}>{title}</Text>
          ) : (
            <Text style={[tw`text-black`]}>{title}</Text>
          )}
        </Button>
      ) : (
        Button
      )}
    </>
  );
};

export default Btn;
