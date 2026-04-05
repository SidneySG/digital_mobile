import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { CheckCircle, CreditCard, Smartphone } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { MotiView } from "moti";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function CotacaoEnviadaScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedPayment, setSelectedPayment] = useState("mpesa");

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Cotações simuladas
  const quotes = [
    {
      insurer: "Hollard Seguros",
      coverageType: "Seguro Automóvel - Cobertura Completa",
      monthlyPrice: "2.500 MZN",
      yearlyPrice: "27.000 MZN",
      benefits: [
        "Danos Próprios",
        "Responsabilidade Civil",
        "Roubo e Incêndio",
        "Assistência 24/7",
      ],
    },
    {
      insurer: "EMOSE Seguros",
      coverageType: "Seguro Automóvel - Cobertura Total",
      monthlyPrice: "2.350 MZN",
      yearlyPrice: "25.380 MZN",
      benefits: [
        "Cobertura Total",
        "Carro Substituto",
        "Protecção Legal",
        "Assistência em Viagem",
      ],
    },
    {
      insurer: "Mapfre Moçambique",
      coverageType: "Seguro Automóvel - Premium",
      monthlyPrice: "2.750 MZN",
      yearlyPrice: "29.700 MZN",
      benefits: [
        "Cobertura Premium",
        "Vidros e Faróis",
        "Reboque Grátis",
        "Desconto na Renovação",
      ],
    },
  ];

  const totalMonthly = quotes.reduce(
    (sum, q) => sum + parseInt(q.monthlyPrice.replace(/[^0-9]/g, "")),
    0,
  );
  const totalYearly = quotes.reduce(
    (sum, q) => sum + parseInt(q.yearlyPrice.replace(/[^0-9]/g, "")),
    0,
  );

  const paymentMethods = [
    { id: "mpesa", name: "M-Pesa", icon: Smartphone },
    { id: "emola", name: "E-Mola", icon: Smartphone },
    { id: "card", name: "Cartão de Crédito", icon: CreditCard },
  ];

  const handlePayment = () => {
    router.push("/(tabs)");
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="light" />

      {/* Header with Gradient */}
      <LinearGradient
        colors={["#1E293B", "#334155"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 12,
          paddingHorizontal: 20,
          paddingBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#FFFFFF",
            fontFamily: "Poppins_700Bold",
          }}
        >
          Cotações Recebidas
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#D4AF37",
            marginTop: 4,
            fontFamily: "Poppins_400Regular",
          }}
        >
          Escolha a melhor opção e pague agora
        </Text>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400 }}
        >
          <View
            style={{
              backgroundColor: "#EFF6FF",
              padding: 16,
              borderRadius: 16,
              marginBottom: 20,
              borderLeftWidth: 4,
              borderLeftColor: "#2563EB",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <CheckCircle size={20} color="#2563EB" />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: "#1E293B",
                  fontFamily: "Poppins_700Bold",
                }}
              >
                Cotações Disponíveis
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                color: "#64748B",
                fontFamily: "Poppins_400Regular",
                lineHeight: 20,
              }}
            >
              Recebemos {quotes.length} propostas das melhores seguradoras.
              Escolha a que mais se adequa e pague imediatamente.
            </Text>
          </View>
        </MotiView>

        {quotes.map((quote, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: "timing", duration: 300, delay: index * 100 }}
            style={{ marginBottom: 16 }}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 18,
                borderWidth: 2,
                borderColor: "#E2E8F0",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: "#1E293B",
                  marginBottom: 4,
                  fontFamily: "Poppins_700Bold",
                }}
              >
                {quote.insurer}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#64748B",
                  marginBottom: 12,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                {quote.coverageType}
              </Text>

              <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#F8FAFC",
                    padding: 12,
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      color: "#64748B",
                      marginBottom: 4,
                      fontFamily: "Poppins_400Regular",
                    }}
                  >
                    Mensal
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: "#2563EB",
                      fontFamily: "Poppins_700Bold",
                    }}
                  >
                    {quote.monthlyPrice}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#F0FDF4",
                    padding: 12,
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      color: "#64748B",
                      marginBottom: 4,
                      fontFamily: "Poppins_400Regular",
                    }}
                  >
                    Anual (10% desconto)
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: "#10B981",
                      fontFamily: "Poppins_700Bold",
                    }}
                  >
                    {quote.yearlyPrice}
                  </Text>
                </View>
              </View>

              <View style={{ gap: 6 }}>
                {quote.benefits.map((benefit, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <CheckCircle size={14} color="#10B981" />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#64748B",
                        fontFamily: "Poppins_400Regular",
                      }}
                    >
                      {benefit}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </MotiView>
        ))}

        <View
          style={{
            backgroundColor: "#1E293B",
            padding: 20,
            borderRadius: 16,
            marginTop: 8,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: "#D4AF37",
              marginBottom: 8,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Valor Total Estimado
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "#FFFFFF",
                fontFamily: "Poppins_400Regular",
              }}
            >
              Mensal (todas):
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#FFFFFF",
                fontFamily: "Poppins_700Bold",
              }}
            >
              {totalMonthly.toLocaleString()} MZN
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "#FFFFFF",
                fontFamily: "Poppins_400Regular",
              }}
            >
              Anual (todas):
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#10B981",
                fontFamily: "Poppins_700Bold",
              }}
            >
              {totalYearly.toLocaleString()} MZN
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#1E293B",
            marginBottom: 16,
            fontFamily: "Poppins_700Bold",
            textAlign: "center",
          }}
        >
          Método de Pagamento
        </Text>

        <View style={{ gap: 12, marginBottom: 24 }}>
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <TouchableOpacity
                key={method.id}
                onPress={() => setSelectedPayment(method.id)}
                activeOpacity={0.7}
              >
                <View
                  style={{
                    backgroundColor:
                      selectedPayment === method.id ? "#EFF6FF" : "#FFFFFF",
                    padding: 16,
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    borderWidth: 2,
                    borderColor:
                      selectedPayment === method.id ? "#2563EB" : "#E2E8F0",
                  }}
                >
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      backgroundColor:
                        selectedPayment === method.id ? "#2563EB" : "#F1F5F9",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconComponent
                      size={24}
                      color={
                        selectedPayment === method.id ? "#FFFFFF" : "#64748B"
                      }
                    />
                  </View>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 15,
                      fontWeight: "600",
                      color: "#1E293B",
                      fontFamily: "Poppins_600SemiBold",
                    }}
                  >
                    {method.name}
                  </Text>
                  {selectedPayment === method.id && (
                    <CheckCircle size={20} color="#2563EB" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={{
          padding: 20,
          paddingBottom: insets.bottom + 20,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E2E8F0",
        }}
      >
        <TouchableOpacity onPress={handlePayment} activeOpacity={0.8}>
          <LinearGradient
            colors={["#10B981", "#059669"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              padding: 18,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#10B981",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
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
              Confirmar e Pagar Agora
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}



