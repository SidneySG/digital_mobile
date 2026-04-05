import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import {
  User,
  Bell,
  Lock,
  HelpCircle,
  FileText,
  Power,
  ChevronRight,
  Globe,
  Check,
  UserPlus,
  LogIn,
} from "lucide-react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useState, useEffect } from "react";
import { useLanguageStore } from "@/utils/language/store";
import { useTranslation } from "@/utils/language/useTranslation";
import { useAuth } from "@/utils/auth/useAuth";
import { useRouter } from "expo-router";

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { language, setLanguage, loadLanguage } = useLanguageStore();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const { auth, signOut, signIn } = useAuth();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    loadLanguage();
  }, []);

  const settingsOptions = [
    {
      id: "account",
      icon: User,
      title: t("profile.personalData"),
      subtitle: t("profile.personalDataSubtitle"),
    },
    {
      id: "notifications",
      icon: Bell,
      title: t("profile.notifications"),
      subtitle: t("profile.notificationsSubtitle"),
    },
    {
      id: "security",
      icon: Lock,
      title: t("profile.security"),
      subtitle: t("profile.securitySubtitle"),
    },
    {
      id: "language",
      icon: Globe,
      title: t("profile.language"),
      subtitle: t("profile.languageSubtitle"),
      onPress: () => setShowLanguageModal(true),
    },
    {
      id: "documents",
      icon: FileText,
      title: t("profile.documents"),
      subtitle: t("profile.documentsSubtitle"),
    },
    {
      id: "help",
      icon: HelpCircle,
      title: t("profile.help"),
      subtitle: t("profile.helpSubtitle"),
    },
  ];

  if (!fontsLoaded) {
    return null;
  }

  const handleLanguageChange = async (lang) => {
    await setLanguage(lang);
    setShowLanguageModal(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // If user is not authenticated, show login/signup prompt
  if (!auth) {
    return (
      <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
        <StatusBar style="light" />

        {/* Header with Gradient Background */}
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
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#D4AF37",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 3,
                borderColor: "#FFFFFF",
                marginBottom: 16,
              }}
            >
              <User size={40} color="#1E293B" />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: "#FFFFFF",
                fontFamily: "Montserrat_700Bold",
                textAlign: "center",
              }}
            >
              Bem-vindo
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#D4AF37",
                marginTop: 4,
                fontFamily: "Montserrat_400Regular",
                textAlign: "center",
              }}
            >
              Crie uma conta ou faça login
            </Text>
          </View>
        </LinearGradient>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 84 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
            {/* Create Account Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/signup/tipo-conta")}
            >
              <LinearGradient
                colors={["#2563EB", "#1D4ED8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  padding: 20,
                  borderRadius: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <UserPlus size={24} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: "#FFFFFF",
                      fontFamily: "Montserrat_700Bold",
                    }}
                  >
                    Criar Conta
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: "rgba(255, 255, 255, 0.9)",
                      marginTop: 2,
                      fontFamily: "Montserrat_400Regular",
                    }}
                  >
                    Junte-se a nós em poucos passos
                  </Text>
                </View>
                <ChevronRight size={24} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity activeOpacity={0.7} onPress={signIn}>
              <GlassView
                isInteractive={true}
                style={[
                  {
                    padding: 20,
                    borderRadius: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 16,
                  },
                  isLiquidGlassAvailable()
                    ? {}
                    : { opacity: 0.9, backgroundColor: "#FFFFFF" },
                ]}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "#EFF6FF",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LogIn size={24} color="#2563EB" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: "#1E293B",
                      fontFamily: "Montserrat_700Bold",
                    }}
                  >
                    Entrar
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#64748B",
                      marginTop: 2,
                      fontFamily: "Montserrat_400Regular",
                    }}
                  >
                    Já tem uma conta? Faça login
                  </Text>
                </View>
                <ChevronRight size={24} color="#94A3B8" />
              </GlassView>
            </TouchableOpacity>

            {/* Language Setting */}
            <View style={{ marginTop: 32 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#1E293B",
                  marginBottom: 12,
                  fontFamily: "Montserrat_700Bold",
                }}
              >
                Definições
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowLanguageModal(true)}
              >
                <GlassView
                  isInteractive={true}
                  style={[
                    {
                      padding: 16,
                      borderRadius: 16,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 16,
                    },
                    isLiquidGlassAvailable()
                      ? {}
                      : { opacity: 0.9, backgroundColor: "#FFFFFF" },
                  ]}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: "#FEF3C7",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Globe size={20} color="#F59E0B" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#1E293B",
                        fontFamily: "Montserrat_600SemiBold",
                      }}
                    >
                      {t("profile.language")}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#64748B",
                        marginTop: 2,
                        fontFamily: "Montserrat_400Regular",
                      }}
                    >
                      {t("profile.languageSubtitle")}
                    </Text>
                  </View>
                  <ChevronRight size={20} color="#94A3B8" />
                </GlassView>
              </TouchableOpacity>
            </View>

            {/* Benefits Section */}
            <View style={{ marginTop: 32 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#1E293B",
                  marginBottom: 12,
                  fontFamily: "Montserrat_700Bold",
                }}
              >
                Benefícios de ter uma conta
              </Text>
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: 20,
                  borderRadius: 16,
                  gap: 16,
                  borderWidth: 2,
                  borderColor: "#E2E8F0",
                }}
              >
                {[
                  {
                    icon: "📋",
                    title: "Gestão de Apólices",
                    desc: "Aceda a todas as suas apólices num só lugar",
                  },
                  {
                    icon: "💰",
                    title: "Histórico de Pagamentos",
                    desc: "Veja todos os seus pagamentos e recibos",
                  },
                  {
                    icon: "🔔",
                    title: "Notificações",
                    desc: "Receba alertas sobre renovações e sinistros",
                  },
                  {
                    icon: "📄",
                    title: "Portal Completo",
                    desc: "Acesso ao portal com todas as funcionalidades",
                  },
                ].map((benefit, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    <Text style={{ fontSize: 24 }}>{benefit.icon}</Text>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "600",
                          color: "#1E293B",
                          fontFamily: "Montserrat_600SemiBold",
                        }}
                      >
                        {benefit.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          color: "#64748B",
                          marginTop: 2,
                          fontFamily: "Montserrat_400Regular",
                        }}
                      >
                        {benefit.desc}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Language Selection Modal */}
        <Modal
          visible={showLanguageModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowLanguageModal(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                padding: 24,
                width: "100%",
                maxWidth: 400,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#1E293B",
                  marginBottom: 8,
                  fontFamily: "Montserrat_700Bold",
                  textAlign: "center",
                }}
              >
                {t("profile.selectLanguage")}
              </Text>

              <View style={{ gap: 12, marginTop: 24 }}>
                <TouchableOpacity
                  onPress={() => handleLanguageChange("pt")}
                  activeOpacity={0.7}
                >
                  <View
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      backgroundColor:
                        language === "pt" ? "#EFF6FF" : "#F8FAFC",
                      borderWidth: 2,
                      borderColor: language === "pt" ? "#2563EB" : "#E2E8F0",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: "#10B981",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ fontSize: 20 }}>🇵🇹</Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#1E293B",
                          fontFamily: "Montserrat_600SemiBold",
                        }}
                      >
                        {t("profile.portuguese")}
                      </Text>
                    </View>
                    {language === "pt" && <Check size={24} color="#2563EB" />}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleLanguageChange("en")}
                  activeOpacity={0.7}
                >
                  <View
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      backgroundColor:
                        language === "en" ? "#EFF6FF" : "#F8FAFC",
                      borderWidth: 2,
                      borderColor: language === "en" ? "#2563EB" : "#E2E8F0",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: "#3B82F6",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ fontSize: 20 }}>🇬🇧</Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#1E293B",
                          fontFamily: "Montserrat_600SemiBold",
                        }}
                      >
                        {t("profile.english")}
                      </Text>
                    </View>
                    {language === "en" && <Check size={24} color="#2563EB" />}
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => setShowLanguageModal(false)}
                activeOpacity={0.7}
                style={{ marginTop: 24 }}
              >
                <View
                  style={{
                    backgroundColor: "#F1F5F9",
                    padding: 16,
                    borderRadius: 12,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#64748B",
                      fontFamily: "Montserrat_600SemiBold",
                    }}
                  >
                    {t("common.cancel")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // Authenticated user UI
  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="light" />

      {/* Header with Gradient Background */}
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
        {/* User Info with Sign Out */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              flex: 1,
            }}
          >
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#D4AF37",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 3,
                borderColor: "#FFFFFF",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: "#1E293B",
                  fontFamily: "Montserrat_700Bold",
                }}
              >
                {auth?.user?.name?.charAt(0)?.toUpperCase() || "U"}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#FFFFFF",
                  fontFamily: "Montserrat_700Bold",
                }}
              >
                {auth?.user?.name || "Utilizador"}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#D4AF37",
                  marginTop: 2,
                  fontFamily: "Montserrat_400Regular",
                }}
              >
                {auth?.user?.email || "email@example.com"}
              </Text>
            </View>
          </View>

          {/* Sign Out Icon */}
          <TouchableOpacity activeOpacity={0.7} onPress={handleSignOut}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1.5,
                borderColor: "#EF4444",
              }}
            >
              <Power size={20} color="#EF4444" />
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 84 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <View style={{ gap: 12 }}>
            {settingsOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <TouchableOpacity
                  key={option.id}
                  activeOpacity={0.7}
                  onPress={option.onPress}
                >
                  <GlassView
                    isInteractive={true}
                    style={[
                      {
                        padding: 16,
                        borderRadius: 16,
                        overflow: "hidden",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 16,
                      },
                      isLiquidGlassAvailable()
                        ? {}
                        : { opacity: 0.9, backgroundColor: "#FFFFFF" },
                    ]}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        backgroundColor:
                          option.id === "language" ? "#FEF3C7" : "#EFF6FF",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconComponent
                        size={20}
                        color={option.id === "language" ? "#F59E0B" : "#2563EB"}
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#1E293B",
                          fontFamily: "Montserrat_600SemiBold",
                        }}
                      >
                        {option.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          color: "#64748B",
                          marginTop: 2,
                          fontFamily: "Montserrat_400Regular",
                        }}
                      >
                        {option.subtitle}
                      </Text>
                    </View>

                    <ChevronRight size={20} color="#94A3B8" />
                  </GlassView>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#1E293B",
              marginBottom: 16,
              fontFamily: "Montserrat_700Bold",
            }}
          >
            {t("profile.about")}
          </Text>

          <View
            style={{
              backgroundColor: "#FFFFFF",
              padding: 20,
              borderRadius: 16,
              gap: 12,
              borderWidth: 2,
              borderColor: "#E2E8F0",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#64748B",
                  fontFamily: "Montserrat_400Regular",
                }}
              >
                {t("profile.version")}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#1E293B",
                  fontFamily: "Montserrat_600SemiBold",
                }}
              >
                1.0.0
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#64748B",
                  fontFamily: "Montserrat_400Regular",
                }}
              >
                {t("profile.terms")}
              </Text>
              <ChevronRight size={16} color="#94A3B8" />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#64748B",
                  fontFamily: "Montserrat_400Regular",
                }}
              >
                {t("profile.privacy")}
              </Text>
              <ChevronRight size={16} color="#94A3B8" />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              padding: 24,
              width: "100%",
              maxWidth: 400,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#1E293B",
                marginBottom: 8,
                fontFamily: "Montserrat_700Bold",
                textAlign: "center",
              }}
            >
              {t("profile.selectLanguage")}
            </Text>

            <View style={{ gap: 12, marginTop: 24 }}>
              <TouchableOpacity
                onPress={() => handleLanguageChange("pt")}
                activeOpacity={0.7}
              >
                <View
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    backgroundColor: language === "pt" ? "#EFF6FF" : "#F8FAFC",
                    borderWidth: 2,
                    borderColor: language === "pt" ? "#2563EB" : "#E2E8F0",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: "#10B981",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>🇵🇹</Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#1E293B",
                        fontFamily: "Montserrat_600SemiBold",
                      }}
                    >
                      {t("profile.portuguese")}
                    </Text>
                  </View>
                  {language === "pt" && <Check size={24} color="#2563EB" />}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleLanguageChange("en")}
                activeOpacity={0.7}
              >
                <View
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    backgroundColor: language === "en" ? "#EFF6FF" : "#F8FAFC",
                    borderWidth: 2,
                    borderColor: language === "en" ? "#2563EB" : "#E2E8F0",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: "#3B82F6",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>🇬🇧</Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#1E293B",
                        fontFamily: "Montserrat_600SemiBold",
                      }}
                    >
                      {t("profile.english")}
                    </Text>
                  </View>
                  {language === "en" && <Check size={24} color="#2563EB" />}
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setShowLanguageModal(false)}
              activeOpacity={0.7}
              style={{ marginTop: 24 }}
            >
              <View
                style={{
                  backgroundColor: "#F1F5F9",
                  padding: 16,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#64748B",
                    fontFamily: "Montserrat_600SemiBold",
                  }}
                >
                  {t("common.cancel")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}



