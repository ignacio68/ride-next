import { ImageSourcePropType, View, Image } from "react-native";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  // <View
  //   className={`flex flex-row items-center justify-center rounded-full ${focused ? "bg-general-300" : ""}`}
  // >
  <View
    className={`flex h-12 w-12 flex-row items-center justify-center rounded-full ${focused ? "bg-general-400" : "bg-transparent"}`}
  >
    <Image
      source={source}
      tintColor="white"
      resizeMode="contain"
      className="h-7 w-7"
    />
  </View>
  // </View>
);

export default TabIcon;
