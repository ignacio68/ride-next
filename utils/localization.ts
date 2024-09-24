import { getLocales } from "expo-localization";

export const getLanguage = () => getLocales()[0].languageCode;

export const getCurrencyCode = () => getLocales()[0].currencyCode;

export const getTemperatureUnit = () => getLocales()[0].temperatureUnit;

export const getMeasurementSystem = () => getLocales()[0].measurementSystem;
