import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { MotiView } from "moti";
import { Shield, Check, Info, KeyRound } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";
import { Image } from "expo-image";

export function EstmLoginForm({ onLogin }) {
  const insets = useSafeAreaInsets();
  const [nicInput, setNicInput] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const focusedPadding = 12;
  const paddingAnimation = useRef(
    new Animated.Value(insets.bottom + focusedPadding),
  ).current;

  const animateTo = (value) => {
    Animated.timing(paddingAnimation, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleInputFocus = () => {
    if (Platform.OS === "web") return;
    animateTo(focusedPadding);
  };

  const handleInputBlur = () => {
    if (Platform.OS === "web") return;
    animateTo(insets.bottom + focusedPadding);
  };

  const handleSubmit = async () => {
    setError("");

    if (!nicInput.trim()) {
      setError("Por favor, insira o seu NIC");
      return;
    }

    // Validação básica: NIC deve ter 9 dígitos
    if (nicInput.length < 9) {
      setError("NIC deve ter pelo menos 9 dígitos");
      return;
    }

    setLoading(true);

    // Simular delay de autenticação
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result = await onLogin(nicInput.trim(), remember);

    if (!result.success) {
      setError(result.error || "Erro ao conectar com e-STM");
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "#F8FAFC",
          paddingBottom: paddingAnimation,
        }}
      >
        {/* Header compacto com gradiente */}
        <LinearGradient
          colors={["#DC2626", "#991B1B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingTop: insets.top + 20,
            paddingHorizontal: 20,
            paddingBottom: 40,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        >
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "timing", duration: 500 }}
            style={{ alignItems: "center" }}
          >
            {/* Logotipo oficial do e-STM */}
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 12,
                marginBottom: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <Image
                source="https://ucarecdn.com/0c728c01-dccc-4492-b02e-f676ad5b6cd9/-/format/auto/"
                style={{ width: 200, height: 80 }}
                contentFit="contain"
              />
            </View>

            <Text
              style={{
                fontSize: 13,
                color: "#FEE2E2",
                fontFamily: "Montserrat_500Medium",
                textAlign: "center",
                letterSpacing: 0.5,
              }}
            >
              Sistema de Tributação Municipal
            </Text>
          </MotiView>
        </LinearGradient>

        {/* Formulário de Login */}
        <View style={{ flex: 1, padding: 20, marginTop: -20 }}>
          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 400, delay: 150 }}
          >
            <GlassView
              isInteractive={false}
              style={[
                {
                  padding: 24,
                  borderRadius: 24,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.12,
                  shadowRadius: 16,
                  elevation: 8,
                  marginBottom: 16,
                },
                isLiquidGlassAvailable()
                  ? {}
                  : {
                      opacity: 0.98,
                      backgroundColor: "#FFFFFF",
                      borderWidth: 1,
                      borderColor: "#E2E8F0",
                    },
              ]}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#1E293B",
                  fontFamily: "Montserrat_700Bold",
                  marginBottom: 6,
                }}
              >
                Conectar ao e-STM
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#64748B",
                  fontFamily: "Montserrat_400Regular",
                  marginBottom: 24,
                }}
              >
                Insira o seu NIC para consultar tributos
              </Text>

              {/* Campo de NIC */}
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "#475569",
                    fontFamily: "Montserrat_600SemiBold",
                    marginBottom: 8,
                  }}
                >
                  NIC (Número de Identificação de Contribuinte)
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#F8FAFC",
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: error ? "#EF4444" : "#E2E8F0",
                    paddingHorizontal: 14,
                    shadowColor: error ? "#EF4444" : "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: error ? 0.1 : 0.04,
                    shadowRadius: 3,
                    elevation: 2,
                  }}
                >
                  <KeyRound size={20} color={error ? "#EF4444" : "#64748B"} />
                  <TextInput
                    value={nicInput}
                    onChangeText={(text) => {
                      setNicInput(text);
                      setError("");
                    }}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="Ex: 123456789"
                    placeholderTextColor="#94A3B8"
                    keyboardType="numeric"
                    maxLength={15}
                    style={{
                      flex: 1,
                      paddingVertical: 16,
                      paddingHorizontal: 12,
                      fontSize: 15,
                      color: "#1E293B",
                      fontFamily: "Montserrat_500Medium",
                    }}
                  />
                </View>
                {error && (
                  <MotiView
                    from={{ opacity: 0, translateX: -8 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ type: "timing", duration: 200 }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        color: "#EF4444",
                        marginTop: 6,
                        fontFamily: "Montserrat_500Medium",
                      }}
                    >
                      ⚠️ {error}
                    </Text>
                  </MotiView>
                )}
              </View>

              {/* Remember Me */}
              <TouchableOpacity
                onPress={() => setRemember(!remember)}
                activeOpacity={0.7}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 24,
                }}
              >
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    borderWidth: 2,
                    borderColor: remember ? "#DC2626" : "#CBD5E1",
                    backgroundColor: remember ? "#DC2626" : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {remember && <Check size={14} color="#FFFFFF" />}
                </View>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 13,
                    color: "#475569",
                    fontFamily: "Montserrat_400Regular",
                  }}
                >
                  Manter-me conectado ao e-STM
                </Text>
              </TouchableOpacity>

              {/* Botão de Conectar */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={loading}
                activeOpacity={0.8}
                style={{ marginBottom: 16 }}
              >
                <LinearGradient
                  colors={["#DC2626", "#991B1B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    opacity: loading ? 0.7 : 1,
                    shadowColor: "#DC2626",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    elevation: 4,
                  }}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <>
                      <Shield size={20} color="#FFFFFF" />
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "600",
                          color: "#FFFFFF",
                          fontFamily: "Montserrat_600SemiBold",
                        }}
                      >
                        Conectar
                      </Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Dev Mode Notice */}
              <View
                style={{
                  backgroundColor: "#FEF3C7",
                  padding: 12,
                  borderRadius: 10,
                  flexDirection: "row",
                  gap: 8,
                  borderWidth: 1,
                  borderColor: "#FDE68A",
                }}
              >
                <Info size={16} color="#F59E0B" style={{ marginTop: 1 }} />
                <Text
                  style={{
                    flex: 1,
                    fontSize: 11,
                    color: "#92400E",
                    fontFamily: "Montserrat_400Regular",
                    lineHeight: 16,
                  }}
                >
                  Modo de desenvolvimento: qualquer NIC é aceite para testes
                </Text>
              </View>
            </GlassView>
          </MotiView>

          {/* External Service Notice compacto */}
          <MotiView
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 400, delay: 300 }}
          >
            <View
              style={{
                padding: 16,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "#BFDBFE",
                backgroundColor: "#EFF6FF",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <Info size={18} color="#2563EB" style={{ marginTop: 1 }} />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: "#1E40AF",
                      fontFamily: "Montserrat_600SemiBold",
                      marginBottom: 6,
                    }}
                  >
                    Serviço Externo Oficial
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#1E40AF",
                      lineHeight: 18,
                      fontFamily: "Montserrat_400Regular",
                    }}
                  >
                    Funcionalidade operada em parceria com o e-STM. Todos os
                    pagamentos de taxas e tributos municipais são processados
                    através da plataforma oficial, garantindo conformidade legal
                    e emissão automática de comprovativos.
                  </Text>
                </View>
              </View>
            </View>
          </MotiView>
        </View>
      </Animated.View>
    </KeyboardAvoidingAnimatedView>
  );
}



