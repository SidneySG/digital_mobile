import { View, Text, TouchableOpacity } from "react-native";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { Clock, ChevronRight } from "lucide-react-native";
import { MotiView } from "moti";

export function QuotesSection({ pendingQuotes }) {
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: "#1E293B",
          fontFamily: "Montserrat_700Bold",
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        Cotações Solicitadas
      </Text>

      <View style={{ gap: 12 }}>
        {pendingQuotes.map((quote, index) => (
          <MotiView
            key={quote.id}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: "timing",
              duration: 300,
              delay: index * 100,
            }}
          >
            <TouchableOpacity activeOpacity={0.7}>
              <GlassView
                isInteractive={true}
                style={[
                  {
                    padding: 16,
                    borderRadius: 16,
                  },
                  isLiquidGlassAvailable()
                    ? {}
                    : {
                        opacity: 0.9,
                        backgroundColor: "#FFFFFF",
                        borderWidth: 1,
                        borderColor: "#E2E8F0",
                      },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 12,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: "#FEF3C7",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Clock size={24} color="#F59E0B" />
                  </View>

                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "600",
                          color: "#1E293B",
                          fontFamily: "Montserrat_600SemiBold",
                          flex: 1,
                        }}
                      >
                        {quote.quote_type === "new"
                          ? "Nova Cotação"
                          : "Renovação"}
                      </Text>
                      <View
                        style={{
                          backgroundColor: "#FEF3C7",
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 6,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: "600",
                            color: "#F59E0B",
                            fontFamily: "Montserrat_600SemiBold",
                          }}
                        >
                          {quote.statusLabel}
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={{
                        fontSize: 13,
                        color: "#64748B",
                        marginBottom: 4,
                        fontFamily: "Montserrat_400Regular",
                      }}
                    >
                      {quote.full_name}
                    </Text>

                    <View
                      style={{
                        backgroundColor: "#F8FAFC",
                        padding: 8,
                        borderRadius: 6,
                        marginBottom: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          color: "#64748B",
                          fontFamily: "Montserrat_400Regular",
                          marginBottom: 2,
                        }}
                      >
                        Email: {quote.email}
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          color: "#64748B",
                          fontFamily: "Montserrat_400Regular",
                        }}
                      >
                        Telefone: {quote.phone}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 12,
                        color: "#94A3B8",
                        fontFamily: "Montserrat_400Regular",
                      }}
                    >
                      Solicitada em: {quote.formattedDate}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: 12,
                    backgroundColor: "#EFF6FF",
                    padding: 10,
                    borderRadius: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <ChevronRight size={16} color="#2563EB" />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: "#2563EB",
                      fontFamily: "Montserrat_600SemiBold",
                    }}
                  >
                    Ver Detalhes Completos
                  </Text>
                </View>
              </GlassView>
            </TouchableOpacity>
          </MotiView>
        ))}
      </View>
    </View>
  );
}



