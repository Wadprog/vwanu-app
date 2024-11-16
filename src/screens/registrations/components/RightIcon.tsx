import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import tw from "../../../lib/tailwind";

const IconWithArrow: React.FC<{}> = () => (
  <MaterialCommunityIcons
    name="chevron-right"
    size={24}
    color={tw.color("text-primary font-bold")}
    style={tw`-ml-4`}
  />
);

export default IconWithArrow;
