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
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import {
  Car,
  Heart,
  Home,
  Plane,
  Briefcase,
  Shield,
  ChevronRight,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function SegurosScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const insuranceTypes = [
    {
      id: "auto",
      title: "Seguro Automóvel",
      description: "Proteja o seu veículo contra acidentes, roubo e danos",
      icon: Car,
      color: "#3B82F6",
    },
    {
      id: "vida",
      title: "Seguro de Vida",
      description: "Proteja sua família e garanta o futuro deles",
      icon: Heart,
      color: "#EF4444",
    },
    {
      id: "habitacao",
      title: "Seguro Habitação",
      description: "Proteja o seu lar contra incêndios, roubos e desastres",
      icon: Home,
      color: "#10B981",
    },
    {
      id: "viagem",
      title: "Seguro Viagem",
      description: "Viaje com tranquilidade e assistência completa",
      icon: Plane,
      color: "#8B5CF6",
    },
    {
      id: "empresarial",
      title: "Seguro Empresarial",
      description: "Proteja o seu negócio e os seus colaboradores",
      icon: Briefcase,
      color: "#F59E0B",
    },
    {
      id: "acidentes",
      title: "Acidentes Pessoais",
      description: "Cobertura em caso de acidentes pessoais",
      icon: Shield,
      color: "#EC4899",
    },
  ];

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="light" />

      {/* Header with Gradient */}
      <LinearGradient
        colors={["#1E293B", "#334155", "#475569"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 12,
          paddingHorizontal: 20,
          paddingBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#FFFFFF",
            fontFamily: "Poppins_700Bold",
          }}
        >
          Seguros
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#D4AF37",
            marginTop: 4,
            fontFamily: "Poppins_400Regular",
          }}
        >
          Escolha o seguro ideal para si
        </Text>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 84 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 16 }}>
          {insuranceTypes.map((insurance) => {
            const IconComponent = insurance.icon;
            return (
              <TouchableOpacity
                key={insurance.id}
                onPress={() => router.push("/cotacao")}
                activeOpacity={0.7}
              >
                <GlassView
                  isInteractive={true}
                  style={[
                    {
                      padding: 20,
                      borderRadius: 20,
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
                      width: 64,
                      height: 64,
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
                    <IconComponent size={32} color="#FFFFFF" />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "700",
                        color: "#1E293B",
                        fontFamily: "Poppins_700Bold",
                        marginBottom: 4,
                      }}
                    >
                      {insurance.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#64748B",
                        fontFamily: "Poppins_400Regular",
                        lineHeight: 18,
                      }}
                    >
                      {insurance.description}
                    </Text>
                  </View>

                  <ChevronRight size={24} color="#94A3B8" />
                </GlassView>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}



