import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

export function PortalHeader({ insets }) {
  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={["#1E293B", "#334155", "#475569"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 12,
          paddingHorizontal: 20,
          paddingBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#FFFFFF",
            fontFamily: "Montserrat_700Bold",
          }}
        >
          Portal do Cliente
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#D4AF37",
            marginTop: 4,
            fontFamily: "Montserrat_400Regular",
          }}
        >
          Gerencie seus seguros, pagamentos e sinistros
        </Text>
      </LinearGradient>
    </>
  );
}



