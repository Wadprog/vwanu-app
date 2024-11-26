import Checkbox from "expo-checkbox";
import React from "react";
import { useFormikContext } from "formik";
import { View } from "react-native";

import Error from "./Error";
import tw from "lib/tailwind";

interface Props {
  name: string;
  value: boolean;
  accesoryRight?: React.ReactNode;
}
const Switch: React.FC<Props> = ({ value, name, accesoryRight }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext<any>();
  return (
    <>
      <View style={tw`flex-1 flex flex-row items-center`}>
        <Checkbox
          value={values[name] || false}
          onValueChange={(val) => {
            setFieldValue(name, val);
          }}
          color="#4630EB"
        />
        {accesoryRight && accesoryRight}
      </View>
      <Error
        error={typeof errors[name] === "string" ? errors[name] : undefined}
        visible={typeof touched[name] === "boolean" ? touched[name] : false}
      />
    </>
  );
};

export default Switch;
