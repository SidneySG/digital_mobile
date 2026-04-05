import { View, Text, TouchableOpacity } from "react-native";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { AlertTriangle, ChevronRight, XCircle } from "lucide-react-native";
import { MotiView } from "moti";
import { FilterButton } from "./FilterButton";
import { getClaimStatusIcon } from "@/utils/portal/helpers";

export function ClaimsSection({ filteredClaims, claimFilter, setClaimFilter }) {
  return (
    <View style={{ marginBottom: 24 }}>
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
        Sinistros Reportados
      </Text>

      <View
        style={{
          flexDirection: "row",
          gap: 8,
          marginBottom: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <FilterButton
          active={claimFilter === "all"}
          label="Todos"
          onPress={() => setClaimFilter("all")}
        />
        <FilterButton
          active={claimFilter === "pending"}
          label="Pendente"
          onPress={() => setClaimFilter("pending")}
        />
        <FilterButton
          active={claimFilter === "analysis"}
          label="Em Análise"
          onPress={() => setClaimFilter("analysis")}
        />
        <FilterButton
          active={claimFilter === "approved"}
          label="Aprovado"
          onPress={() => setClaimFilter("approved")}
        />
        <FilterButton
          active={claimFilter === "rejected"}
          label="Rejeitado"
          onPress={() => setClaimFilter("rejected")}
        />
      </View>

      <View style={{ gap: 12 }}>
        {filteredClaims.length === 0 ? (
          <View
            style={{
              backgroundColor: "#F8FAFC",
              padding: 32,
              borderRadius: 16,
              alignItems: "center",
            }}
          >
            <AlertTriangle size={48} color="#CBD5E1" />
            <Text
              style={{
                fontSize: 15,
                color: "#64748B",
                marginTop: 12,
                fontFamily: "Montserrat_400Regular",
                textAlign: "center",
              }}
            >
              Nenhum sinistro encontrado
            </Text>
          </View>
        ) : (
          filteredClaims.map((claim, index) => (
            <MotiView
              key={claim.id}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
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
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.06,
                      shadowRadius: 6,
                      elevation: 2,
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
                      marginBottom: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        backgroundColor:
                          claim.status === "Aprovado"
                            ? "#DCFCE7"
                            : claim.status === "Em análise"
                              ? "#FEF3C7"
                              : claim.status === "Rejeitado"
                                ? "#FEE2E2"
                                : "#F1F5F9",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {getClaimStatusIcon(claim.status)}
                    </View>

                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "700",
                            color: "#1E293B",
                            fontFamily: "Montserrat_700Bold",
                            flex: 1,
                          }}
                        >
                          {claim.claimNumber}
                        </Text>
                        <View
                          style={{
                            backgroundColor:
                              claim.status === "Aprovado"
                                ? "#DCFCE7"
                                : claim.status === "Em análise"
                                  ? "#FEF3C7"
                                  : claim.status === "Rejeitado"
                                    ? "#FEE2E2"
                                    : "#F1F5F9",
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 6,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: "600",
                              color:
                                claim.status === "Aprovado"
                                  ? "#16A34A"
                                  : claim.status === "Em análise"
                                    ? "#F59E0B"
                                    : claim.status === "Rejeitado"
                                      ? "#EF4444"
                                      : "#64748B",
                              fontFamily: "Montserrat_600SemiBold",
                            }}
                          >
                            {claim.status}
                          </Text>
                        </View>
                      </View>

                      <Text
                        style={{
                          fontSize: 13,
                          color: "#64748B",
                          fontFamily: "Montserrat_400Regular",
                          marginBottom: 2,
                        }}
                      >
                        {claim.type}
                      </Text>

                      <Text
                        style={{
                          fontSize: 12,
                          color: "#94A3B8",
                          fontFamily: "Montserrat_400Regular",
                        }}
                      >
                        Data do incidente: {claim.date}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      backgroundColor: "#F8FAFC",
                      padding: 12,
                      borderRadius: 10,
                      marginBottom: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        color: "#64748B",
                        fontFamily: "Montserrat_400Regular",
                        marginBottom: 4,
                      }}
                    >
                      Descrição
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#1E293B",
                        fontFamily: "Montserrat_400Regular",
                        marginBottom: 10,
                        lineHeight: 18,
                      }}
                    >
                      {claim.description}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontSize: 11,
                            color: "#64748B",
                            fontFamily: "Montserrat_400Regular",
                          }}
                        >
                          Valor Estimado
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "600",
                            color: "#1E293B",
                            fontFamily: "Montserrat_600SemiBold",
                          }}
                        >
                          {claim.amount}
                        </Text>
                      </View>

                      {claim.approvedAmount && (
                        <View style={{ alignItems: "flex-end" }}>
                          <Text
                            style={{
                              fontSize: 11,
                              color: "#64748B",
                              fontFamily: "Montserrat_400Regular",
                            }}
                          >
                            Valor Aprovado
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "600",
                              color: "#10B981",
                              fontFamily: "Montserrat_600SemiBold",
                            }}
                          >
                            {claim.approvedAmount}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {claim.rejectionReason && (
                    <View
                      style={{
                        backgroundColor: "#FEE2E2",
                        padding: 10,
                        borderRadius: 8,
                        marginBottom: 8,
                        flexDirection: "row",
                        gap: 8,
                      }}
                    >
                      <XCircle size={16} color="#EF4444" />
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 12,
                          color: "#991B1B",
                          fontFamily: "Montserrat_400Regular",
                        }}
                      >
                        {claim.rejectionReason}
                      </Text>
                    </View>
                  )}

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
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
                  </TouchableOpacity>
                </GlassView>
              </TouchableOpacity>
            </MotiView>
          ))
        )}
      </View>
    </View>
  );
}



