import { useEffect } from "react";
import { View, Text } from "react-native";
import { MotiView } from "moti";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { CheckCircle2, AlertCircle, Info, XCircle } from "lucide-react-native";
import {
  useFonts,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

export function Toast({
  type = "success",
  message,
  visible,
  onHide,
  duration = 3000,
}) {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        onHide?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onHide]);

  if (!visible || !fontsLoaded) return null;

  const config = {
    success: {
      icon: CheckCircle2,
      color: "#10B981",
      bgColor: "#DCFCE7",
    },
    error: {
      icon: XCircle,
      color: "#EF4444",
      bgColor: "#FEE2E2",
    },
    info: {
      icon: Info,
      color: "#3B82F6",
      bgColor: "#DBEAFE",
    },
    warning: {
      icon: AlertCircle,
      color: "#F59E0B",
      bgColor: "#FEF3C7",
    },
  };

  const { icon: Icon, color, bgColor } = config[type] || config.success;

  return (
    <MotiView
      from={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -20 }}
      transition={{ type: "timing", duration: 300 }}
      style={{
        position: "absolute",
        top: 60,
        left: 20,
        right: 20,
        zIndex: 9999,
      }}
    >
      <GlassView
        isInteractive={false}
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            borderRadius: 12,
            gap: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
          },
          isLiquidGlassAvailable()
            ? {}
            : { opacity: 0.95, backgroundColor: "#FFFFFF" },
        ]}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: bgColor,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={22} color={color} />
        </View>
        <Text
          style={{
            flex: 1,
            fontSize: 14,
            fontWeight: "600",
            color: "#1E293B",
            fontFamily: "Montserrat_600SemiBold",
          }}
        >
          {message}
        </Text>
      </GlassView>
    </MotiView>
  );
}



