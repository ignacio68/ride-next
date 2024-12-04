import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";

const SignIn = () => {
  const { t } = useTranslation();
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, signIn, form.email, form.password, setActive, router]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-[250px] w-full">
          <Image source={images.signUpCar} className="z-0 h-[250px] w-full" />
          <Text className="absolute bottom-5 left-5 font-JakartaSemiBold text-2xl text-black">
            {t("sign-in.title")}
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label={t("sign-in.email")}
            placeholder={t("sign-in.email-placeholder")}
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label={t("sign-in.password")}
            placeholder={t("sign-in.password-placeholder")}
            icon={icons.lock}
            iconRight={isPasswordVisible ? icons.eye : icons.eyecross}
            iconRightPress={handleTogglePasswordVisibility}
            value={form.password}
            secureTextEntry={isPasswordVisible}
            onChangeText={(value) => setForm({ ...form, password: value })}
            testID="toggle-password-visibility"
          />
          <CustomButton
            title={t("sign-in.sign-in")}
            onPress={onSignInPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            href="/sign-up"
            className="mt-10 text-center text-lg text-general-200"
          >
            {t("sign-in.have-account")}
            <Text className="text-primary-500"> {t("sign-in.sign-up")}</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
