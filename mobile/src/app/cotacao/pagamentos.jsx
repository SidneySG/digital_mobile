import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  CreditCard,
  Smartphone,
  CheckCircle,
  Shield,
  Phone,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
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

export default function PagamentoScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [selectedMethod, setSelectedMethod] = useState("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const paymentMethods = [
    {
      id: "mpesa",
      name: "M-Pesa",
      icon: Smartphone,
      description: "Pagamento rápido via M-Pesa",
      color: "#EF4444",
    },
    {
      id: "emola",
      name: "E-Mola",
      icon: Smartphone,
      description: "Pagamento seguro via E-Mola",
      color: "#F59E0B",
    },
    {
      id: "visa",
      name: "Cartão Visa",
      icon: CreditCard,
      description: "Cartão de crédito ou débito",
      color: "#1E40AF",
    },
  ];

  if (!fontsLoaded) {
    return null;
  }

  const handlePayment = async () => {
    setProcessing(true);

    // Mock payment processing
    setTimeout(() => {
      setProcessing(false);
      router.push({
        pathname: "/cotacao/confirmacao",
        params: {
          paymentMethod: selectedMethod,
          amount: params.amount || "27000",
          insurerId: params.insurerId,
          insuranceType: params.insuranceType,
        },
      });
    }, 2000);
  };

  const canProceed = () => {
    if (selectedMethod === "mpesa" || selectedMethod === "emola") {
      return phoneNumber.length >= 9;
    }
    if (selectedMethod === "visa") {
      return (
        cardNumber.length >= 16 && expiryDate.length >= 5 && cvv.length >= 3
      );
    }
    return false;
  };

  const amount = params.amount || "27000";
  const formattedAmount = parseInt(amount).toLocaleString();

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
                Pagamento
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#D4AF37",
                  marginTop: 4,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                {formattedAmount} MZN
              </Text>
            </View>
          </View>
        </LinearGradient>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Security Banner */}
          <View
            style={{
              backgroundColor: "#EFF6FF",
              padding: 16,
              borderRadius: 16,
              marginBottom: 24,
              borderLeftWidth: 4,
              borderLeftColor: "#2563EB",
              flexDirection: "row",
              gap: 12,
            }}
          >
            <Shield size={24} color="#2563EB" />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: "#1E293B",
                  marginBottom: 6,
                  fontFamily: "Poppins_700Bold",
                }}
              >
                Pagamento Seguro
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#64748B",
                  fontFamily: "Poppins_400Regular",
                  lineHeight: 20,
                }}
              >
                Todas as transações são protegidas e criptografadas
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#1E293B",
              marginBottom: 16,
              fontFamily: "Poppins_700Bold",
            }}
          >
            Escolha o Método de Pagamento
          </Text>

          {/* Payment Methods */}
          <View style={{ gap: 12, marginBottom: 24 }}>
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              const isSelected = selectedMethod === method.id;
              return (
                <TouchableOpacity
                  key={method.id}
                  onPress={() => setSelectedMethod(method.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={{
                      backgroundColor: isSelected ? "#EFF6FF" : "#FFFFFF",
                      padding: 16,
                      borderRadius: 16,
                      borderWidth: 2,
                      borderColor: isSelected ? "#2563EB" : "#E2E8F0",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        backgroundColor: isSelected ? method.color : "#F1F5F9",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconComponent
                        size={24}
                        color={isSelected ? "#FFFFFF" : "#64748B"}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "700",
                          color: "#1E293B",
                          fontFamily: "Poppins_700Bold",
                          marginBottom: 2,
                        }}
                      >
                        {method.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#64748B",
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        {method.description}
                      </Text>
                    </View>
                    {isSelected && <CheckCircle size={20} color="#2563EB" />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Payment Details */}
          {(selectedMethod === "mpesa" || selectedMethod === "emola") && (
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#1E293B",
                  marginBottom: 12,
                  fontFamily: "Poppins_700Bold",
                }}
              >
                Detalhes de Pagamento
              </Text>

              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#1E293B",
                    marginBottom: 8,
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  Número de Telefone
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      backgroundColor: "#F1F5F9",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Phone size={20} color="#64748B" />
                  </View>
                  <TextInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="+258 84 000 0000"
                    placeholderTextColor="#94A3B8"
                    keyboardType="phone-pad"
                    style={{
                      flex: 1,
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
              </View>

              <View
                style={{
                  backgroundColor: "#FEF3C7",
                  padding: 12,
                  borderRadius: 12,
                  marginTop: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#92400E",
                    fontFamily: "Poppins_400Regular",
                    lineHeight: 18,
                  }}
                >
                  Receberá uma notificação no seu telemóvel para autorizar o
                  pagamento de {formattedAmount} MZN
                </Text>
              </View>
            </View>
          )}

          {selectedMethod === "visa" && (
            <View style={{ gap: 16 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#1E293B",
                  marginBottom: 4,
                  fontFamily: "Poppins_700Bold",
                }}
              >
                Detalhes do Cartão
              </Text>

              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#1E293B",
                    marginBottom: 8,
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  Número do Cartão
                </Text>
                <TextInput
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#94A3B8"
                  keyboardType="number-pad"
                  maxLength={16}
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

              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#1E293B",
                      marginBottom: 8,
                      fontFamily: "Poppins_600SemiBold",
                    }}
                  >
                    Validade
                  </Text>
                  <TextInput
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    placeholder="MM/AA"
                    placeholderTextColor="#94A3B8"
                    keyboardType="number-pad"
                    maxLength={5}
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

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#1E293B",
                      marginBottom: 8,
                      fontFamily: "Poppins_600SemiBold",
                    }}
                  >
                    CVV
                  </Text>
                  <TextInput
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="123"
                    placeholderTextColor="#94A3B8"
                    keyboardType="number-pad"
                    maxLength={3}
                    secureTextEntry
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
              </View>
            </View>
          )}

          {/* Total Amount */}
          <View
            style={{
              backgroundColor: "#1E293B",
              padding: 20,
              borderRadius: 16,
              marginTop: 24,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "#D4AF37",
                marginBottom: 8,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              Total a Pagar
            </Text>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "700",
                color: "#FFFFFF",
                fontFamily: "Poppins_700Bold",
              }}
            >
              {formattedAmount} MZN
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#94A3B8",
                marginTop: 4,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Pagamento anual do seguro
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
          <TouchableOpacity
            onPress={handlePayment}
            disabled={!canProceed() || processing}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                canProceed() && !processing
                  ? ["#10B981", "#059669"]
                  : ["#CBD5E1", "#94A3B8"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
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
                {processing ? "A Processar..." : "Confirmar Pagamento"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}



