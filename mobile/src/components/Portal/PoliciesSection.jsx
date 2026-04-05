import { View, Text, TouchableOpacity } from "react-native";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { Download, Plus, Eye } from "lucide-react-native";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import { FilterButton } from "./FilterButton";
import { SkeletonPolicyCard } from "@/components/SkeletonLoader";
import { handleDownload } from "@/utils/portal/helpers";

export function PoliciesSection({
  filteredPolicies,
  policyFilter,
  setPolicyFilter,
  loading,
  showToast,
}) {
  const router = useRouter();

  return (
    <View style={{ marginBottom: 24 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
          position: "relative",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#1E293B",
            fontFamily: "Montserrat_700Bold",
            textAlign: "center",
          }}
        >
          Apólices Ativas
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/adicionar-apolice")}
          activeOpacity={0.7}
          style={{
            position: "absolute",
            right: 0,
            backgroundColor: "#2563EB",
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Plus size={18} color="#FFFFFF" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 8,
          marginBottom: 12,
          justifyContent: "center",
        }}
      >
        <FilterButton
          active={policyFilter === "all"}
          label="Todas"
          onPress={() => setPolicyFilter("all")}
        />
        <FilterButton
          active={policyFilter === "active"}
          label="Ativas"
          onPress={() => setPolicyFilter("active")}
        />
        <FilterButton
          active={policyFilter === "expired"}
          label="Expiradas"
          onPress={() => setPolicyFilter("expired")}
        />
      </View>

      <View style={{ gap: 12 }}>
        {loading ? (
          <>
            <SkeletonPolicyCard />
            <SkeletonPolicyCard />
          </>
        ) : (
          filteredPolicies.map((policy, index) => (
            <MotiView
              key={policy.id}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                type: "timing",
                duration: 300,
                delay: index * 100,
              }}
            >
              <GlassView
                isInteractive={false}
                style={[
                  {
                    padding: 18,
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
                {/* External policy badge */}
                {policy.is_external && (
                  <View
                    style={{
                      backgroundColor: "#F0F9FF",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 6,
                      alignSelf: "flex-start",
                      marginBottom: 8,
                      borderWidth: 1,
                      borderColor: "#BAE6FD",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "600",
                        color: "#0284C7",
                        fontFamily: "Montserrat_600SemiBold",
                      }}
                    >
                      📁 Apólice Externa
                    </Text>
                  </View>
                )}

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#1E293B",
                        fontFamily: "Montserrat_700Bold",
                      }}
                    >
                      {policy.type}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#64748B",
                        marginTop: 2,
                        fontFamily: "Montserrat_400Regular",
                      }}
                    >
                      {policy.policy}
                    </Text>
                    {/* Show external insurer name if applicable */}
                    {policy.is_external && policy.external_insurer_name && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#0284C7",
                          marginTop: 4,
                          fontFamily: "Montserrat_500Medium",
                        }}
                      >
                        {policy.external_insurer_name}
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      backgroundColor:
                        policy.status === "Ativa"
                          ? "#DCFCE7"
                          : policy.status === "Expirada"
                            ? "#FEE2E2"
                            : "#FEF3C7",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color:
                          policy.status === "Ativa"
                            ? "#16A34A"
                            : policy.status === "Expirada"
                              ? "#DC2626"
                              : "#F59E0B",
                        fontFamily: "Montserrat_600SemiBold",
                      }}
                    >
                      {policy.status}
                    </Text>
                  </View>
                </View>

                {/* Valor segurado e Prémio */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
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
                      Valor Segurado
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        color: "#1E293B",
                        fontFamily: "Montserrat_600SemiBold",
                      }}
                    >
                      {policy.value}
                    </Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text
                      style={{
                        fontSize: 11,
                        color: "#64748B",
                        fontFamily: "Montserrat_400Regular",
                      }}
                    >
                      Prémio
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        color: "#2563EB",
                        fontFamily: "Montserrat_600SemiBold",
                      }}
                    >
                      {policy.premium}
                    </Text>
                  </View>
                </View>

                {/* Datas e frequência de pagamento */}
                <View
                  style={{
                    backgroundColor: "#F8FAFC",
                    padding: 10,
                    borderRadius: 8,
                    marginBottom: 12,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#64748B",
                        fontFamily: "Montserrat_400Regular",
                      }}
                    >
                      Início
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: "#1E293B",
                        fontFamily: "Montserrat_600SemiBold",
                      }}
                    >
                      {policy.startDate}
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#64748B",
                        fontFamily: "Montserrat_400Regular",
                      }}
                    >
                      Validade
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: "#1E293B",
                        fontFamily: "Montserrat_600SemiBold",
                      }}
                    >
                      {policy.expiry}
                    </Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#64748B",
                        fontFamily: "Montserrat_400Regular",
                      }}
                    >
                      Pagamento
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: "#1E293B",
                        fontFamily: "Montserrat_600SemiBold",
                        textTransform: "capitalize",
                      }}
                    >
                      {policy.payment_frequency}
                    </Text>
                  </View>
                </View>

                {/* Action buttons */}
                <View style={{ flexDirection: "row", gap: 8 }}>
                  {/* View Document button - shown if certificate_url exists */}
                  {policy.certificate_url && (
                    <TouchableOpacity
                      onPress={() => {
                        router.push({
                          pathname: "/visualizar-documento",
                          params: {
                            url: policy.certificate_url,
                            policyNumber: policy.policy,
                          },
                        });
                      }}
                      activeOpacity={0.7}
                      style={{
                        flex: 1,
                        backgroundColor: "#F0F9FF",
                        padding: 12,
                        borderRadius: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        borderWidth: 1,
                        borderColor: "#BAE6FD",
                      }}
                    >
                      <Eye size={18} color="#0284C7" />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "600",
                          color: "#0284C7",
                          fontFamily: "Montserrat_600SemiBold",
                        }}
                      >
                        Ver Documento
                      </Text>
                    </TouchableOpacity>
                  )}

                  {/* Download PDF button - shown for non-external policies */}
                  {!policy.is_external && (
                    <TouchableOpacity
                      onPress={() =>
                        handleDownload(policy.pdfUrl, policy.policy, showToast)
                      }
                      activeOpacity={0.7}
                      style={{
                        flex: policy.certificate_url ? 1 : undefined,
                        backgroundColor: "#EFF6FF",
                        padding: 12,
                        borderRadius: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}
                    >
                      <Download size={18} color="#2563EB" />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "600",
                          color: "#2563EB",
                          fontFamily: "Montserrat_600SemiBold",
                        }}
                      >
                        Baixar Certificado
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </GlassView>
            </MotiView>
          ))
        )}
      </View>
    </View>
  );
}



