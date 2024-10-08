import { router } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";

const Home = () => {
  const { t } = useTranslation();
  const { top, bottom } = useSafeAreaInsets();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <View
      className="mx-4 flex h-full items-center justify-between"
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      <Pressable
        testID="welcome_skip"
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="flex w-full items-end justify-end p-5"
      >
        <Text className="text-md font-JakartaBold text-black">
          {t("welcome.skip")}
        </Text>
      </Pressable>

      <Swiper
        testID="welcome_swiper"
        ref={swiperRef}
        loop={false}
        dot={
          <View className="mx-1 h-[4px] w-[32px] rounded-full bg-[#E2E8F0]" />
        }
        activeDot={
          <View className="mx-1 h-[4px] w-[32px] rounded-full bg-[#0286FF]" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              testID={`welcome_swiper_image_${item.id}`}
              source={item.image}
              className="h-[300px] w-full"
              resizeMode="contain"
            />
            <View className="mt-10 flex w-full flex-row items-center justify-center">
              <Text className="mx-10 text-center text-3xl font-bold text-black">
                {t(item.title)}
              </Text>
            </View>
            <Text className="text-md mx-10 mt-3 text-center font-JakartaSemiBold text-[#858585]">
              {t(item.description)}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        testID="welcome_button"
        title={
          isLastSlide
            ? t("welcome.button.get-started")
            : t("welcome.button.sign-up")
        }
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        className="mb-5 mt-10 w-11/12"
      />
    </View>
  );
};

export default Home;
