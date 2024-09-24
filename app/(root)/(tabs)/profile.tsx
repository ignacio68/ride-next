import { useUser } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "@/components/InputField";

const Profile = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="my-5 font-JakartaBold text-2xl">
          {t("profile.title")}
        </Text>

        <View className="my-5 flex items-center justify-center">
          <Image
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className="h-[110px] w-[110px] rounded-full border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </View>

        <View className="flex flex-col items-start justify-center rounded-lg bg-white px-5 py-3 shadow-sm shadow-neutral-300">
          <View className="flex w-full flex-col items-start justify-start">
            <InputField
              label={t("profile.first-name")}
              placeholder={user?.firstName || t("profile.not-found")}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label={t("profile.last-name")}
              placeholder={user?.lastName || t("profile.not-found")}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label={t("profile.email")}
              placeholder={
                user?.primaryEmailAddress?.emailAddress ||
                t("profile.not-found")
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label={t("profile.phone")}
              placeholder={
                user?.primaryPhoneNumber?.phoneNumber || t("profile.not-found")
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
