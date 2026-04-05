import { View, Text, TextInput } from "react-native";
import { FileText } from "lucide-react-native";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";

export function PolicyNumberField({ value, onChange, error }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <FileText size={18} color="#64748B" />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: "#1E293B",
            fontFamily: "Montserrat_600SemiBold",
          }}
        >
          Número da Apólice *
        </Text>
      </View>
      <GlassView
        isInteractive={false}
        style={[
          {
            borderRadius: 12,
            overflow: "hidden",
          },
          isLiquidGlassAvailable()
            ? {}
            : {
                backgroundColor: "#FFFFFF",
                borderWidth: 1,
                borderColor: error ? "#EF4444" : "#E2E8F0",
              },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="Ex: POL-2024-001234"
          placeholderTextColor="#94A3B8"
          style={{
            padding: 14,
            fontSize: 15,
            color: "#1E293B",
            fontFamily: "Montserrat_400Regular",
          }}
        />
      </GlassView>
      {error && (
        <Text
          style={{
            fontSize: 12,
            color: "#EF4444",
            marginTop: 4,
            fontFamily: "Montserrat_400Regular",
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}



