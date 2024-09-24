import { useTranslation } from "react-i18next";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";

const Chat = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-5">
        <Text className="font-JakartaBold text-2xl">{t("chat.title")}</Text>
        <View className="flex h-fit flex-1 items-center justify-center">
          <Image
            source={images.message}
            alt="message"
            className="h-40 w-full"
            resizeMode="contain"
          />
          <Text className="mt-3 font-JakartaBold text-3xl">
            {t("chat.no-messages")}
          </Text>
          <Text className="mt-2 px-7 text-center text-base">
            {t("chat.start-conversation")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;
