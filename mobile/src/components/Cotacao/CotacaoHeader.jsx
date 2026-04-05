import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft } from "lucide-react-native";
import { Image } from "expo-image";

export function CotacaoHeader({ insets, step, totalSteps, onBack }) {
  return (
    <LinearGradient
      colors={["#1E293B", "#334155", "#475569"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        paddingTop: insets.top + 16,
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <TouchableOpacity onPress={onBack}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronLeft size={24} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <Image
          source={{
            uri: "https://ucarecdn.com/2091d9c0-64a7-4090-971e-29b73b16e99e/-/format/auto/",
          }}
          style={{ width: 100, height: 100 }}
          contentFit="contain"
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#FFFFFF",
              fontFamily: "Poppins_700Bold",
              lineHeight: 26,
            }}
          >
            Pedir Cotação
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#D4AF37",
              marginTop: 4,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Passo {step} de {totalSteps}
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View
        style={{
          height: 4,
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: 2,
          marginTop: 16,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: "100%",
            width: `${(step / totalSteps) * 100}%`,
            backgroundColor: "#D4AF37",
          }}
        />
      </View>
    </LinearGradient>
  );
}



