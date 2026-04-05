import { View, Text, TextInput } from "react-native";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";

export function InsuredValueField({ value, onChange, error }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: "#1E293B",
          marginBottom: 8,
          fontFamily: "Montserrat_600SemiBold",
        }}
      >
        Valor Segurado (MZN) *
      </Text>
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
          placeholder="0.00"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
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



