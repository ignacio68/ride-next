import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, Image } from "react-native";

import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";

import CustomButton from "./CustomButton";

const OAuth = () => {
  const { t } = useTranslation();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handledGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);

      if (result.code === "session_exists" || result.code === "success") {
        router.push("/(root)/(tabs)/home");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View>
      <View className="mt-4 flex flex-row items-center justify-center gap-x-3">
        <View className="h-[1px] flex-1 bg-general-100" />
        <Text className="text-lg">{t("oauth.or")}</Text>
        <View className="h-[1px] flex-1 bg-general-100" />
      </View>

      <CustomButton
        title={t("oauth.log-in-with-google")}
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="mx-2 h-5 w-5"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handledGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
