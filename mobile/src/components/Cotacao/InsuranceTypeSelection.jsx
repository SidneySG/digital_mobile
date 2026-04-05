import { View, Text, TouchableOpacity } from "react-native";
import { INSURANCE_TYPES } from "@/utils/cotacao/constants";

export function InsuranceTypeSelection({ selectedTypes, onToggleType }) {
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: "#1E293B",
          marginBottom: 8,
          fontFamily: "Poppins_700Bold",
        }}
      >
        Escolha os Tipos de Seguro
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "#64748B",
          marginBottom: 20,
          fontFamily: "Poppins_400Regular",
        }}
      >
        Pode selecionar múltiplos seguros
      </Text>

      <View style={{ gap: 12 }}>
        {INSURANCE_TYPES.map((insurance) => {
          const IconComponent = insurance.icon;
          const isSelected = selectedTypes.includes(insurance.id);
          return (
            <TouchableOpacity
              key={insurance.id}
              onPress={() => onToggleType(insurance.id)}
              activeOpacity={0.7}
            >
              <View
                style={{
                  padding: 18,
                  borderRadius: 16,
                  backgroundColor: isSelected ? "#EFF6FF" : "#FFFFFF",
                  borderWidth: 2,
                  borderColor: isSelected ? "#2563EB" : "#E2E8F0",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: insurance.color,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconComponent size={24} color="#FFFFFF" />
                </View>

                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#1E293B",
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  {insurance.title}
                </Text>

                {isSelected && (
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: "#2563EB",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "#FFFFFF", fontSize: 16 }}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}



