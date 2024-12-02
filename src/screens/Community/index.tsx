import { View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Tab, TabBar } from "@ui-kitten/components";

import tw from "lib/tailwind";
import Text from "components/Text";
import Screen from "components/screen";
import Community from "components/community";
import { useFetchInterestsQuery } from "store/interests";
import { useFetchCommunityQuery } from "store/community";
import Link from "components/Link";
import routes from "navigation/routes";
import MenuTop from "components/MenuTop";

const { width } = Dimensions.get("screen");

const CommunityScreen = () => {
  const interests = useFetchInterestsQuery();
  const [tabIndex, selectedTabindex] = React.useState<number>(0);
  const [selectedInterest, setSelectedInterest] = React.useState(
    interests?.data?.[0]?.name || ""
  );
  const communities = useFetchCommunityQuery();
  return (
    <Screen>
      <View style={tw`my-2`}>
        <MenuTop titles={["All", "Mine"]} onSelectTab={selectedTabindex} />
      </View>

      <View style={{ marginBottom: 15 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={interests.data || []}
          renderItem={({ item }) => (
            <NavElement
              name={item.name}
              selected={selectedInterest === item.name}
              onPress={() => {
                setSelectedInterest(item.name);
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={Divider}
        />
      </View>
      <View>
        <View style={tw`bg-red-500 rounded overflow-hidden`}>
          <FlatList
            horizontal
            pagingEnabled
            data={communities.data || []}
            renderItem={({ item }) => (
              <Community {...item} style={tw`w-[${width - 2}px]`} />
            )}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={Divider}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-2 mb-1`}>
          <Text category="h5" style={tw`text-gray-500 font-thin`}>
            Recents
          </Text>
          <Link text="see All" to={routes.HOME} />
        </View>

        <FlatList
          numColumns={2}
          data={communities.data || []}
          renderItem={({ item }) => (
            <Community {...item} size="medium" style={tw`w-[49%]`} />
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={Divider}
          contentContainerStyle={tw`gap-2`}
          columnWrapperStyle={tw`gap-2`}
        />
      </View>
    </Screen>
  );
};

const Divider = () => <View style={tw`mx-2`} />;
const NavElement: React.FC<{
  name: string;
  onPress: () => void;
  selected: boolean;
}> = ({ name, onPress, selected }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={tw`text-primary
         text-lg
        ${selected ? "underline" : ""}`}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};
export default CommunityScreen;
