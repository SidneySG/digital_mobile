import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, User, Building2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function TipoContaScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleAccountType = (type) => {
    router.push({
      pathname: "/signup/capturar-documento",
      params: { accountType: type },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="dark" />

      <View
        style={{
          paddingTop: insets.top + 12,
          paddingHorizontal: 20,
          paddingBottom: 16,
          backgroundColor: "#FFFFFF",
          borderBottomWidth: 1,
          borderBottomColor: "#E2E8F0",
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#1E293B",
            fontFamily: "Poppins_700Bold",
          }}
        >
          Tipo de Conta
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: "center",
        }}
      >
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400 }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#1E293B",
              fontFamily: "Poppins_700Bold",
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            Escolha o Tipo de Conta
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "#64748B",
              fontFamily: "Poppins_400Regular",
              marginBottom: 40,
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            Selecione se você é um cliente individual ou empresa
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", delay: 200 }}
          style={{ gap: 16 }}
        >
          <TouchableOpacity
            onPress={() => handleAccountType("individual")}
            activeOpacity={0.8}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 24,
                borderWidth: 2,
                borderColor: "#3B82F6",
                shadowColor: "#3B82F6",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: "#EFF6FF",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <User size={32} color="#3B82F6" strokeWidth={2} />
              </View>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700",
                  color: "#1E293B",
                  fontFamily: "Poppins_700Bold",
                  marginBottom: 8,
                }}
              >
                Conta Individual
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#64748B",
                  fontFamily: "Poppins_400Regular",
                  lineHeight: 20,
                }}
              >
                Para clientes individuais. Usaremos o seu BI (nacionais) ou
                Passaporte + DIRE (estrangeiros) para criar a conta.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleAccountType("empresa")}
            activeOpacity={0.8}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 24,
                borderWidth: 2,
                borderColor: "#10B981",
                shadowColor: "#10B981",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: "#F0FDF4",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <Building2 size={32} color="#10B981" strokeWidth={2} />
              </View>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700",
                  color: "#1E293B",
                  fontFamily: "Poppins_700Bold",
                  marginBottom: 8,
                }}
              >
                Conta Empresarial
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#64748B",
                  fontFamily: "Poppins_400Regular",
                  lineHeight: 20,
                }}
              >
                Para empresas. Registo com dados da empresa e documentação
                corporativa.
              </Text>
            </View>
          </TouchableOpacity>
        </MotiView>
      </View>
    </View>
  );
}



