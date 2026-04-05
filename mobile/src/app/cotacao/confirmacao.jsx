import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { CheckCircle, Home, FileText } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { MotiView } from "moti";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function ConfirmacaoScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const amount = params.amount || "27000";
  const formattedAmount = parseInt(amount).toLocaleString();

  const paymentMethodNames = {
    mpesa: "M-Pesa",
    emola: "E-Mola",
    visa: "Cartão Visa",
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="light" />

      {/* Header with Gradient */}
      <LinearGradient
        colors={["#10B981", "#059669"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 40,
          paddingHorizontal: 20,
          paddingBottom: 40,
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://ucarecdn.com/2091d9c0-64a7-4090-971e-29b73b16e99e/-/format/auto/",
          }}
          style={{ width: 120, height: 120, marginBottom: 20 }}
          contentFit="contain"
        />
        <MotiView
          from={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 200 }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <CheckCircle size={48} color="#10B981" />
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", delay: 400 }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#FFFFFF",
              fontFamily: "Poppins_700Bold",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Pagamento Confirmado!
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "rgba(255, 255, 255, 0.9)",
              fontFamily: "Poppins_400Regular",
              textAlign: "center",
            }}
          >
            O seu seguro foi activado com sucesso
          </Text>
        </MotiView>
      </LinearGradient>

      <View style={{ flex: 1, padding: 20 }}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", delay: 600 }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: "#E2E8F0",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#1E293B",
                marginBottom: 16,
                fontFamily: "Poppins_700Bold",
              }}
            >
              Detalhes do Pagamento
            </Text>

            <View style={{ gap: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "#64748B",
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  Valor Pago:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    color: "#1E293B",
                    fontFamily: "Poppins_700Bold",
                  }}
                >
                  {formattedAmount} MZN
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
                    fontSize: 14,
                    color: "#64748B",
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  Método:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    color: "#1E293B",
                    fontFamily: "Poppins_700Bold",
                  }}
                >
                  {paymentMethodNames[params.paymentMethod] || "N/A"}
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
                    fontSize: 14,
                    color: "#64748B",
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  Data:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    color: "#1E293B",
                    fontFamily: "Poppins_700Bold",
                  }}
                >
                  {new Date().toLocaleDateString("pt-PT")}
                </Text>
              </View>

              <View
                style={{
                  height: 1,
                  backgroundColor: "#E2E8F0",
                  marginVertical: 8,
                }}
              />

              <View
                style={{
                  backgroundColor: "#F0FDF4",
                  padding: 12,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: "#166534",
                    fontFamily: "Poppins_400Regular",
                    lineHeight: 20,
                  }}
                >
                  A apólice e comprovativo de pagamento podem ser encontrados no
                  Portal para visualização e impressão
                </Text>
              </View>
            </View>
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", delay: 800 }}
          style={{ gap: 12 }}
        >
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/portal")}
            activeOpacity={0.8}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 16,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                borderWidth: 1,
                borderColor: "#E2E8F0",
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: "#EFF6FF",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FileText size={24} color="#2563EB" />
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
                Ir para o Portal
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(tabs)")}
            activeOpacity={0.8}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 16,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                borderWidth: 1,
                borderColor: "#E2E8F0",
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: "#F0FDF4",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Home size={24} color="#10B981" />
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
                Voltar ao Início
              </Text>
            </View>
          </TouchableOpacity>
        </MotiView>
      </View>
    </View>
  );
}



