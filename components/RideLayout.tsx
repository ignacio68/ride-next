import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Pressable, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { icons } from "@/constants";

import Map from "./Map";

const RideLayout = ({
  title,
  children,
  snapPoints,
}: {
  title: string;
  children: React.ReactNode;
  snapPoints?: string[];
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { t } = useTranslation();

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex h-screen flex-col bg-blue-500">
          <View className="absolute top-16 z-10 flex flex-row items-center justify-start px-5">
            <Pressable onPress={() => router.back()}>
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white">
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="h-6 w-6"
                />
              </View>
            </Pressable>
            <Text className="ml-5 font-JakartaSemiBold text-xl">
              {title || t("ride-layout.back")}
            </Text>
          </View>
          <Map />
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["40%", "85%"]}
          index={0}
          keyboardBehavior="extend"
        >
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
