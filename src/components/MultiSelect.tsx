import { View, FlatList } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { InputProps, Spinner, Divider } from "@ui-kitten/components";

// Custom import
import Text from "./Text";
import Modal from "./Modal";
import tw from "../lib/tailwind";
import Wrapper, { WrapperProps } from "./InputsWrapper";
import { SelecTableItems, PillSelect } from "./SelectedItems";
import useToggle from "../hooks/useToggle";

interface SelectProps extends InputProps {
  style?: object;
  items: Item[];
  placeholder?: string;
  label?: string;
  otherProps?: WrapperProps;
  isLoading?: boolean;
  onSelect: (items: Pick<ListItem, "value">[]) => void; // onOptionSelect
}
interface Item {
  label: string;
  value: string;
}

const LoadingIndicator: React.FC<{}> = () => (
  <View>
    <Spinner size="small" />
  </View>
);

const MultiSelect: React.FC<SelectProps> = ({
  items,
  placeholder,
  onSelect,
  isLoading,
  ...otherProps
}) => {
  const [modalVisible, toggleModalVisible] = useToggle(false);
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);

  const removeItem = (item: Item) => {
    const itemSelected = selectedItems.filter((i) => i !== item);
    setSelectedItems(itemSelected);
  };

  const addItem = (item: Item) => {
    const itemSelected = [...selectedItems, item];
    setSelectedItems(itemSelected);
  };

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
          {!selectedItems.length && (
            <Text style={tw`text-gray-400`}>
              {placeholder || "Selected area"}
            </Text>
          )}

          <View style={tw`flex flex-row flex-wrap`}>
            {selectedItems.map((item) => (
              <PillSelect
                item={item}
                onDeselect={removeItem}
                selected={selectedItems.includes(item)}
              />
            ))}
          </View>
        </View>

        <Modal
          visible={modalVisible}
          onClose={toggleModalVisible}
          onConfirm={() => {
            onSelect(selectedItems);
            toggleModalVisible();
          }}
        >
          <View style={[tw`px-2  py-5`]}>
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <SelecTableItems
                  item={item}
                  onSelect={addItem}
                  onDeselect={removeItem}
                  selected={selectedItems.includes(item)}
                />
              )}
              ItemSeparatorComponent={() => <Divider />}
            />
          </View>
        </Modal>
      </View>
    </Wrapper>
  );
};

export default MultiSelect;
