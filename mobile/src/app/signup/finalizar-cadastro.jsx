import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, Lock, CheckCircle } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { MotiView } from "moti";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function FinalizarCadastroScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSubmit = async () => {
    if (password.length < 8) {
      Alert.alert("Erro", "A senha deve ter pelo menos 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    setLoading(true);

    try {
      // Here we would call the signup API
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: params.email,
          fullName: params.fullName,
          phone: params.phone,
          nuit: params.idNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar conta");
      }

      // Navigate to success screen
      router.push({
        pathname: "/signup/sucesso",
        params: { email: params.email },
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a conta. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
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
          Finalizar Cadastro
        </Text>
      </View>

      <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400 }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "#EFF6FF",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              alignSelf: "center",
            }}
          >
            <Lock size={40} color="#3B82F6" />
          </View>

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
            Crie a sua Senha
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "#64748B",
              fontFamily: "Poppins_400Regular",
              marginBottom: 32,
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            Escolha uma senha segura para proteger a sua conta
          </Text>

          <View style={{ gap: 16, marginBottom: 32 }}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#475569",
                  marginBottom: 8,
                  fontFamily: "Poppins_600SemiBold",
                }}
              >
                Senha *
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Mínimo 8 caracteres"
                secureTextEntry
                autoCapitalize="none"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1,
                  borderColor: "#E2E8F0",
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 15,
                  color: "#1E293B",
                  fontFamily: "Poppins_400Regular",
                }}
              />
            </View>

            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#475569",
                  marginBottom: 8,
                  fontFamily: "Poppins_600SemiBold",
                }}
              >
                Confirmar Senha *
              </Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Digite a senha novamente"
                secureTextEntry
                autoCapitalize="none"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1,
                  borderColor: "#E2E8F0",
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 15,
                  color: "#1E293B",
                  fontFamily: "Poppins_400Regular",
                }}
              />
            </View>

            {password.length > 0 && (
              <View
                style={{
                  backgroundColor: "#F8FAFC",
                  padding: 12,
                  borderRadius: 12,
                  gap: 8,
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <CheckCircle
                    size={16}
                    color={password.length >= 8 ? "#10B981" : "#CBD5E1"}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      color: password.length >= 8 ? "#10B981" : "#94A3B8",
                      fontFamily: "Poppins_400Regular",
                    }}
                  >
                    Mínimo 8 caracteres
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <CheckCircle
                    size={16}
                    color={
                      password === confirmPassword && password.length > 0
                        ? "#10B981"
                        : "#CBD5E1"
                    }
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      color:
                        password === confirmPassword && password.length > 0
                          ? "#10B981"
                          : "#94A3B8",
                      fontFamily: "Poppins_400Regular",
                    }}
                  >
                    Senhas coincidem
                  </Text>
                </View>
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.8}
            disabled={
              loading || password.length < 8 || password !== confirmPassword
            }
          >
            <View
              style={{
                backgroundColor:
                  password.length >= 8 && password === confirmPassword
                    ? "#3B82F6"
                    : "#CBD5E1",
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
                  fontFamily: "Poppins_700Bold",
                }}
              >
                {loading ? "Criando Conta..." : "Criar Conta"}
              </Text>
            </View>
          </TouchableOpacity>
        </MotiView>
      </View>
    </View>
  );
}



