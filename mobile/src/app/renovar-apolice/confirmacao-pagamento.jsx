import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { CheckCircle2, FileText } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";

export default function ConfirmacaoPagamentoScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const isPartial = params.partial === "true";

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="dark" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom + 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon */}
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#DCFCE7",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginBottom: 32,
          }}
        >
          <CheckCircle2 size={56} color="#16A34A" />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#1E293B",
            textAlign: "center",
            marginBottom: 12,
            fontFamily: "Poppins_700Bold",
          }}
        >
          {isPartial ? "Pagamento Registado!" : "Renovação Concluída!"}
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "#64748B",
            textAlign: "center",
            marginBottom: 40,
            fontFamily: "Poppins_400Regular",
            lineHeight: 24,
            paddingHorizontal: 20,
          }}
        >
          {isPartial
            ? "O seu pagamento foi registado com sucesso. Complete o pagamento para receber o certificado."
            : "A sua apólice foi renovada com sucesso!"}
        </Text>

        {/* Payment Details */}
        <GlassView
          isInteractive={false}
          style={[
            {
              padding: 24,
              borderRadius: 20,
              marginBottom: 24,
            },
            isLiquidGlassAvailable()
              ? {}
              : { opacity: 0.9, backgroundColor: "#FFFFFF" },
          ]}
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

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 12,
                color: "#64748B",
                marginBottom: 4,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Apólice
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1E293B",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {params.policyNumber}
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 12,
                color: "#64748B",
                marginBottom: 4,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Valor Pago
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#16A34A",
                fontFamily: "Poppins_700Bold",
              }}
            >
              {params.amount}
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 12,
                color: "#64748B",
                marginBottom: 4,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Método de Pagamento
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "#1E293B",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {params.method === "mpesa"
                ? "M-Pesa"
                : params.method === "emola"
                  ? "E-Mola"
                  : "Cartão Visa"}
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: 12,
                color: "#64748B",
                marginBottom: 4,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Data
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "#1E293B",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {new Date().toLocaleDateString("pt-MZ")}
            </Text>
          </View>
        </GlassView>

        {!isPartial && (
          <GlassView
            isInteractive={false}
            style={[
              {
                padding: 20,
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
                gap: 16,
              },
              isLiquidGlassAvailable()
                ? {}
                : { opacity: 0.9, backgroundColor: "#EFF6FF" },
            ]}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: "#2563EB",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileText size={24} color="#FFFFFF" />
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
                Certificado Disponível
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#64748B",
                  marginTop: 2,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Acesse o Portal para visualizar
              </Text>
            </View>
          </GlassView>
        )}
      </ScrollView>

      {/* Footer Buttons */}
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
          gap: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/portal")}
          activeOpacity={0.8}
        >
          <View
            style={{
              backgroundColor: "#2563EB",
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
              backgroundColor: "transparent",
              padding: 18,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#64748B",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              Voltar ao Início
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}



