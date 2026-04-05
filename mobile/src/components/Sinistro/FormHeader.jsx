import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft } from "lucide-react-native";

export function FormHeader({ policyNumber, onBack }) {
  const insets = useSafeAreaInsets();

  return (
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
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <TouchableOpacity onPress={onBack}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#FFFFFF",
              fontFamily: "Poppins_700Bold",
            }}
          >
            Reportar Sinistro
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#D4AF37",
              marginTop: 2,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Apólice: {policyNumber}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}



