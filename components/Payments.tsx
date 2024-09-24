import { useAuth } from "@clerk/clerk-expo";
import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View, Image, Text } from "react-native";
import ReactNativeModal from "react-native-modal";

import { images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { PaymentProps } from "@/types/type";

import CustomButton from "./CustomButton";

const Payments = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { t } = useTranslation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { userId } = useAuth();
  const [success, setSuccess] = useState(false);
  const {
    userAddress,
    userLatitude,
    userLongitude,
    destinationAddress,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "RideNext Inc.",
      intentConfiguration: {
        mode: {
          amount: parseInt(amount) * 100,
          currencyCode: "EUR",
        },
        confirmHandler: async (paymentMethod, _, intentCreationCallback) => {
          const { paymentIntent, customer } = await fetchAPI(
            "/(api)/(stripe)/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: fullName || email.split("@")[0],
                email,
                amount,
                paymentMethod: paymentMethod.id,
              }),
            },
          );

          if (paymentIntent.client_secret) {
            const { result } = await fetchAPI(`/(api)/(stripe)/pay`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                payment_method_id: paymentMethod.id,
                payment_intent_id: paymentIntent.id,
                customer_id: customer,
              }),
            });

            if (result.client_secret) {
              await fetchAPI("/(api)/ride/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  origin_address: userAddress,
                  destination_address: destinationAddress,
                  origin_latitude: userLatitude,
                  origin_longitude: userLongitude,
                  destination_latitude: destinationLatitude,
                  destination_longitude: destinationLongitude,
                  ride_time: rideTime.toFixed(0),
                  fare_price: parseInt(amount) * 100,
                  payment_status: "paid",
                  driver_id: driverId,
                  user_id: userId,
                }),
              });

              intentCreationCallback({ clientSecret: result.client_secret });
            }
          }
        },
      },
      returnURL: "myapp://book-ride",
    });
    console.log(error);
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <>
      <CustomButton
        title={t("payments.confirm-ride")}
        className="my-10"
        onPress={openPaymentSheet}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center rounded-2xl bg-white p-7">
          <Image source={images.check} className="mt-5 h-28 w-28" />

          <Text className="mt-5 text-center font-JakartaBold text-2xl">
            {t("payments.successfully-booked")}
          </Text>

          <Text className="text-md font-JakartaRegular mt-3 text-center text-general-200">
            {t("payments.text")}
          </Text>

          <CustomButton
            title={t("payments.back")}
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payments;
