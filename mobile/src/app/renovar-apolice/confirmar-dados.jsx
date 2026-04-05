import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, CheckCircle2 } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";

export default function ConfirmarDadosRenovacaoScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Mock data from policy - would come from API
  const policyData = {
    policyNumber: params.policyNumber,
    name: "João Silva Costa",
    phone: "+258 84 123 4567",
    email: "joao.silva@email.com",
    insuranceType: "Seguro Automóvel",
    vehicle: "Toyota Corolla 2020",
    plate: "MPM-1234-AA",
    currentValue: "15.000 MZN",
    renewalValue: "16.500 MZN",
    expiryDate: "15/12/2024",
    newExpiryDate: "15/12/2025",
  };

  if (!fontsLoaded) {
    return null;
  }

  const handleConfirm = () => {
    router.push({
      pathname: "/renovar-apolice/pagamento",
      params: {
        policyNumber: params.policyNumber,
        amount: policyData.renewalValue,
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
              Confirmar Renovação
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#64748B",
                marginTop: 2,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Passo 2 de 3
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon */}
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            backgroundColor: "#DCFCE7",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 20,
            marginBottom: 24,
          }}
        >
          <CheckCircle2 size={40} color="#16A34A" />
        </View>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#1E293B",
            textAlign: "center",
            marginBottom: 12,
            fontFamily: "Poppins_700Bold",
          }}
        >
          Apólice Encontrada!
        </Text>

        <Text
          style={{
            fontSize: 15,
            color: "#64748B",
            textAlign: "center",
            marginBottom: 32,
            fontFamily: "Poppins_400Regular",
            lineHeight: 22,
          }}
        >
          Confirme os dados da renovação abaixo
        </Text>

        {/* All Details in One Card */}
        <GlassView
          isInteractive={false}
          style={[
            {
              padding: 24,
              borderRadius: 20,
              marginBottom: 16,
            },
            isLiquidGlassAvailable()
              ? {}
              : { opacity: 0.9, backgroundColor: "#FFFFFF" },
          ]}
        >
          {/* Policy Number */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 12,
                color: "#64748B",
                marginBottom: 6,
                fontFamily: "Poppins_400Regular",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Número da Apólice
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#2563EB",
                fontFamily: "Poppins_700Bold",
              }}
            >
              {policyData.policyNumber}
            </Text>
          </View>

          <View
            style={{ height: 1, backgroundColor: "#E2E8F0", marginBottom: 20 }}
          />

          {/* Insurance Type */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 12,
                color: "#64748B",
                marginBottom: 6,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Tipo de Seguro
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1E293B",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {policyData.insuranceType}
            </Text>
          </View>

          {/* Name */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 12,
                color: "#64748B",
                marginBottom: 6,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Segurado
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1E293B",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {policyData.name}
            </Text>
          </View>

          {/* Phone */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 12,
                color: "#64748B",
                marginBottom: 6,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Telefone
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1E293B",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {policyData.phone}
            </Text>
          </View>

          {/* Email */}
          <View style={{ marginBottom: policyData.vehicle ? 16 : 0 }}>
            <Text
              style={{
                fontSize: 12,
                color: "#64748B",
                marginBottom: 6,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Email
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1E293B",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {policyData.email}
            </Text>
          </View>

          {/* Vehicle if exists */}
          {policyData.vehicle && (
            <>
              <View
                style={{
                  height: 1,
                  backgroundColor: "#E2E8F0",
                  marginVertical: 20,
                }}
              />
              <View style={{ marginBottom: 8 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#64748B",
                    marginBottom: 6,
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  Veículo
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#1E293B",
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  {policyData.vehicle}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#64748B",
                    marginBottom: 6,
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  Matrícula
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#1E293B",
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  {policyData.plate}
                </Text>
              </View>
            </>
          )}
        </GlassView>

        {/* Renewal Info */}
        <GlassView
          isInteractive={false}
          style={[
            {
              padding: 20,
              borderRadius: 20,
            },
            isLiquidGlassAvailable()
              ? {}
              : { opacity: 0.9, backgroundColor: "#EFF6FF" },
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
            Detalhes da Renovação
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
                fontSize: 14,
                color: "#64748B",
                fontFamily: "Poppins_400Regular",
              }}
            >
              Valor Atual
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#1E293B",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {policyData.currentValue}
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
                fontFamily: "Poppins_400Regular",
              }}
            >
              Valor da Renovação
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#2563EB",
                fontFamily: "Poppins_700Bold",
              }}
            >
              {policyData.renewalValue}
            </Text>
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: "#DBEAFE",
              marginVertical: 12,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "#64748B",
                fontFamily: "Poppins_400Regular",
              }}
            >
              Validade Atual
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#64748B",
                fontFamily: "Poppins_500Medium",
              }}
            >
              {policyData.expiryDate}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "#64748B",
                fontFamily: "Poppins_400Regular",
              }}
            >
              Nova Validade
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                color: "#16A34A",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {policyData.newExpiryDate}
            </Text>
          </View>
        </GlassView>
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
        <TouchableOpacity onPress={handleConfirm} activeOpacity={0.8}>
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
              Prosseguir para Pagamento
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}



