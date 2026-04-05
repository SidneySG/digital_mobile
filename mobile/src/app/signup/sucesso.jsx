import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { CheckCircle, Home } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function SucessoScreen() {
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

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="light" />

      <LinearGradient
        colors={["#10B981", "#059669"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 60,
          paddingHorizontal: 20,
          paddingBottom: 60,
          alignItems: "center",
        }}
      >
        <MotiView
          from={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 200 }}
        >
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 32,
            }}
          >
            <CheckCircle size={64} color="#10B981" />
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", delay: 400 }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "700",
              color: "#FFFFFF",
              fontFamily: "Poppins_700Bold",
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            Conta Criada!
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "rgba(255, 255, 255, 0.9)",
              fontFamily: "Poppins_400Regular",
              textAlign: "center",
              lineHeight: 24,
            }}
          >
            A sua conta foi criada com sucesso. Já pode começar a utilizar todos
            os nossos serviços.
          </Text>
        </MotiView>
      </LinearGradient>

      <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", delay: 600 }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 24,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: "#E2E8F0",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#1E293B",
                fontFamily: "Poppins_700Bold",
                marginBottom: 12,
              }}
            >
              Email de Confirmação Enviado
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#64748B",
                fontFamily: "Poppins_400Regular",
                lineHeight: 20,
              }}
            >
              Enviámos um email de confirmação para{" "}
              <Text style={{ fontWeight: "600", color: "#3B82F6" }}>
                {params.email}
              </Text>
              . Verifique a sua caixa de entrada para activar a conta.
            </Text>
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", delay: 800 }}
        >
          <TouchableOpacity
            onPress={() => router.push("/(tabs)")}
            activeOpacity={0.8}
          >
            <View
              style={{
                backgroundColor: "#3B82F6",
                padding: 18,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Home size={20} color="#FFFFFF" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#FFFFFF",
                  fontFamily: "Poppins_700Bold",
                }}
              >
                Ir para o Início
              </Text>
            </View>
          </TouchableOpacity>
        </MotiView>
      </View>
    </View>
  );
}



