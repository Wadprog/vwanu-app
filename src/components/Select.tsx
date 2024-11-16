import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Divider, InputProps, Spinner } from "@ui-kitten/components";

// Custom import
import Text from "./Text";
import Modal from "./Modal";
import tw from "../lib/tailwind";
import Wrapper, { WrapperProps } from "./InputsWrapper";
import useToggle from "../hooks/useToggle";

interface OptionProps {
  label: string;
  onPress: () => void;
}
const Option: React.FC<OptionProps> = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={tw`p-2 my-1 `}>
      <Text style={tw`text-primary`}>{label}</Text>
    </View>
  </TouchableOpacity>
);

interface SelectProps extends InputProps {
  style?: object;
  items: ListItem[];
  placeholder?: string;
  label?: string;
  otherProps?: WrapperProps;
  isLoading?: boolean;
  onSelect: (value: string) => void; // onOptionSelect
}

const LoadingIndicator: React.FC<{}> = () => (
  <View>
    <Spinner size="small" />
  </View>
);

const Select: React.FC<SelectProps> = ({
  items,
  placeholder,
  onSelect,
  isLoading,
  ...otherProps
}) => {
  const [modalVisible, toggleModalVisible] = useToggle(false);
  const [selectedItem, setSelectedItem] = React.useState<ListItem | null>(null);

  return (
    <Wrapper
      disabled={isLoading}
      iconRight={
        isLoading ? (
          <LoadingIndicator />
        ) : (
          <MaterialCommunityIcons name="chevron-down" size={24} />
        )
      }
      onIconRightPress={toggleModalVisible}
      {...otherProps}
    >
      <View>
        <View>
          {selectedItem ? (
            <Text category="p1" style={tw`text-gray-500`}>
              {selectedItem.label}
            </Text>
          ) : (
            <Text category="c1" appearance="hint" style={tw`text-gray-400  `}>
              {placeholder || "Pick an option"}
            </Text>
          )}
        </View>

        <Modal
          withMenu={false}
          visible={modalVisible}
          onClose={toggleModalVisible}
        >
          <View style={tw`p-3 pb-10`}>
            <FlatList
              data={items}
              ItemSeparatorComponent={() => <Divider />}
              renderItem={({ item }) => (
                <Option
                  label={item.label}
                  onPress={() => {
                    setSelectedItem(item);
                    onSelect(item.value);
                    toggleModalVisible();
                  }}
                />
              )}
              keyExtractor={(item) => item.label + item.value}
            />
          </View>
        </Modal>
      </View>
    </Wrapper>
  );
};

export default Select;
