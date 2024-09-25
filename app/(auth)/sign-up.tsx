import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import Modal from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
  const { t } = useTranslation();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });

        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed.",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.error[0].longMessage,
        state: "failed",
      });
    }
  };

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
            {t("sign-up.title")}
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label={t("sign-up.name")}
            placeholder={t("sign-up.name-placeholder")}
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label={t("sign-up.email")}
            placeholder={t("sign-up.email-placeholder")}
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
          />
          <CustomButton
            title={t("sign-up.sign-up")}
            onPress={onSignUpPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            href="/sign-in"
            className="mt-10 text-center text-lg text-general-200"
          >
            {t("sign-up.have-account")}
            <Text className="text-primary-500">{t("sign-up.login")}</Text>
          </Link>
        </View>
        <Modal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") setShowSuccessModal(true);
          }}
        >
          <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
            <Text className="mb-2 font-JakartaExtraBold text-2xl">
              {t("sign-up.verification")}
            </Text>
            <Text className="mb-5 font-Jakarta">
              {t("sign-up.send-code", { email: form.email })}
            </Text>
            <InputField
              label={t("sign-up.code")}
              icon={icons.lock}
              placeholder={t("sign-up.code-placeholder")}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="mt-1 text-sm text-red-500">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title={t("sign-up.verify-email")}
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </Modal>

        <Modal isVisible={showSuccessModal}>
          <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
            <Image
              source={images.check}
              className="mx-auto my-5 h-[110px] w-[110px]"
            />
            <Text className="text-center font-JakartaBold text-3xl">
              {t("sign-up.success-title")}
            </Text>
            <Text className="mt-2 text-center font-Jakarta text-base text-gray-400">
              {t("sign-up.verify-description")}
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => {
                setShowSuccessModal(false);
                router.push(`/(root)/(tabs)/home`);
              }}
              className="mt-5"
            />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
