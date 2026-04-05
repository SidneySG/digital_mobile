import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  ChevronLeft,
  CheckCircle2,
  FileText,
  Shield,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { formatMZN } from "@/utils/pricing/insurancePricing";

export default function RevisarCotacaoScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const insuranceNames = {
    auto: "Seguro Automóvel",
    vida: "Seguro de Vida",
    habitacao: "Seguro Habitação",
    viagem: "Seguro Viagem",
    empresarial: "Seguro Empresarial",
    acidentes: "Acidentes Pessoais",
  };

  const handleProceedToPayment = () => {
    if (!acceptedTerms) {
      alert("Por favor, aceite os termos e condições para continuar");
      return;
    }

    router.push({
      pathname: "/cotacao/pagamento",
      params: {
        type: params.type,
        billing: params.billing,
        company: params.company,
        companyId: params.companyId,
        amount: params.price,
      },
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="light" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "#000000",
          paddingTop: insets.top + 12,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronLeft size={24} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: "#FFFFFF",
                fontFamily: "Montserrat_700Bold",
              }}
            >
              Confirmação
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#D4AF37",
                fontFamily: "Montserrat_400Regular",
                marginTop: 2,
              }}
            >
              Reveja os detalhes da sua cotação
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Quote Summary Card */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            padding: 24,
            borderRadius: 16,
            marginBottom: 20,
            borderWidth: 2,
            borderColor: "#E2E8F0",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: "#3B82F6",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Shield size={24} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#1E293B",
                  fontFamily: "Montserrat_700Bold",
                }}
              >
                {insuranceNames[params.type] || "Seguro"}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#64748B",
                  fontFamily: "Montserrat_400Regular",
                  marginTop: 2,
                }}
              >
                {params.company}
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingTop: 20,
              borderTopWidth: 1,
              borderTopColor: "#E2E8F0",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#64748B",
                  fontFamily: "Montserrat_500Medium",
                }}
              >
                Tipo de Pagamento:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#1E293B",
                  fontFamily: "Montserrat_600SemiBold",
                }}
              >
                {params.billing === "mensal" ? "Mensal" : "Anual"}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#64748B",
                  fontFamily: "Montserrat_500Medium",
                }}
              >
                Seguradora:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#1E293B",
                  fontFamily: "Montserrat_600SemiBold",
                }}
              >
                {params.company}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 16,
                borderTopWidth: 1,
                borderTopColor: "#E2E8F0",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#1E293B",
                  fontFamily: "Montserrat_700Bold",
                }}
              >
                Total:
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#10B981",
                  fontFamily: "Montserrat_700Bold",
                }}
              >
                {formatMZN(parseFloat(params.price || 0))} MZN
              </Text>
            </View>
          </View>
        </View>

        {/* Terms and Conditions */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            padding: 20,
            borderRadius: 16,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: "#E2E8F0",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <FileText size={24} color="#1E293B" />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#1E293B",
                fontFamily: "Montserrat_700Bold",
              }}
            >
              Termos e Condições
            </Text>
          </View>

          <View style={{ gap: 12 }}>
            <View
              style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}
            >
              <CheckCircle2
                size={18}
                color="#10B981"
                style={{ marginTop: 2 }}
              />
              <Text
                style={{
                  flex: 1,
                  fontSize: 13,
                  color: "#475569",
                  fontFamily: "Montserrat_400Regular",
                  lineHeight: 20,
                }}
              >
                O pagamento pode ser feito através de M-Pesa, E-Mola ou Cartão
                Visa
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}
            >
              <CheckCircle2
                size={18}
                color="#10B981"
                style={{ marginTop: 2 }}
              />
              <Text
                style={{
                  flex: 1,
                  fontSize: 13,
                  color: "#475569",
                  fontFamily: "Montserrat_400Regular",
                  lineHeight: 20,
                }}
              >
                A apólice será activada imediatamente após confirmação do
                pagamento
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}
            >
              <CheckCircle2
                size={18}
                color="#10B981"
                style={{ marginTop: 2 }}
              />
              <Text
                style={{
                  flex: 1,
                  fontSize: 13,
                  color: "#475569",
                  fontFamily: "Montserrat_400Regular",
                  lineHeight: 20,
                }}
              >
                A apólice estará disponível no Portal após pagamento integral
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}
            >
              <CheckCircle2
                size={18}
                color="#10B981"
                style={{ marginTop: 2 }}
              />
              <Text
                style={{
                  flex: 1,
                  fontSize: 13,
                  color: "#475569",
                  fontFamily: "Montserrat_400Regular",
                  lineHeight: 20,
                }}
              >
                Receberá um email com o certificado do seguro após o pagamento
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}
            >
              <CheckCircle2
                size={18}
                color="#10B981"
                style={{ marginTop: 2 }}
              />
              <Text
                style={{
                  flex: 1,
                  fontSize: 13,
                  color: "#475569",
                  fontFamily: "Montserrat_400Regular",
                  lineHeight: 20,
                }}
              >
                Assistência 24/7 disponível imediatamente após activação da
                apólice
              </Text>
            </View>
          </View>
        </View>

        {/* Accept Terms Checkbox */}
        <TouchableOpacity
          onPress={() => setAcceptedTerms(!acceptedTerms)}
          activeOpacity={0.7}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              padding: 16,
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              borderWidth: 2,
              borderColor: acceptedTerms ? "#10B981" : "#E2E8F0",
            }}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: acceptedTerms ? "#10B981" : "#CBD5E1",
                backgroundColor: acceptedTerms ? "#10B981" : "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {acceptedTerms && (
                <Text
                  style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700" }}
                >
                  ✓
                </Text>
              )}
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                color: "#1E293B",
                fontFamily: "Montserrat_500Medium",
              }}
            >
              Li e aceito os termos e condições
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#FFFFFF",
          paddingTop: 20,
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 20,
          borderTopWidth: 1,
          borderTopColor: "#E2E8F0",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <TouchableOpacity
          onPress={handleProceedToPayment}
          activeOpacity={0.8}
          disabled={!acceptedTerms}
        >
          <View
            style={{
              backgroundColor: acceptedTerms ? "#000000" : "#CBD5E1",
              padding: 18,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#FFFFFF",
                fontFamily: "Montserrat_700Bold",
              }}
            >
              Continuar para Pagamento
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}



