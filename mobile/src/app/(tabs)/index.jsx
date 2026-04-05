import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { LinearGradient } from "expo-linear-gradient";
import {
  Shield,
  Car,
  Home,
  Briefcase,
  Plane,
  Heart,
  Sparkles,
  Handshake,
  Users,
  Building2,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import Carousel from "react-native-reanimated-carousel";
import { useState, useRef, useEffect } from "react";
import { MotiView } from "moti";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const width = Dimensions.get("window").width;
  const [activeSlide, setActiveSlide] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const partnersScrollRef = useRef(null);
  const scrollPosition = useRef(0);
  const [partners, setPartners] = useState([]);
  const [partnersLoading, setPartnersLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const featuredInsurance = [
    {
      id: "auto",
      title: "Seguro Automóvel",
      description: "Proteja o seu veículo",
      icon: Car,
      color: "#3B82F6",
      image:
        "https://raw.createusercontent.com/9b99204e-f462-433b-bf50-e6373aae9721/",
      isNew: false,
      hasPromo: true,
    },
    {
      id: "vida",
      title: "Seguro de Vida",
      description: "Proteja sua família",
      icon: Heart,
      color: "#EF4444",
      image:
        "https://raw.createusercontent.com/36159144-d419-4b7e-aae1-8af59d1e503a/",
      isNew: true,
      hasPromo: false,
    },
    {
      id: "habitacao",
      title: "Seguro Habitação",
      description: "Proteja o seu lar",
      icon: Home,
      color: "#10B981",
      image:
        "https://raw.createusercontent.com/6bb3806c-8e20-4cc2-b6ee-578c7a9604df/",
      isNew: false,
      hasPromo: true,
    },
    {
      id: "viagem",
      title: "Seguro Viagem",
      description: "Viaje com segurança",
      icon: Plane,
      color: "#8B5CF6",
      image:
        "https://raw.createusercontent.com/b3f8cf92-c0e5-45e6-84b3-8950ac3c4459/",
      isNew: true,
      hasPromo: false,
    },
    {
      id: "empresarial",
      title: "Seguro Empresarial",
      description: "Proteja o seu negócio",
      icon: Building2,
      color: "#F59E0B",
      image:
        "https://raw.createusercontent.com/9b99204e-f462-433b-bf50-e6373aae9721/",
      isNew: false,
      hasPromo: true,
    },
    {
      id: "acidentes",
      title: "Acidentes Pessoais",
      description: "Cobertura completa",
      icon: Users,
      color: "#EC4899",
      image:
        "https://raw.createusercontent.com/4752b8c5-cebe-4291-b2b5-bd6d0cf579d2/",
      isNew: false,
      hasPromo: false,
    },
  ];

  const insuranceTypes = [
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
  ];

  // Fetch insurance companies from API
  useEffect(() => {
    fetchInsuranceCompanies();
  }, []);

  const fetchInsuranceCompanies = async () => {
    try {
      setPartnersLoading(true);
      const response = await fetch("/api/insurance-companies");
      if (!response.ok) throw new Error("Failed to fetch insurance companies");

      const data = await response.json();
      const activeCompanies = data.companies
        .filter((company) => company.active)
        .map((company) => ({
          name: company.name,
          logo: company.logo_url,
        }));

      setPartners(activeCompanies);
    } catch (error) {
      console.error("Error fetching insurance companies:", error);
      // Fallback to default partners if API fails
      setPartners([
        {
          name: "Hollard",
          logo: "https://ucarecdn.com/67a1a183-4dfc-480a-aecf-5f417b3ba619/-/format/auto/",
        },
        {
          name: "EMOSE",
          logo: "https://ucarecdn.com/53a88b8d-ebb3-4ba4-b8d7-2d6bd328fdb0/-/format/auto/",
        },
      ]);
    } finally {
      setPartnersLoading(false);
    }
  };

  // Auto-scroll partners every 2.5 seconds
  useEffect(() => {
    if (partners.length === 0) return;

    const interval = setInterval(() => {
      if (partnersScrollRef.current) {
        scrollPosition.current += 120;

        // Reset to beginning if we've scrolled past all partners
        if (scrollPosition.current >= partners.length * 120) {
          scrollPosition.current = 0;
        }

        partnersScrollRef.current.scrollTo({
          x: scrollPosition.current,
          animated: true,
        });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [partners.length]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchInsuranceCompanies();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  if (!fontsLoaded) {
    return null;
  }
  console.log("Start tabs");

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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
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
              Corretor de Seguros Digital
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#D4AF37",
                marginTop: 4,
                fontFamily: "Montserrat_500Medium",
              }}
            >
              Escolha o seguro. Nós tratamos do resto.
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 64 + 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#2563EB"]}
          />
        }
      >
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <GlassView
            isInteractive={false}
            style={[
              {
                padding: 4,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
              },
              isLiquidGlassAvailable() ? {} : { backgroundColor: "#F1F5F9" },
            ]}
          >
            <TouchableOpacity
              onPress={() => router.push("/cotacao")}
              activeOpacity={0.7}
              style={{ flex: 1, alignItems: "center", paddingVertical: 14 }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: "#1E293B",
                  fontFamily: "Montserrat_700Bold",
                }}
              >
                Pedir Cotação
              </Text>
            </TouchableOpacity>

            <View
              style={{
                width: 1,
                height: 24,
                backgroundColor: "#CBD5E1",
              }}
            />

            <TouchableOpacity
              onPress={() => router.push("/renovar-apolice")}
              activeOpacity={0.7}
              style={{ flex: 1, alignItems: "center", paddingVertical: 14 }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: "#1E293B",
                  fontFamily: "Montserrat_700Bold",
                }}
              >
                Renovar Apólice
              </Text>
            </TouchableOpacity>
          </GlassView>
        </View>

        <View style={{ marginTop: 28 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#1E293B",
              marginBottom: 16,
              paddingHorizontal: 20,
              fontFamily: "Montserrat_700Bold",
              textAlign: "center",
            }}
          >
            Seguros em Destaque
          </Text>
          <Carousel
            width={width - 40}
            height={280}
            data={featuredInsurance}
            renderItem={({ item, index }) => {
              const IconComponent = item.icon;
              const isActive = activeSlide === index;
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    router.push(`/seguro-detalhes?type=${item.id}`)
                  }
                  style={{ flex: 1 }}
                >
                  <MotiView
                    animate={{ scale: isActive ? 1 : 0.95 }}
                    transition={{ type: "timing", duration: 300 }}
                    style={{
                      height: 280,
                      borderRadius: 24,
                      overflow: "hidden",
                      marginHorizontal: 4,
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                      }}
                      contentFit="cover"
                      transition={300}
                    />
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                      }}
                    />

                    {item.hasPromo && (
                      <MotiView
                        from={{ opacity: 0, translateY: -10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{
                          type: "timing",
                          duration: 500,
                          delay: 200,
                        }}
                        style={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          backgroundColor: "#EF4444",
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          borderRadius: 20,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Sparkles size={14} color="#FFFFFF" />
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "700",
                            color: "#FFFFFF",
                            fontFamily: "Montserrat_700Bold",
                          }}
                        >
                          PROMO
                        </Text>
                      </MotiView>
                    )}

                    {item.isNew && !item.hasPromo && (
                      <View
                        style={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          backgroundColor: "rgba(255, 255, 255, 0.25)",
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 12,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "600",
                            color: "#FFFFFF",
                            fontFamily: "Montserrat_600SemiBold",
                          }}
                        >
                          Novo
                        </Text>
                      </View>
                    )}

                    <View
                      style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        padding: 24,
                      }}
                    >
                      <View
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 16,
                          backgroundColor: item.color,
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 12,
                        }}
                      >
                        <IconComponent size={28} color="#FFFFFF" />
                      </View>
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: "700",
                          color: "#FFFFFF",
                          fontFamily: "Montserrat_700Bold",
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#FFFFFF",
                          marginTop: 4,
                          fontFamily: "Montserrat_400Regular",
                          opacity: 0.9,
                        }}
                      >
                        {item.description}
                      </Text>
                    </View>
                  </MotiView>
                </TouchableOpacity>
              );
            }}
            autoPlay={true}
            autoPlayInterval={3000}
            scrollAnimationDuration={500}
            onSnapToItem={(index) => setActiveSlide(index)}
            style={{ width: width }}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 6,
              marginTop: 16,
            }}
          >
            {featuredInsurance.map((_, index) => (
              <MotiView
                key={index}
                animate={{
                  width: activeSlide === index ? 24 : 8,
                  backgroundColor:
                    activeSlide === index ? "#2563EB" : "#CBD5E1",
                }}
                transition={{ type: "timing", duration: 300 }}
                style={{ height: 8, borderRadius: 4 }}
              />
            ))}
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
              textAlign: "center",
            }}
          >
            Saiba mais sobre seguros
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {insuranceTypes.map((insurance, index) => {
              const IconComponent = insurance.icon;
              return (
                <MotiView
                  key={insurance.id}
                  from={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "timing",
                    duration: 300,
                    delay: index * 50,
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

          <TouchableOpacity
            onPress={() => router.push("/todos-seguros")}
            activeOpacity={0.7}
            style={{ marginTop: 20, alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "#2563EB",
                fontFamily: "Montserrat_600SemiBold",
              }}
            >
              Ver Todos os Seguros +
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 32, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#1E293B",
              fontFamily: "Montserrat_700Bold",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Seguradoras Parceiras
          </Text>

          {partnersLoading ? (
            <View style={{ paddingHorizontal: 20, alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#64748B",
                  fontFamily: "Montserrat_400Regular",
                }}
              >
                A carregar seguradoras...
              </Text>
            </View>
          ) : (
            <ScrollView
              ref={partnersScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ flexGrow: 0 }}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 20 }}
            >
              {partners.map((partner, index) => (
                <MotiView
                  key={index}
                  from={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "timing",
                    duration: 400,
                    delay: index * 100,
                  }}
                  style={{
                    alignItems: "center",
                    width: 100,
                  }}
                >
                  <View
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 45,
                      backgroundColor: "#FFFFFF",
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 3,
                      borderColor: "#FFFFFF",
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      source={{ uri: partner.logo }}
                      style={{ width: "65%", height: "65%" }}
                      contentFit="contain"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: "#1E293B",
                      fontFamily: "Montserrat_600SemiBold",
                      textAlign: "center",
                      marginTop: 8,
                    }}
                  >
                    {partner.name}
                  </Text>
                </MotiView>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </View>
  );
}



