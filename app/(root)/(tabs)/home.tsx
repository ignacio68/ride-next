import { useAuth, useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import {
  FlatList,
  View,
  Image,
  Text,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { UserLocation } from "@/types/type";

export default function Page() {
  const { t } = useTranslation();
  const { user } = useUser();
  const { signOut } = useAuth();
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const { data: recentRides, loading } = useFetch(`/(api)/ride/${user?.id}`);
  const [hasPermission, setHasPermission] = useState(false);

  const handleSignOut = () => {
    signOut();

    router.replace("/(auth)/sign-in");
  };

  const handleDestinationPress = (location: UserLocation) => {
    setDestinationLocation(location);

    router.push("/(root)/find-ride");
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        // latitude: location.coords?.latitude,
        // longitude: location.coords?.longitude,
        latitude: 37.78825,
        longitude: -122.4324,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);

  const getName = () =>
    user?.firstName || user?.emailAddresses[0].emailAddress.split("@")[0];

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="h-40 w-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">{t("home.no-rides")}</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            <View className="my-5 flex flex-row items-center justify-between">
              <Text className="font-JakartaExtraBold text-2xl capitalize">
                {t("home.welcome", { userName: getName() })}
              </Text>
              <Pressable
                onPress={handleSignOut}
                className="h-10 w-10 items-center justify-center rounded-full bg-white"
              >
                <Image source={icons.out} className="h-4 w-4" />
              </Pressable>
            </View>

            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            <>
              <Text className="mb-3 mt-5 font-JakartaBold text-xl">
                {t("home.current-location")}
              </Text>
              <View className="flex h-[300px] flex-1 flex-row items-center bg-transparent">
                <Map />
              </View>
            </>

            <Text className="mb-3 mt-5 font-JakartaBold text-xl">
              {t("home.recent-rides")}
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
}
