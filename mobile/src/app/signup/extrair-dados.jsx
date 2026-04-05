import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, Scan, CheckCircle2, User } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { MotiView } from "moti";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function ExtrairDadosScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [extracting, setExtracting] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    idNumber: "",
    nationality: "",
    address: "",
    email: "",
    phone: "",
  });

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    // Simulate OCR extraction
    setTimeout(() => {
      // Mock extracted data - in production this would call an OCR API
      setFormData({
        fullName: "ANDRÉ MIGUEL DOS SANTOS",
        dateOfBirth: "15/03/1992",
        idNumber: "110200012345T",
        nationality: "Moçambicana",
        address: "Av. Julius Nyerere, Maputo",
        email: "",
        phone: "",
      });
      setExtracting(false);
    }, 3000);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleContinue = () => {
    if (!formData.email || !formData.phone) {
      alert("Por favor, preencha o email e telefone");
      return;
    }

    router.push({
      pathname: "/signup/finalizar-cadastro",
      params: {
        ...formData,
        accountType: params.accountType,
      },
    });
  };

  const documentImage = params.type === "bi" ? params.front : params.passport;

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
          Extração de Dados
        </Text>
      </View>

      {extracting ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "timing", duration: 400 }}
            style={{ alignItems: "center" }}
          >
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: "#EFF6FF",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
              }}
            >
              <Scan size={56} color="#3B82F6" />
            </View>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#1E293B",
                fontFamily: "Poppins_700Bold",
                marginTop: 24,
                textAlign: "center",
              }}
            >
              A Extrair Dados...
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#64748B",
                fontFamily: "Poppins_400Regular",
                marginTop: 8,
                textAlign: "center",
                lineHeight: 22,
              }}
            >
              Estamos a processar o seu documento com OCR para extrair as
              informações automaticamente
            </Text>
          </MotiView>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: 20,
            paddingBottom: insets.bottom + 100,
          }}
        >
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 400 }}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
                borderWidth: 1,
                borderColor: "#10B981",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <CheckCircle2 size={24} color="#10B981" />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#10B981",
                    fontFamily: "Poppins_700Bold",
                  }}
                >
                  Extração Concluída!
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 13,
                  color: "#059669",
                  fontFamily: "Poppins_400Regular",
                  lineHeight: 20,
                }}
              >
                Os dados foram extraídos do documento. Verifique as informações
                abaixo e complete os campos em falta.
              </Text>
            </View>
          </MotiView>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#1E293B",
              fontFamily: "Poppins_700Bold",
              marginBottom: 16,
            }}
          >
            Informações Extraídas
          </Text>

          <View style={{ gap: 16 }}>
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
                Nome Completo *
              </Text>
              <TextInput
                value={formData.fullName}
                onChangeText={(text) =>
                  setFormData({ ...formData, fullName: text })
                }
                style={{
                  backgroundColor: "#F8FAFC",
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
                Data de Nascimento *
              </Text>
              <TextInput
                value={formData.dateOfBirth}
                onChangeText={(text) =>
                  setFormData({ ...formData, dateOfBirth: text })
                }
                placeholder="DD/MM/AAAA"
                style={{
                  backgroundColor: "#F8FAFC",
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
                Número de Identificação *
              </Text>
              <TextInput
                value={formData.idNumber}
                onChangeText={(text) =>
                  setFormData({ ...formData, idNumber: text })
                }
                style={{
                  backgroundColor: "#F8FAFC",
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
                Nacionalidade *
              </Text>
              <TextInput
                value={formData.nationality}
                onChangeText={(text) =>
                  setFormData({ ...formData, nationality: text })
                }
                style={{
                  backgroundColor: "#F8FAFC",
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
                Morada *
              </Text>
              <TextInput
                value={formData.address}
                onChangeText={(text) =>
                  setFormData({ ...formData, address: text })
                }
                style={{
                  backgroundColor: "#F8FAFC",
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
                Email *
              </Text>
              <TextInput
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                placeholder="exemplo@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1,
                  borderColor: "#3B82F6",
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
                Telefone *
              </Text>
              <TextInput
                value={formData.phone}
                onChangeText={(text) =>
                  setFormData({ ...formData, phone: text })
                }
                placeholder="+258 84 123 4567"
                keyboardType="phone-pad"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1,
                  borderColor: "#3B82F6",
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 15,
                  color: "#1E293B",
                  fontFamily: "Poppins_400Regular",
                }}
              />
            </View>
          </View>
        </ScrollView>
      )}

      {!extracting && (
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
            onPress={handleContinue}
            activeOpacity={0.8}
            disabled={!formData.email || !formData.phone}
          >
            <View
              style={{
                backgroundColor:
                  formData.email && formData.phone ? "#3B82F6" : "#CBD5E1",
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
                Finalizar Cadastro
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}



