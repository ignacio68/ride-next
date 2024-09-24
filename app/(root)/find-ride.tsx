import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";

const FindRide = () => {
  const { t } = useTranslation();
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();
  return (
    <RideLayout title={t("find-ride.title")} snapPoints={["85%"]}>
      <View className="my-3">
        <Text className="mb-3 font-JakartaSemiBold text-lg">
          {t("find-ride.from")}
        </Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>

      <View className="my-3">
        <Text className="mb-3 font-JakartaSemiBold text-lg">
          {t("find-ride.to")}
        </Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>

      <CustomButton
        title={t("find-ride.find-now")}
        onPress={() => router.push("/(root)/confirm-ride")}
        className="mt-5"
      />
    </RideLayout>
  );
};

export default FindRide;
