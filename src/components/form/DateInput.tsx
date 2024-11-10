/* eslint-disable operator-linebreak */
import React from "react";
import { useFormikContext } from "formik";
import { TouchableOpacity } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const Icon = () => (
  <MaterialCommunityIcons name="calendar" size={24} color="black" />
);
// Custom dependencies
import Error from "./Error";
import tw from "../../lib/tailwind";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "../Modal";
import Wrapper from "../InputsWrapper";
import useToggle from "../../hooks/useToggle";
import Text from "../Text";
import FieldParams from "./fieldParams";

interface DateInputProps extends FieldParams {
  name: string;
  style?: object;
}
const DateInput: React.FC<DateInputProps> = ({
  name,
  label,
  style,
  ...otherProps
}) => {
  const [showModal, toggleModal] = useToggle(false);
  const [date, setDate] = React.useState(new Date());
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext<any>();

  const handleDateChange = (_: DateTimePickerEvent, new_date?: Date) => {
    if (!new_date) return;
    setDate(new Date(new_date));
    setFieldValue(name, new_date);
  };
  return (
    <>
      <TouchableOpacity
        onBlur={() => setFieldTouched(name)}
        onPress={toggleModal}
      >
        <Wrapper iconLeft={<Icon />} label={label} style={style}>
          <Text style={tw`text-black`}>{date.toDateString()}</Text>
        </Wrapper>
      </TouchableOpacity>

      <Modal visible={showModal} onClose={toggleModal} onConfirm={toggleModal}>
        <DateTimePicker
          display="spinner"
          value={date}
          mode="date"
          onChange={handleDateChange}
          {...otherProps}
        />
      </Modal>

      <Error
        error={typeof errors[name] === "string" ? errors[name] : undefined}
        visible={typeof touched[name] === "boolean" ? touched[name] : false}
      />
    </>
  );
};

export default DateInput;
