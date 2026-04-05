import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, CheckCircle2, ArrowRight } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { MotiView } from "moti";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import {
  getCheapestInsurer,
  formatMZN,
} from "@/utils/pricing/insurancePricing";

export default function SeguroDetalhesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  // Get cheapest insurer for this insurance type
  const cheapestInsurer = getCheapestInsurer(params.type || "auto");

  const insuranceDetails = {
    auto: {
      title: "Seguro Automóvel",
      description: "Proteja o seu veículo contra todos os riscos da estrada",
      image:
        "https://raw.createusercontent.com/9b99204e-f462-433b-bf50-e6373aae9721/",
      longDescription:
        "O nosso seguro automóvel oferece cobertura completa para o seu veículo, incluindo danos próprios, responsabilidade civil, roubo e incêndio. Com assistência 24/7 em todo o território nacional.",
      benefits: [
        "Cobertura contra danos próprios",
        "Responsabilidade civil até 50M MZN",
        "Protecção contra roubo e incêndio",
        "Assistência em viagem 24/7",
        "Carro de substituição",
        "Protecção de vidros e faróis",
      ],
      color: "#3B82F6",
    },
    vida: {
      title: "Seguro de Vida",
      description: "Proteja o futuro da sua família",
      image:
        "https://raw.createusercontent.com/36159144-d419-4b7e-aae1-8af59d1e503a/",
      longDescription:
        "Um seguro de vida que garante a segurança financeira da sua família em momentos difíceis. Cobertura completa incluindo morte natural, acidental e invalidez permanente.",
      benefits: [
        "Cobertura de morte natural e acidental",
        "Invalidez total e permanente",
        "Doenças graves cobertas",
        "Assistência funeral incluída",
        "Sem período de carência",
        "Pagamento rápido aos beneficiários",
      ],
      color: "#EF4444",
    },
    habitacao: {
      title: "Seguro Habitação",
      description: "Proteja o seu lar e tudo o que é importante",
      image:
        "https://raw.createusercontent.com/6bb3806c-8e20-4cc2-b6ee-578c7a9604df/",
      longDescription:
        "Proteja a sua casa contra incêndios, roubos, danos causados pela água e desastres naturais. Inclui cobertura para conteúdos e responsabilidade civil familiar.",
      benefits: [
        "Cobertura contra incêndio",
        "Protecção contra roubo",
        "Danos causados pela água",
        "Responsabilidade civil familiar",
        "Cobertura de conteúdos",
        "Assistência domiciliária 24/7",
      ],
      color: "#10B981",
    },
    viagem: {
      title: "Seguro Viagem",
      description: "Viaje com tranquilidade para qualquer destino",
      image:
        "https://raw.createusercontent.com/b3f8cf92-c0e5-45e6-84b3-8950ac3c4459/",
      longDescription:
        "Cobertura completa para as suas viagens ao exterior. Inclui despesas médicas, cancelamento de viagem, perda de bagagem e muito mais.",
      benefits: [
        "Despesas médicas até 50.000 USD",
        "Cancelamento e interrupção de viagem",
        "Perda e atraso de bagagem",
        "Assistência jurídica no estrangeiro",
        "Repatriação sanitária",
        "Cobertura COVID-19",
      ],
      color: "#8B5CF6",
    },
    empresarial: {
      title: "Seguro Empresarial",
      description: "Proteja o seu negócio e garanta a continuidade",
      image:
        "https://raw.createusercontent.com/9b99204e-f462-433b-bf50-e6373aae9721/",
      longDescription:
        "Soluções completas de seguro para empresas de todos os tamanhos. Proteja os seus activos, funcionários e operações contra diversos riscos.",
      benefits: [
        "Cobertura de propriedade comercial",
        "Responsabilidade civil empresarial",
        "Protecção de equipamentos",
        "Interrupção de negócio",
        "Acidentes de trabalho",
        "Cobertura de transporte de mercadorias",
      ],
      color: "#F59E0B",
    },
    acidentes: {
      title: "Acidentes Pessoais",
      description: "Protecção completa contra acidentes",
      image:
        "https://raw.createusercontent.com/4752b8c5-cebe-4291-b2b5-bd6d0cf579d2/",
      longDescription:
        "Cobertura contra acidentes pessoais que possam ocorrer no trabalho, em casa ou durante actividades de lazer. Proteja-se e à sua família.",
      benefits: [
        "Morte acidental",
        "Invalidez permanente",
        "Despesas médicas",
        "Diária de internamento",
        "Assistência funeral",
        "Cobertura 24 horas",
      ],
      color: "#EC4899",
    },
  };

  const details = insuranceDetails[params.type] || insuranceDetails.auto;

  const handleSubscription = (billing) => {
    // Navigate to confirmation page with quote details
    router.push({
      pathname: "/cotacao/revisar-cotacao",
      params: {
        type: params.type,
        billing: billing,
        company: cheapestInsurer?.company,
        companyId: cheapestInsurer?.companyId,
        price:
          billing === "mensal"
            ? cheapestInsurer?.monthly
            : cheapestInsurer?.yearly,
      },
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="light" />

      <View style={{ height: 300 }}>
        <Image
          source={{ uri: details.image }}
          style={{ width: "100%", height: "100%", position: "absolute" }}
          contentFit="cover"
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />

        <View
          style={{
            paddingTop: insets.top + 12,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronLeft size={24} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 24,
            left: 20,
            right: 20,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "700",
              color: "#FFFFFF",
              fontFamily: "Montserrat_700Bold",
              marginBottom: 8,
            }}
          >
            {details.title}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#FFFFFF",
              fontFamily: "Montserrat_400Regular",
              opacity: 0.9,
            }}
          >
            {details.description}
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            padding: 20,
            borderRadius: 16,
            backgroundColor: "#FFFFFF",
            marginBottom: 28,
            marginTop: -40,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 4,
            borderWidth: 1,
            borderColor: "#E2E8F0",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "#475569",
              fontFamily: "Montserrat_400Regular",
              lineHeight: 24,
            }}
          >
            {details.longDescription}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#1E293B",
            marginBottom: 16,
            fontFamily: "Montserrat_700Bold",
          }}
        >
          Benefícios Incluídos
        </Text>

        <View style={{ gap: 12, marginBottom: 32 }}>
          {details.benefits.map((benefit, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: "timing", duration: 300, delay: index * 50 }}
            >
              <View
                style={{
                  padding: 16,
                  borderRadius: 12,
                  backgroundColor: "#FFFFFF",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  borderWidth: 1,
                  borderColor: "#E2E8F0",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <CheckCircle2
                  size={22}
                  color={details.color}
                  strokeWidth={2.5}
                />
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: "#334155",
                    fontFamily: "Montserrat_500Medium",
                    lineHeight: 20,
                  }}
                >
                  {benefit}
                </Text>
              </View>
            </MotiView>
          ))}
        </View>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#1E293B",
            marginBottom: 16,
            fontFamily: "Montserrat_700Bold",
          }}
        >
          Escolha a Subscrição
        </Text>

        <View style={{ gap: 16, marginBottom: 32 }}>
          <TouchableOpacity
            onPress={() => handleSubscription("mensal")}
            activeOpacity={0.8}
          >
            <View
              style={{
                padding: 20,
                borderRadius: 16,
                backgroundColor: "#FFFFFF",
                borderWidth: 2,
                borderColor: "#E0E7FF",
                shadowColor: details.color,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#64748B",
                    fontFamily: "Montserrat_600SemiBold",
                  }}
                >
                  Subscrição Mensal
                </Text>
                <ArrowRight size={20} color={details.color} />
              </View>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "700",
                  color: details.color,
                  fontFamily: "Montserrat_700Bold",
                }}
              >
                {formatMZN(cheapestInsurer?.monthly || 0)} MZN
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#94A3B8",
                  marginTop: 4,
                  fontFamily: "Montserrat_400Regular",
                }}
              >
                Pagamento mensal • Flexibilidade total
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSubscription("anual")}
            activeOpacity={0.8}
          >
            <View
              style={{
                padding: 20,
                borderRadius: 16,
                backgroundColor: "#F0FDF4",
                borderWidth: 2,
                borderColor: "#86EFAC",
                shadowColor: "#10B981",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: -10,
                  right: 20,
                  backgroundColor: "#10B981",
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: "#FFFFFF",
                    fontFamily: "Montserrat_700Bold",
                  }}
                >
                  ⚡ POUPE 10%
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#059669",
                    fontFamily: "Montserrat_600SemiBold",
                  }}
                >
                  Subscrição Anual
                </Text>
                <ArrowRight size={20} color="#10B981" />
              </View>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "700",
                  color: "#10B981",
                  fontFamily: "Montserrat_700Bold",
                }}
              >
                {formatMZN(cheapestInsurer?.yearly || 0)} MZN
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: "#059669",
                  marginTop: 4,
                  fontFamily: "Montserrat_400Regular",
                }}
              >
                Pagamento anual • Maior economia
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}



