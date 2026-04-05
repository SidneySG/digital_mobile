import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  ChevronLeft,
  CreditCard,
  Smartphone,
  Wallet,
  AlertCircle,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";

export default function PagamentoScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [partialPayment, setPartialPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(
    params.amount || "16.500 MZN",
  );

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const totalAmount = parseFloat(
    params.amount?.replace(/[^\d]/g, "") || "16500",
  );

  const paymentMethods = [
    { id: "mpesa", name: "M-Pesa", icon: Smartphone, color: "#EF4444" },
    { id: "emola", name: "E-Mola", icon: Wallet, color: "#F59E0B" },
    { id: "visa", name: "Cartão Visa", icon: CreditCard, color: "#2563EB" },
  ];

  if (!fontsLoaded) {
    return null;
  }

  const handlePayment = () => {
    // Mock payment processing
    router.push({
      pathname: "/renovar-apolice/confirmacao-pagamento",
      params: {
        policyNumber: params.policyNumber,
        amount: paymentAmount,
        method: selectedMethod,
        partial: partialPayment,
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 12,
          paddingHorizontal: 20,
          paddingBottom: 16,
          backgroundColor: "#FFFFFF",
          borderBottomWidth: 1,
          borderBottomColor: "#E2E8F0",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color="#1E293B" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#1E293B",
                fontFamily: "Poppins_700Bold",
              }}
            >
              Pagamento
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#64748B",
                marginTop: 2,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Passo 3 de 3
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Payment Amount */}
        <GlassView
          isInteractive={false}
          style={[
            {
              padding: 24,
              borderRadius: 20,
              marginBottom: 24,
              alignItems: "center",
            },
            isLiquidGlassAvailable()
              ? {}
              : { opacity: 0.9, backgroundColor: "#EFF6FF" },
          ]}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#64748B",
              marginBottom: 8,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Valor Total
          </Text>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "700",
              color: "#2563EB",
              fontFamily: "Poppins_700Bold",
            }}
          >
            {params.amount}
          </Text>
        </GlassView>

        {/* Partial Payment Option */}
        <TouchableOpacity
          onPress={() => setPartialPayment(!partialPayment)}
          activeOpacity={0.7}
          style={{ marginBottom: 24 }}
        >
          <View
            style={{
              borderWidth: partialPayment ? 2 : 0,
              borderColor: partialPayment ? "#2563EB" : "transparent",
              borderRadius: 16,
            }}
          >
            <GlassView
              isInteractive={true}
              style={[
                {
                  padding: 16,
                  borderRadius: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                },
                isLiquidGlassAvailable()
                  ? {}
                  : { opacity: 0.9, backgroundColor: "#FFFFFF" },
              ]}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: partialPayment ? "#2563EB" : "#CBD5E1",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: partialPayment ? "#2563EB" : "transparent",
                }}
              >
                {partialPayment && (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#1E293B",
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  Pagamento Parcial
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#64748B",
                    marginTop: 2,
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  Pague em prestações
                </Text>
              </View>
            </GlassView>
          </View>
        </TouchableOpacity>

        {partialPayment && (
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#1E293B",
                marginBottom: 8,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              Valor a Pagar Agora
            </Text>
            <TextInput
              value={paymentAmount}
              onChangeText={setPaymentAmount}
              placeholder="Ex: 5.000 MZN"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
              style={{
                backgroundColor: "#FFFFFF",
                borderWidth: 1,
                borderColor: "#E2E8F0",
                borderRadius: 12,
                padding: 16,
                fontSize: 16,
                color: "#1E293B",
                fontFamily: "Poppins_500Medium",
              }}
            />
          </View>
        )}

        {/* Warning for partial payment */}
        {partialPayment && (
          <View
            style={{
              backgroundColor: "#FEF3C7",
              padding: 16,
              borderRadius: 12,
              flexDirection: "row",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <AlertCircle size={20} color="#F59E0B" style={{ marginTop: 2 }} />
            <Text
              style={{
                flex: 1,
                fontSize: 13,
                color: "#92400E",
                fontFamily: "Poppins_400Regular",
                lineHeight: 20,
              }}
            >
              O certificado da apólice só ficará disponível quando o pagamento
              estiver 100% completo.
            </Text>
          </View>
        )}

        {/* Payment Methods */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#1E293B",
            marginBottom: 16,
            fontFamily: "Poppins_700Bold",
          }}
        >
          Método de Pagamento
        </Text>

        <View style={{ gap: 12 }}>
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            const isSelected = selectedMethod === method.id;
            return (
              <TouchableOpacity
                key={method.id}
                onPress={() => setSelectedMethod(method.id)}
                activeOpacity={0.7}
              >
                <View
                  style={{
                    borderWidth: isSelected ? 2 : 0,
                    borderColor: isSelected ? method.color : "transparent",
                    borderRadius: 16,
                  }}
                >
                  <GlassView
                    isInteractive={true}
                    style={[
                      {
                        padding: 18,
                        borderRadius: 16,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 16,
                      },
                      isLiquidGlassAvailable()
                        ? {}
                        : { opacity: 0.9, backgroundColor: "#FFFFFF" },
                    ]}
                  >
                    <View
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 14,
                        backgroundColor: isSelected
                          ? method.color
                          : `${method.color}20`,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconComponent
                        size={28}
                        color={isSelected ? "#FFFFFF" : method.color}
                      />
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
                      {method.name}
                    </Text>

                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: isSelected ? method.color : "#CBD5E1",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isSelected
                          ? method.color
                          : "transparent",
                      }}
                    >
                      {isSelected && (
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: "#FFFFFF",
                          }}
                        />
                      )}
                    </View>
                  </GlassView>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 20,
          paddingBottom: insets.bottom + 20,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E2E8F0",
        }}
      >
        <TouchableOpacity
          onPress={handlePayment}
          activeOpacity={0.8}
          disabled={!selectedMethod}
        >
          <View
            style={{
              backgroundColor: selectedMethod ? "#2563EB" : "#CBD5E1",
              padding: 18,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#FFFFFF",
                fontFamily: "Poppins_700Bold",
              }}
            >
              Confirmar Pagamento
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}



