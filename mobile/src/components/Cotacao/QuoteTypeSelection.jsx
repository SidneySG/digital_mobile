import { View, Text, TouchableOpacity } from "react-native";
import { TrendingDown, Building2 } from "lucide-react-native";
import { QUOTE_TYPES } from "@/utils/cotacao/constants";

export function QuoteTypeSelection({ quoteType, onSelectQuoteType }) {
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
        Como pretende cotação?
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "#64748B",
          marginBottom: 20,
          fontFamily: "Poppins_400Regular",
        }}
      >
        Escolha a melhor opção para si
      </Text>

      <View style={{ gap: 16 }}>
        <TouchableOpacity
          onPress={() => onSelectQuoteType(QUOTE_TYPES.BEST_PRICE)}
          activeOpacity={0.7}
        >
          <View
            style={{
              padding: 20,
              borderRadius: 16,
              backgroundColor:
                quoteType === QUOTE_TYPES.BEST_PRICE ? "#EFF6FF" : "#FFFFFF",
              borderWidth: 2,
              borderColor:
                quoteType === QUOTE_TYPES.BEST_PRICE ? "#2563EB" : "#E2E8F0",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 16,
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: "#10B981",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TrendingDown size={24} color="#FFFFFF" />
              </View>
              <Text
                style={{
                  flex: 1,
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#1E293B",
                  fontFamily: "Poppins_700Bold",
                }}
              >
                Melhor Preço
              </Text>
              {quoteType === QUOTE_TYPES.BEST_PRICE && (
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
            <Text
              style={{
                fontSize: 14,
                color: "#64748B",
                fontFamily: "Poppins_400Regular",
                lineHeight: 20,
              }}
            >
              Comparamos todas as seguradoras para encontrar o melhor preço para
              si
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectQuoteType(QUOTE_TYPES.PREFERRED_INSURER)}
          activeOpacity={0.7}
        >
          <View
            style={{
              padding: 20,
              borderRadius: 16,
              backgroundColor:
                quoteType === QUOTE_TYPES.PREFERRED_INSURER
                  ? "#EFF6FF"
                  : "#FFFFFF",
              borderWidth: 2,
              borderColor:
                quoteType === QUOTE_TYPES.PREFERRED_INSURER
                  ? "#2563EB"
                  : "#E2E8F0",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 16,
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: "#8B5CF6",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Building2 size={24} color="#FFFFFF" />
              </View>
              <Text
                style={{
                  flex: 1,
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#1E293B",
                  fontFamily: "Poppins_700Bold",
                }}
              >
                Seguradora Preferida
              </Text>
              {quoteType === QUOTE_TYPES.PREFERRED_INSURER && (
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
            <Text
              style={{
                fontSize: 14,
                color: "#64748B",
                fontFamily: "Poppins_400Regular",
                lineHeight: 20,
              }}
            >
              Escolha a sua seguradora de preferência e obtenha cotação directa
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}



