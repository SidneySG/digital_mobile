import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  Landmark,
  Calendar,
  CheckCircle2,
  Clock,
  Receipt,
  CreditCard,
  LogOut,
  User,
} from "lucide-react-native";
import { Image } from "expo-image";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { MotiView } from "moti";
import { useEstmAuth } from "@/utils/estm/useEstmAuth";
import { EstmLoginForm } from "@/components/Tributacao/EstmLoginForm";

export default function TributacaoScreen() {
  const insets = useSafeAreaInsets();
  const {
    nic,
    loading: authLoading,
    isAuthenticated,
    login,
    logout,
  } = useEstmAuth();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const [tributes, setTributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState("all"); // all, pending, paid

  useEffect(() => {
    if (isAuthenticated && nic) {
      fetchTributes();
    }
  }, [isAuthenticated, nic]);

  const fetchTributes = async () => {
    if (!nic) return;

    try {
      setLoading(true);
      // Buscar tributos por NIC
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_PROXY_BASE_URL}/api/tributes/by-nic?nic=${nic}`,
      );

      if (response.ok) {
        const data = await response.json();
        setTributes(data.tributes || []);
      }
    } catch (error) {
      console.error("Error fetching tributes:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTributes();
  };

  const handleLogin = async (nicValue, remember) => {
    const result = await login(nicValue, remember);
    return result;
  };

  const handleLogout = async () => {
    await logout();
    setTributes([]);
  };

  const formatMZN = (value) => {
    return new Intl.NumberFormat("pt-MZ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-MZ", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredTributes = tributes.filter((tribute) => {
    if (filter === "all") return true;
    if (filter === "pending") return tribute.payment_status === "pending";
    if (filter === "paid") return tribute.payment_status === "paid";
    return true;
  });

  const totalPending = tributes
    .filter((t) => t.payment_status === "pending")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  if (!fontsLoaded || authLoading) {
    return null;
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <EstmLoginForm onLogin={handleLogin} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="light" />

      {/* Header with e-STM Logo */}
      <LinearGradient
        colors={["#1E3A8A", "#2563EB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          <Image
            source={{
              uri: "https://ucarecdn.com/6f9ea6a0-c190-49ec-a211-e357ade7753f/-/format/auto/",
            }}
            style={{ width: 120, height: 80 }}
            contentFit="contain"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Landmark size={28} color="#FFFFFF" />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "700",
                    color: "#FFFFFF",
                    fontFamily: "Montserrat_700Bold",
                  }}
                >
                  Tributação
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#DBEAFE",
                    marginTop: 4,
                    fontFamily: "Montserrat_400Regular",
                  }}
                >
                  Sistema integrado e-STM
                </Text>
              </View>
            </View>
            {/* NIC Display */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginTop: 12,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
                alignSelf: "flex-start",
              }}
            >
              <User size={16} color="#FFFFFF" />
              <Text
                style={{
                  fontSize: 13,
                  color: "#FFFFFF",
                  fontFamily: "Montserrat_500Medium",
                }}
              >
                NIC: {nic}
              </Text>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.7}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LogOut size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 84,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Summary Card */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400 }}
          style={{ marginBottom: 24 }}
        >
          <LinearGradient
            colors={["#DC2626", "#EF4444"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 24,
              borderRadius: 20,
              shadowColor: "#DC2626",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#FEE2E2",
                fontFamily: "Montserrat_500Medium",
                marginBottom: 8,
              }}
            >
              Total Pendente
            </Text>
            <Text
              style={{
                fontSize: 36,
                fontWeight: "700",
                color: "#FFFFFF",
                fontFamily: "Montserrat_700Bold",
              }}
            >
              {formatMZN(totalPending)} MZN
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#FEE2E2",
                marginTop: 8,
                fontFamily: "Montserrat_400Regular",
              }}
            >
              {tributes.filter((t) => t.payment_status === "pending").length}{" "}
              tributo(s) por pagar
            </Text>
          </LinearGradient>
        </MotiView>

        {/* Filter Buttons */}
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            marginBottom: 20,
            justifyContent: "center",
          }}
        >
          {[
            { id: "all", label: "Todos" },
            { id: "pending", label: "Pendentes" },
            { id: "paid", label: "Pagos" },
          ].map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setFilter(item.id)}
              activeOpacity={0.7}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: filter === item.id ? "#2563EB" : "#FFFFFF",
                borderWidth: 1,
                borderColor: filter === item.id ? "#2563EB" : "#E2E8F0",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: filter === item.id ? "#FFFFFF" : "#64748B",
                  fontFamily: "Montserrat_600SemiBold",
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tributes List */}
        {loading ? (
          <View style={{ padding: 40, alignItems: "center" }}>
            <ActivityIndicator size="large" color="#2563EB" />
            <Text
              style={{
                marginTop: 16,
                fontSize: 14,
                color: "#64748B",
                fontFamily: "Montserrat_400Regular",
              }}
            >
              Carregando tributos...
            </Text>
          </View>
        ) : filteredTributes.length === 0 ? (
          <View
            style={{
              padding: 40,
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#E2E8F0",
            }}
          >
            <Landmark size={48} color="#CBD5E1" />
            <Text
              style={{
                marginTop: 16,
                fontSize: 16,
                fontWeight: "600",
                color: "#64748B",
                fontFamily: "Montserrat_600SemiBold",
                textAlign: "center",
              }}
            >
              Nenhum tributo encontrado
            </Text>
            <Text
              style={{
                marginTop: 8,
                fontSize: 14,
                color: "#94A3B8",
                fontFamily: "Montserrat_400Regular",
                textAlign: "center",
              }}
            >
              Seus tributos aparecerão aqui
            </Text>
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            {filteredTributes.map((tribute, index) => {
              const isPaid = tribute.payment_status === "paid";
              const isPending = tribute.payment_status === "pending";
              const isOverdue =
                isPending && new Date(tribute.due_date) < new Date();

              return (
                <MotiView
                  key={tribute.id}
                  from={{ opacity: 0, translateX: -20 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{
                    type: "timing",
                    duration: 300,
                    delay: index * 100,
                  }}
                >
                  <GlassView
                    isInteractive={false}
                    style={[
                      {
                        padding: 18,
                        borderRadius: 16,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.06,
                        shadowRadius: 6,
                        elevation: 2,
                      },
                      isLiquidGlassAvailable()
                        ? {}
                        : {
                            opacity: 0.9,
                            backgroundColor: "#FFFFFF",
                            borderWidth: 1,
                            borderColor: "#E2E8F0",
                          },
                    ]}
                  >
                    {/* Status Badge */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 12,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: isPaid
                            ? "#DCFCE7"
                            : isOverdue
                              ? "#FEE2E2"
                              : "#FEF3C7",
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 8,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        {isPaid ? (
                          <CheckCircle2 size={14} color="#16A34A" />
                        ) : (
                          <Clock
                            size={14}
                            color={isOverdue ? "#DC2626" : "#F59E0B"}
                          />
                        )}
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "600",
                            color: isPaid
                              ? "#16A34A"
                              : isOverdue
                                ? "#DC2626"
                                : "#F59E0B",
                            fontFamily: "Montserrat_600SemiBold",
                          }}
                        >
                          {isPaid ? "Pago" : isOverdue ? "Vencido" : "Pendente"}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 11,
                          color: "#94A3B8",
                          fontFamily: "Montserrat_400Regular",
                        }}
                      >
                        {tribute.tribute_type}
                      </Text>
                    </View>

                    {/* Tribute Details */}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#1E293B",
                        fontFamily: "Montserrat_700Bold",
                        marginBottom: 4,
                      }}
                    >
                      {tribute.tribute_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#64748B",
                        fontFamily: "Montserrat_400Regular",
                        marginBottom: 12,
                      }}
                    >
                      {tribute.reference_number}
                    </Text>

                    {/* Amount and Date */}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: isPending ? 16 : 0,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#64748B",
                            fontFamily: "Montserrat_400Regular",
                            marginBottom: 4,
                          }}
                        >
                          Valor
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "700",
                            color: "#1E293B",
                            fontFamily: "Montserrat_700Bold",
                          }}
                        >
                          {formatMZN(tribute.amount)} MZN
                        </Text>
                      </View>
                      <View style={{ alignItems: "flex-end" }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#64748B",
                            fontFamily: "Montserrat_400Regular",
                            marginBottom: 4,
                          }}
                        >
                          {isPaid ? "Pago em" : "Vencimento"}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <Calendar size={16} color="#64748B" />
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "600",
                              color: "#1E293B",
                              fontFamily: "Montserrat_600SemiBold",
                            }}
                          >
                            {formatDate(
                              isPaid ? tribute.payment_date : tribute.due_date,
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Pay Button */}
                    {isPending && (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                          backgroundColor: "#2563EB",
                          padding: 14,
                          borderRadius: 12,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                        }}
                      >
                        <CreditCard size={20} color="#FFFFFF" />
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "600",
                            color: "#FFFFFF",
                            fontFamily: "Montserrat_600SemiBold",
                          }}
                        >
                          Pagar Agora
                        </Text>
                      </TouchableOpacity>
                    )}

                    {/* Payment Reference */}
                    {isPaid && tribute.payment_reference && (
                      <View
                        style={{
                          marginTop: 12,
                          padding: 12,
                          backgroundColor: "#F1F5F9",
                          borderRadius: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <Receipt size={16} color="#64748B" />
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#64748B",
                              fontFamily: "Montserrat_500Medium",
                            }}
                          >
                            Ref: {tribute.payment_reference}
                          </Text>
                        </View>
                      </View>
                    )}
                  </GlassView>
                </MotiView>
              );
            })}
          </View>
        )}

        {/* Info Box */}
        <View
          style={{
            backgroundColor: "#EFF6FF",
            padding: 18,
            borderRadius: 16,
            marginTop: 24,
            borderWidth: 1,
            borderColor: "#BFDBFE",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: "#1E40AF",
              lineHeight: 20,
              fontFamily: "Montserrat_400Regular",
            }}
          >
            ℹ️ Os tributos autárquicos são integrados automaticamente do sistema
            e-STM. Pague com facilidade através do app e mantenha suas
            obrigações em dia.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}



