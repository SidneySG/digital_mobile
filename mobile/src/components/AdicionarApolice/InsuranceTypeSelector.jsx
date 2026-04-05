import { View, Text, TouchableOpacity } from "react-native";
import { Shield, Check } from "lucide-react-native";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";

export function InsuranceTypeSelector({ types, selectedId, onSelect, error }) {
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
        <Shield size={18} color="#64748B" />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: "#1E293B",
            fontFamily: "Montserrat_600SemiBold",
          }}
        >
          Tipo de Seguro *
        </Text>
      </View>
      <View style={{ gap: 8 }}>
        {types.map((type) => (
          <TouchableOpacity
            key={type.id}
            onPress={() => onSelect(type.id)}
            activeOpacity={0.7}
          >
            <GlassView
              isInteractive={true}
              style={[
                {
                  padding: 14,
                  borderRadius: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
                isLiquidGlassAvailable()
                  ? {}
                  : {
                      backgroundColor:
                        selectedId === type.id ? "#EFF6FF" : "#FFFFFF",
                      borderWidth: 1,
                      borderColor:
                        selectedId === type.id ? "#2563EB" : "#E2E8F0",
                    },
              ]}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: selectedId === type.id ? "600" : "400",
                  color: selectedId === type.id ? "#2563EB" : "#1E293B",
                  fontFamily:
                    selectedId === type.id
                      ? "Montserrat_600SemiBold"
                      : "Montserrat_400Regular",
                }}
              >
                {type.name}
              </Text>
              {selectedId === type.id && <Check size={20} color="#2563EB" />}
            </GlassView>
          </TouchableOpacity>
        ))}
      </View>
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



