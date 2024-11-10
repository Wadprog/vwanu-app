import React from "react";
import { Input, InputProps } from "@ui-kitten/components";
import { TextInput } from "react-native";

import Wrapper, { WrapperProps } from "./InputsWrapper";

interface Props extends InputProps {
  label?: string;
  required?: boolean;
}

export type P = React.ComponentProps<typeof TextInput> & WrapperProps;

// type P = WrapperProps & Props

const AppInput: React.FC<P> = (props) => {
  const {
    label,
    iconLeft,
    iconRight,
    style,
    onIconLeftPress,
    onIconRightPress,
    ...rest
  } = props;
  return (
    <Wrapper
      label={label}
      iconLeft={iconLeft}
      iconRight={iconRight}
      style={style}
      onIconLeftPress={onIconLeftPress}
      onIconRightPress={onIconLeftPress}
    >
      <TextInput {...rest} />
    </Wrapper>
  );
};

export default AppInput;
