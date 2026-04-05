import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft, RefreshCcw } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image } from "expo-image";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";

export default function RenovarApoliceScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [policyNumber, setPolicyNumber] = useState("");
  const [error, setError] = useState("");

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleVerify = () => {
    if (!policyNumber.trim()) {
      setError("Por favor, insira o número da apólice");
      return;
    }

    // Navigate to confirm renewal data
    router.push({
      pathname: "/renovar-apolice/confirmar-dados",
      params: { policyNumber: policyNumber.trim() },
    });
  };

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
      <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
        <StatusBar style="light" />

        {/* Header with Gradient */}
        <LinearGradient
          colors={["#1E293B", "#334155", "#475569"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingTop: insets.top + 16,
            paddingHorizontal: 20,
            paddingBottom: 20,
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
            <Image
              source={{
                uri: "https://ucarecdn.com/2091d9c0-64a7-4090-971e-29b73b16e99e/-/format/auto/",
              }}
              style={{ width: 100, height: 100 }}
              contentFit="contain"
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#FFFFFF",
                  fontFamily: "Poppins_700Bold",
                  lineHeight: 26,
                }}
              >
                Renovar Apólice
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#D4AF37",
                  marginTop: 4,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Passo 1 de 3
              </Text>
            </View>
          </View>
        </LinearGradient>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Icon */}
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              backgroundColor: "#DBEAFE",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 20,
              marginBottom: 24,
            }}
          >
            <RefreshCcw size={40} color="#2563EB" />
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
            Renovação de Apólice
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: "#64748B",
              textAlign: "center",
              marginBottom: 40,
              fontFamily: "Poppins_400Regular",
              lineHeight: 22,
            }}
          >
            Insira o número da sua apólice para iniciar o processo de renovação
          </Text>

          {/* Policy Number Input */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#1E293B",
                marginBottom: 8,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              Número da Apólice
            </Text>
            <TextInput
              value={policyNumber}
              onChangeText={(text) => {
                setPolicyNumber(text);
                setError("");
              }}
              placeholder="Ex: AUTO-2024-001"
              placeholderTextColor="#94A3B8"
              style={{
                backgroundColor: "#FFFFFF",
                borderWidth: error ? 2 : 1,
                borderColor: error ? "#EF4444" : "#E2E8F0",
                borderRadius: 12,
                padding: 16,
                fontSize: 16,
                color: "#1E293B",
                fontFamily: "Poppins_500Medium",
              }}
              autoCapitalize="characters"
              autoCorrect={false}
            />
            {error ? (
              <Text
                style={{
                  fontSize: 13,
                  color: "#EF4444",
                  marginTop: 8,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                {error}
              </Text>
            ) : null}
          </View>

          {/* Info Box */}
          <View
            style={{
              backgroundColor: "#EFF6FF",
              padding: 16,
              borderRadius: 12,
              marginTop: 8,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "#1E40AF",
                fontFamily: "Poppins_400Regular",
                lineHeight: 20,
              }}
            >
              O número da apólice pode ser encontrado no certificado digital ou
              nos emails enviados pela seguradora.
            </Text>
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
          <TouchableOpacity onPress={handleVerify} activeOpacity={0.8}>
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
                Verificar Apólice
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}



