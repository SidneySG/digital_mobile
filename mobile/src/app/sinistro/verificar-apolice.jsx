import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, Shield, Search, ArrowRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";

export default function VerificarApoliceScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [policyNumber, setPolicyNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleVerify = async () => {
    if (!policyNumber.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: "/sinistro/verificar-otp",
        params: { policyNumber },
      });
    }, 1000);
  };

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
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
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
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
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#FFFFFF",
                  fontFamily: "Poppins_700Bold",
                }}
              >
                Verificar Apólice
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#D4AF37",
                  marginTop: 2,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Passo 1 de 3
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={{ flex: 1, padding: 20 }}>
          {/* Icon with Gradient Background */}
          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 600 }}
          >
            <LinearGradient
              colors={["#3B82F6", "#2563EB", "#1D4ED8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 24,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginTop: 40,
                marginBottom: 24,
                shadowColor: "#2563EB",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <Shield size={50} color="#FFFFFF" strokeWidth={2} />
            </LinearGradient>
          </MotiView>

          <Text
            style={{
              fontSize: 26,
              fontWeight: "700",
              color: "#1E293B",
              textAlign: "center",
              marginBottom: 12,
              fontFamily: "Poppins_700Bold",
            }}
          >
            Insira o Número da Apólice
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: "#64748B",
              textAlign: "center",
              marginBottom: 40,
              fontFamily: "Poppins_400Regular",
              lineHeight: 22,
              paddingHorizontal: 20,
            }}
          >
            Digite o número da sua apólice para verificarmos os dados junto à
            seguradora
          </Text>

          {/* Policy Number Input */}
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#1E293B",
                marginBottom: 12,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              Número da Apólice
            </Text>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderWidth: 2,
                borderColor: policyNumber ? "#2563EB" : "#E2E8F0",
                borderRadius: 16,
                padding: 18,
                shadowColor: policyNumber ? "#2563EB" : "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: policyNumber ? 0.15 : 0.05,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <TextInput
                value={policyNumber}
                onChangeText={setPolicyNumber}
                placeholder="Ex: AUTO-2024-001"
                placeholderTextColor="#94A3B8"
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins_600SemiBold",
                  textAlign: "center",
                  letterSpacing: 1.5,
                  color: "#1E293B",
                }}
                autoCapitalize="characters"
              />
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#FEF3C7",
              padding: 18,
              borderRadius: 16,
              marginTop: 24,
              borderLeftWidth: 4,
              borderLeftColor: "#F59E0B",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "#92400E",
                fontFamily: "Poppins_500Medium",
                lineHeight: 20,
              }}
            >
              💡 O número da apólice pode ser encontrado no seu contrato de
              seguro ou nos documentos recebidos da seguradora.
            </Text>
          </View>
        </View>

        {/* Footer Button */}
        <View
          style={{
            padding: 20,
            paddingBottom: insets.bottom + 20,
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#E2E8F0",
          }}
        >
          <TouchableOpacity
            onPress={handleVerify}
            disabled={!policyNumber.trim() || loading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                policyNumber.trim() && !loading
                  ? ["#3B82F6", "#2563EB"]
                  : ["#CBD5E1", "#94A3B8"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                padding: 18,
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                shadowColor: policyNumber.trim() ? "#2563EB" : "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: policyNumber.trim() ? 0.3 : 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Search size={20} color="#FFFFFF" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#FFFFFF",
                  fontFamily: "Poppins_700Bold",
                }}
              >
                {loading ? "Verificando..." : "Verificar Apólice"}
              </Text>
              {!loading && <ArrowRight size={20} color="#FFFFFF" />}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}



