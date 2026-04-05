import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  Car,
  Heart,
  Home,
  Plane,
  Briefcase,
  Shield,
  Package,
  Smartphone,
  Users,
  Ship,
  Building2,
  Truck,
  TrendingUp,
  DollarSign,
  Bike,
  Wrench,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { MotiView } from "moti";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function TodosSegurosScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const width = Dimensions.get("window").width;

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const allInsuranceTypes = [
    { id: "auto", title: "Seguro Automóvel", icon: Car, color: "#3B82F6" },
    { id: "vida", title: "Seguro de Vida", icon: Heart, color: "#EF4444" },
    {
      id: "habitacao",
      title: "Seguro Habitação",
      icon: Home,
      color: "#10B981",
    },
    { id: "viagem", title: "Seguro Viagem", icon: Plane, color: "#8B5CF6" },
    {
      id: "empresarial",
      title: "Seguro Empresarial",
      icon: Briefcase,
      color: "#F59E0B",
    },
    {
      id: "acidentes",
      title: "Acidentes Pessoais",
      icon: Shield,
      color: "#EC4899",
    },
    { id: "saude", title: "Seguro de Saúde", icon: Heart, color: "#EF4444" },
    { id: "maritimo", title: "Seguro Marítimo", icon: Ship, color: "#0EA5E9" },
    {
      id: "mercadorias",
      title: "Transporte de Mercadorias",
      icon: Truck,
      color: "#F97316",
    },
    {
      id: "obras",
      title: "Seguro de Obras",
      icon: Building2,
      color: "#94A3B8",
    },
    {
      id: "equipamentos",
      title: "Equipamentos Electrónicos",
      icon: Smartphone,
      color: "#6366F1",
    },
    {
      id: "responsabilidade",
      title: "Responsabilidade Civil",
      icon: Users,
      color: "#84CC16",
    },
    {
      id: "credito",
      title: "Seguro de Crédito",
      icon: DollarSign,
      color: "#22C55E",
    },
    {
      id: "agricola",
      title: "Seguro Agrícola",
      icon: Package,
      color: "#65A30D",
    },
    {
      id: "motociclo",
      title: "Seguro de Motociclos",
      icon: Bike,
      color: "#DC2626",
    },
    {
      id: "investimento",
      title: "Seguro de Investimento",
      icon: TrendingUp,
      color: "#059669",
    },
    {
      id: "maquinaria",
      title: "Avaria de Maquinaria",
      icon: Wrench,
      color: "#64748B",
    },
  ];

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="light" />

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
                fontFamily: "Montserrat_700Bold",
                lineHeight: 26,
              }}
            >
              Catálogo Completo
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#D4AF37",
                marginTop: 4,
                fontFamily: "Montserrat_500Medium",
              }}
            >
              Todos os seguros disponíveis
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 84 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#1E293B",
            marginBottom: 20,
            fontFamily: "Montserrat_700Bold",
          }}
        >
          {allInsuranceTypes.length} Tipos de Seguros
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
          {allInsuranceTypes.map((insurance, index) => {
            const IconComponent = insurance.icon;
            return (
              <MotiView
                key={insurance.id}
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "timing",
                  duration: 300,
                  delay: index * 30,
                }}
                style={{ width: (width - 52) / 2 }}
              >
                <TouchableOpacity
                  onPress={() =>
                    router.push(`/seguro-detalhes?type=${insurance.id}`)
                  }
                  activeOpacity={0.7}
                >
                  <View
                    style={{
                      padding: 20,
                      borderRadius: 16,
                      backgroundColor: "#FFFFFF",
                      alignItems: "center",
                      gap: 14,
                      minHeight: 140,
                      justifyContent: "center",
                      borderWidth: 2,
                      borderColor: "#E2E8F0",
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.08,
                      shadowRadius: 8,
                      elevation: 3,
                    }}
                  >
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 16,
                        backgroundColor: insurance.color,
                        alignItems: "center",
                        justifyContent: "center",
                        shadowColor: insurance.color,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 4,
                      }}
                    >
                      <IconComponent
                        size={32}
                        color="#FFFFFF"
                        strokeWidth={2}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: "#1E293B",
                        fontFamily: "Montserrat_600SemiBold",
                        textAlign: "center",
                        lineHeight: 18,
                      }}
                    >
                      {insurance.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              </MotiView>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}



