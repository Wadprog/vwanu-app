import React from "react";

import Text from "../Text";
import tw from "../../lib/tailwind";

interface FormErrorProps {
  error?: string;
  visible?: boolean;
}
const FormError: React.FC<FormErrorProps> = ({ error, visible }) => {
  if (!visible || !error) return null;
  return <Text style={tw`text-danger -mt-5 mb-3`}>{error}</Text>;
};

export default FormError;
