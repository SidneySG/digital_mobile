import { View, Text, TouchableOpacity } from "react-native";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { CheckCircle2, FileText } from "lucide-react-native";
import { MotiView } from "moti";
import { FilterButton } from "./FilterButton";
import { SkeletonPaymentCard } from "@/components/SkeletonLoader";
import { handleDownload } from "@/utils/portal/helpers";

export function PaymentsSection({
  filteredPayments,
  paymentFilter,
  setPaymentFilter,
  loading,
  showToast,
}) {
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
        Pagamentos Recentes
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
          active={paymentFilter === "all"}
          label="Todos"
          onPress={() => setPaymentFilter("all")}
        />
        <FilterButton
          active={paymentFilter === "mpesa"}
          label="M-Pesa"
          onPress={() => setPaymentFilter("mpesa")}
        />
        <FilterButton
          active={paymentFilter === "card"}
          label="Cartão"
          onPress={() => setPaymentFilter("card")}
        />
        <FilterButton
          active={paymentFilter === "emola"}
          label="E-Mola"
          onPress={() => setPaymentFilter("emola")}
        />
      </View>

      <View style={{ gap: 12 }}>
        {loading ? (
          <>
            <SkeletonPaymentCard />
            <SkeletonPaymentCard />
            <SkeletonPaymentCard />
          </>
        ) : (
          filteredPayments.map((payment, index) => (
            <MotiView
              key={payment.id}
              from={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "timing",
                duration: 300,
                delay: index * 80,
              }}
            >
              <GlassView
                isInteractive={false}
                style={[
                  { padding: 16, borderRadius: 16 },
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
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor:
                        payment.status === "Pago"
                          ? "#DCFCE7"
                          : payment.status === "Pendente"
                            ? "#FEF3C7"
                            : "#FEE2E2",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircle2
                      size={24}
                      color={
                        payment.status === "Pago"
                          ? "#16A34A"
                          : payment.status === "Pendente"
                            ? "#F59E0B"
                            : "#EF4444"
                      }
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "600",
                            color: "#1E293B",
                            fontFamily: "Montserrat_600SemiBold",
                          }}
                        >
                          Pagamento de Prémio
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#64748B",
                            marginTop: 2,
                            fontFamily: "Montserrat_400Regular",
                          }}
                        >
                          {payment.date}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor:
                            payment.status === "Pago"
                              ? "#DCFCE7"
                              : payment.status === "Pendente"
                                ? "#FEF3C7"
                                : "#FEE2E2",
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
                              payment.status === "Pago"
                                ? "#16A34A"
                                : payment.status === "Pendente"
                                  ? "#F59E0B"
                                  : "#EF4444",
                            fontFamily: "Montserrat_600SemiBold",
                          }}
                        >
                          {payment.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Detalhes do pagamento */}
                <View
                  style={{
                    backgroundColor: "#F8FAFC",
                    padding: 10,
                    borderRadius: 8,
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        color: "#64748B",
                        fontFamily: "Montserrat_400Regular",
                      }}
                    >
                      Método
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: "#1E293B",
                        fontFamily: "Montserrat_600SemiBold",
                      }}
                    >
                      {payment.method}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        color: "#64748B",
                        fontFamily: "Montserrat_400Regular",
                      }}
                    >
                      Referência
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: "#2563EB",
                        fontFamily: "Montserrat_600SemiBold",
                      }}
                    >
                      {payment.reference}
                    </Text>
                  </View>
                </View>

                {/* Valor pago */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#64748B",
                      fontFamily: "Montserrat_500Medium",
                    }}
                  >
                    Valor Pago
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: "#16A34A",
                      fontFamily: "Montserrat_700Bold",
                    }}
                  >
                    {payment.amount}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    handleDownload(
                      payment.receiptUrl,
                      `Recibo ${payment.reference}`,
                      showToast,
                    )
                  }
                  activeOpacity={0.7}
                  style={{
                    backgroundColor: "#F0FDF4",
                    padding: 10,
                    borderRadius: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <FileText size={16} color="#16A34A" />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: "#16A34A",
                      fontFamily: "Montserrat_600SemiBold",
                    }}
                  >
                    Ver Comprovativo (PDF)
                  </Text>
                </TouchableOpacity>
              </GlassView>
            </MotiView>
          ))
        )}
      </View>
    </View>
  );
}



