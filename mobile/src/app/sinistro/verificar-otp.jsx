import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, Lock, RotateCcw, ArrowRight } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useRef, useEffect } from "react";
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

export default function VerificarOTPScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

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

  if (!fontsLoaded || !params.policyNumber) {
    return null;
  }

  const handleOtpChange = (value, index) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: "/sinistro/confirmar-dados",
        params: { policyNumber: params.policyNumber },
      });
    }, 1000);
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const isComplete = otp.every((digit) => digit !== "");

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
                Verificação OTP
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#D4AF37",
                  marginTop: 2,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Passo 2 de 3
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={{ flex: 1, padding: 20 }}>
          {/* Icon with Gradient */}
          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 600 }}
          >
            <LinearGradient
              colors={["#F59E0B", "#D97706", "#B45309"]}
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
                shadowColor: "#F59E0B",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <Lock size={50} color="#FFFFFF" strokeWidth={2} />
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
            Digite o Código OTP
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: "#64748B",
              textAlign: "center",
              marginBottom: 40,
              fontFamily: "Poppins_400Regular",
              lineHeight: 22,
              paddingHorizontal: 10,
            }}
          >
            Enviamos um código de 6 dígitos para o seu número registado na
            apólice{" "}
            <Text style={{ fontWeight: "700", color: "#1E293B" }}>
              {params.policyNumber}
            </Text>
          </Text>

          {/* OTP Inputs */}
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              justifyContent: "center",
              marginBottom: 32,
            }}
          >
            {otp.map((digit, index) => (
              <MotiView
                key={index}
                animate={{
                  scale: digit ? 1.05 : 1,
                }}
                transition={{ type: "spring", duration: 200 }}
              >
                <TextInput
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={{
                    width: 50,
                    height: 60,
                    backgroundColor: "#FFFFFF",
                    borderWidth: 2,
                    borderColor: digit ? "#F59E0B" : "#E2E8F0",
                    borderRadius: 16,
                    fontSize: 24,
                    fontFamily: "Poppins_700Bold",
                    textAlign: "center",
                    color: "#1E293B",
                    shadowColor: digit ? "#F59E0B" : "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: digit ? 0.2 : 0.05,
                    shadowRadius: 8,
                    elevation: digit ? 4 : 2,
                  }}
                />
              </MotiView>
            ))}
          </View>

          {/* Resend Button */}
          <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                backgroundColor: "#EFF6FF",
                padding: 12,
                borderRadius: 12,
              }}
            >
              <RotateCcw size={16} color="#2563EB" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#2563EB",
                  fontFamily: "Poppins_600SemiBold",
                }}
              >
                Reenviar Código
              </Text>
            </View>
          </TouchableOpacity>
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
            disabled={!isComplete || loading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                isComplete && !loading
                  ? ["#F59E0B", "#D97706"]
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
                shadowColor: isComplete ? "#F59E0B" : "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: isComplete ? 0.3 : 0.1,
                shadowRadius: 8,
                elevation: 4,
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
                {loading ? "Verificando..." : "Verificar Código"}
              </Text>
              {!loading && isComplete && (
                <ArrowRight size={20} color="#FFFFFF" />
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}



