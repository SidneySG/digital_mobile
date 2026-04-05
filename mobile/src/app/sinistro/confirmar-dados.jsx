import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, CheckCircle2 } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function ConfirmarDadosScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (!params.policyNumber) {
      router.replace("/sinistro/verificar-apolice");
    }
  }, [params.policyNumber]);

  // Mock data from policy - would come from API
  const policyData = {
    policyNumber: params.policyNumber,
    name: "João Silva Costa",
    phone: "+258 84 123 4567",
    email: "joao.silva@email.com",
    address: "Av. Julius Nyerere, Maputo",
    insuranceType: "Seguro Automóvel",
    vehicle: "Toyota Corolla 2020",
    plate: "MPM-1234-AA",
  };

  if (!fontsLoaded || !params.policyNumber) {
    return null;
  }

  const handleConfirm = () => {
    router.push({
      pathname: "/sinistro/formulario",
      params: { policyNumber: params.policyNumber },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="light" />

      {/* Header with Solid Black Background */}
      <View
        style={{
          paddingTop: insets.top + 12,
          paddingHorizontal: 20,
          paddingBottom: 16,
          backgroundColor: "#000000",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#FFFFFF",
                fontFamily: "Poppins_700Bold",
              }}
            >
              Confirmar Dados
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#D4AF37",
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
          Apólice Verificada!
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
          Confirme se os dados abaixo estão correctos antes de prosseguir
        </Text>

        {/* All Details in One Card - Now with White Background */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            padding: 24,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#E2E8F0",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
          }}
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

          {/* Divider */}
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
              Nome Completo
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
          <View style={{ marginBottom: 16 }}>
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

          {/* Address */}
          <View style={{ marginBottom: policyData.vehicle ? 16 : 0 }}>
            <Text
              style={{
                fontSize: 12,
                color: "#64748B",
                marginBottom: 6,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Endereço
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1E293B",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {policyData.address}
            </Text>
          </View>

          {/* Vehicle info if exists */}
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
                  Veículo Segurado
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
              Confirmar e Continuar
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}



