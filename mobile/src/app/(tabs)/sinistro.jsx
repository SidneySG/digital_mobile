import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  AlertTriangle,
  FileText,
  Phone,
  MessageCircle,
  Wrench,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function SinistroScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar style="light" />

      {/* Header */}
      <LinearGradient
        colors={["#0F172A", "#1E293B", "#334155"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 24,
          paddingBottom: 32,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "rgba(255,255,255,0.2)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <AlertTriangle size={40} color="#FFFFFF" strokeWidth={2} />
          </View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#FFFFFF",
              fontFamily: "Montserrat_700Bold",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Gestão de Sinistros
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "#D4AF37",
              fontFamily: "Montserrat_500Medium",
              textAlign: "center",
            }}
          >
            Estamos aqui para ajudar você
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 24,
          paddingBottom: insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Emergency Alert */}
        <View
          style={{
            backgroundColor: "#FFF7ED",
            padding: 18,
            borderRadius: 16,
            borderLeftWidth: 4,
            borderLeftColor: "#F59E0B",
            marginBottom: 32,
            shadowColor: "#F59E0B",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <View style={{ flexDirection: "row", gap: 12 }}>
            <AlertTriangle size={20} color="#F59E0B" strokeWidth={2.5} />
            <Text
              style={{
                flex: 1,
                fontSize: 13,
                color: "#92400E",
                fontFamily: "Montserrat_500Medium",
                lineHeight: 20,
              }}
            >
              Em caso de emergência, contacte os serviços de emergência antes de
              registar o sinistro.
            </Text>
          </View>
        </View>

        {/* Main Actions */}
        <View style={{ gap: 16, marginBottom: 32 }}>
          {/* Register Claim */}
          <TouchableOpacity
            onPress={() => router.push("/sinistro/verificar-apolice")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#1E40AF", "#3B82F6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                padding: 24,
                borderRadius: 20,
                shadowColor: "#1E40AF",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 20,
                    backgroundColor: "rgba(255,255,255,0.25)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FileText size={32} color="#FFFFFF" strokeWidth={2} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      color: "#FFFFFF",
                      fontFamily: "Montserrat_700Bold",
                      marginBottom: 6,
                    }}
                  >
                    Registar Sinistro
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#DBEAFE",
                      fontFamily: "Montserrat_400Regular",
                      lineHeight: 20,
                    }}
                  >
                    Participar ocorrência junto à seguradora
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Request Quotes for Repair */}
          <TouchableOpacity
            onPress={() => router.push("/sinistro/pedir-cotacoes")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#059669", "#10B981"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                padding: 24,
                borderRadius: 20,
                shadowColor: "#10B981",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 20,
                    backgroundColor: "rgba(255,255,255,0.25)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Wrench size={32} color="#FFFFFF" strokeWidth={2} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      color: "#FFFFFF",
                      fontFamily: "Montserrat_700Bold",
                      marginBottom: 6,
                    }}
                  >
                    Pedir Cotações
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#D1FAE5",
                      fontFamily: "Montserrat_400Regular",
                      lineHeight: 20,
                    }}
                  >
                    Receber propostas de oficinas para reparação
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#1E293B",
            marginBottom: 16,
            fontFamily: "Montserrat_700Bold",
          }}
        >
          Precisa de Ajuda Imediata?
        </Text>

        <View style={{ gap: 12, marginBottom: 32 }}>
          {/* Phone Support */}
          <TouchableOpacity activeOpacity={0.8}>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 20,
                borderRadius: 16,
                borderWidth: 2,
                borderColor: "#DBEAFE",
                shadowColor: "#2563EB",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: "#EFF6FF",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Phone size={24} color="#2563EB" strokeWidth={2} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: "#64748B",
                      fontFamily: "Montserrat_600SemiBold",
                      marginBottom: 4,
                    }}
                  >
                    Linha de Apoio
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: "#2563EB",
                      fontFamily: "Montserrat_700Bold",
                    }}
                  >
                    +258 84 000 0000
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      color: "#94A3B8",
                      marginTop: 2,
                      fontFamily: "Montserrat_400Regular",
                    }}
                  >
                    Disponível 24/7
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* WhatsApp Support */}
          <TouchableOpacity activeOpacity={0.8}>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 20,
                borderRadius: 16,
                borderWidth: 2,
                borderColor: "#D1FAE5",
                shadowColor: "#10B981",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: "#ECFDF5",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MessageCircle size={24} color="#10B981" strokeWidth={2} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: "#64748B",
                      fontFamily: "Montserrat_600SemiBold",
                      marginBottom: 4,
                    }}
                  >
                    WhatsApp
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: "#10B981",
                      fontFamily: "Montserrat_700Bold",
                    }}
                  >
                    +258 84 000 0000
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      color: "#94A3B8",
                      marginTop: 2,
                      fontFamily: "Montserrat_400Regular",
                    }}
                  >
                    Resposta rápida
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Documents Info */}
        <View
          style={{
            backgroundColor: "#F8FAFC",
            padding: 20,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#E2E8F0",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: "#1E293B",
              marginBottom: 16,
              fontFamily: "Montserrat_700Bold",
            }}
          >
            Documentos Necessários
          </Text>
          <View style={{ gap: 10 }}>
            {[
              "Apólice de seguro",
              "Documento de identificação",
              "Carta de condução (se aplicável)",
              "Fotos do local/danos",
              "Relatório policial (se aplicável)",
            ].map((doc, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "#2563EB",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#FFFFFF",
                      fontFamily: "Montserrat_700Bold",
                    }}
                  >
                    ✓
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#475569",
                    fontFamily: "Montserrat_400Regular",
                    flex: 1,
                  }}
                >
                  {doc}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



