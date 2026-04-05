import { Platform } from "react-native";
import {
  NativeTabs,
  Icon,
  Label,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
// import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { useLanguageStore } from "@/utils/language/store";
import { useTranslation } from "@/utils/language/useTranslation";

export default function TabLayout() {
  const { loadLanguage, language } = useLanguageStore();
  const { t } = useTranslation();

  useEffect(() => {
    loadLanguage();
  }, []);

  console.log("Load tabs icon")

  return (
    <NativeTabs
      labelStyle={{ color: "#2563EB" }}
      tintColor="#2563EB"
      key={language}
    >
      <NativeTabs.Trigger name="index">
        <Label selectedStyle={{ color: "#2563EB" }}>{t("tabs.home")}</Label>
        {Platform.select({
          ios: <Icon sf="house.fill" selectedColor="#2563EB" />,
          default: (
            <Icon
              src={
                <VectorIcon
                  family={Ionicons}
                  name="home"
                  selectedColor="#2563EB"
                />
              }
            />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="portal">
        <Label selectedStyle={{ color: "#2563EB" }}>{t("tabs.portal")}</Label>
        {Platform.select({
          ios: <Icon sf="person.fill" selectedColor="#2563EB" />,
          default: (
            <Icon
              src={
                <VectorIcon
                  family={Ionicons}
                  name="person"
                  selectedColor="#2563EB"
                />
              }
            />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="tributacao">
        <Label selectedStyle={{ color: "#2563EB" }}>{t("tabs.taxation")}</Label>
        {Platform.select({
          ios: <Icon sf="building.2.fill" selectedColor="#2563EB" />,
          default: (
            <Icon
              src={
                <VectorIcon
                  family={Ionicons}
                  name="business"
                  selectedColor="#2563EB"
                />
              }
            />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="sinistro">
        <Label
          style={{ color: "#EF4444" }}
          selectedStyle={{ color: "#EF4444" }}
        >
          {t("tabs.claim")}
        </Label>
        {Platform.select({
          ios: (
            <Icon
              sf="exclamationmark.triangle.fill"
              color="#EF4444"
              selectedColor="#EF4444"
            />
          ),
          default: (
            <Icon
              src={
                <VectorIcon
                  family={Ionicons}
                  name="warning"
                  color="#EF4444"
                  selectedColor="#EF4444"
                />
              }
            />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="perfil">
        <Label selectedStyle={{ color: "#2563EB" }}>{t("tabs.profile")}</Label>
        {Platform.select({
          ios: <Icon sf="gearshape.fill" selectedColor="#2563EB" />,
          default: (
            <Icon
              src={
                <VectorIcon
                  family={Ionicons}
                  name="settings"
                  selectedColor="#2563EB"
                />
              }
            />
          ),
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}



