import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  Platform,
} from "react-native";

import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  icon,
  iconRight,
  iconRightPress,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`mb-3 font-JakartaSemiBold text-lg ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`relative flex flex-row items-center justify-start rounded-full border border-neutral-100 bg-neutral-100 focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`ml-4 h-6 w-6 ${iconStyle}`} />
            )}
            <TextInput
              className={`flex-1 rounded-full p-4 text-left font-JakartaSemiBold text-[15px] ${inputStyle}`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
            {iconRight && (
              <Pressable onPress={iconRightPress}>
                <Image
                  source={iconRight}
                  className={`mr-4 h-6 w-6 ${iconStyle}`}
                />
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default InputField;
