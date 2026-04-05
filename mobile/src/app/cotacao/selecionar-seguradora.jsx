import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  Building2,
  TrendingDown,
  CheckCircle,
  ChevronRight,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image } from "expo-image";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function SelecionarSeguradoraScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [selectedInsurer, setSelectedInsurer] = useState(null);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Mock de seguradoras com o mesmo melhor preço
  const tiedInsurers = [
    {
      id: "hollard",
      name: "Hollard Moçambique",
      monthlyPrice: "2.500 MZN",
      yearlyPrice: "27.000 MZN",
      benefits: [
        "Danos Próprios",
        "Responsabilidade Civil",
        "Roubo e Incêndio",
        "Assistência 24/7",
      ],
    },
    {
      id: "sanlam",
      name: "Sanlam Seguros",
      monthlyPrice: "2.500 MZN",
      yearlyPrice: "27.000 MZN",
      benefits: [
        "Cobertura Total",
        "Carro Substituto",
        "Protecção Legal",
        "Assistência em Viagem",
      ],
    },
  ];

  if (!fontsLoaded) {
    return null;
  }

  const handleContinue = () => {
    if (selectedInsurer) {
      router.push({
        pathname: "/cotacao/pagamento",
        params: {
          insurerId: selectedInsurer,
          amount: "27000",
          insuranceType: params.type || "auto",
        },
      });
    }
  };

  return (
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
              Melhor Preço
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#D4AF37",
                marginTop: 4,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Escolha sua seguradora
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Banner */}
        <View
          style={{
            backgroundColor: "#EFF6FF",
            padding: 16,
            borderRadius: 16,
            marginBottom: 24,
            borderLeftWidth: 4,
            borderLeftColor: "#10B981",
            flexDirection: "row",
            gap: 12,
          }}
        >
          <TrendingDown size={24} color="#10B981" />
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
              Encontrámos o Melhor Preço!
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#64748B",
                fontFamily: "Poppins_400Regular",
                lineHeight: 20,
              }}
            >
              {tiedInsurers.length} seguradoras oferecem exactamente o mesmo
              valor. Escolha com qual prefere trabalhar.
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
          Seguradoras Disponíveis
        </Text>

        {/* Insurers List */}
        <View style={{ gap: 16 }}>
          {tiedInsurers.map((insurer) => {
            const isSelected = selectedInsurer === insurer.id;
            return (
              <TouchableOpacity
                key={insurer.id}
                onPress={() => setSelectedInsurer(insurer.id)}
                activeOpacity={0.7}
              >
                <View
                  style={{
                    backgroundColor: isSelected ? "#EFF6FF" : "#FFFFFF",
                    borderRadius: 16,
                    padding: 18,
                    borderWidth: 2,
                    borderColor: isSelected ? "#2563EB" : "#E2E8F0",
                  }}
                >
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
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                        flex: 1,
                      }}
                    >
                      <View
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          backgroundColor: isSelected ? "#2563EB" : "#F1F5F9",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Building2
                          size={24}
                          color={isSelected ? "#FFFFFF" : "#64748B"}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "700",
                          color: "#1E293B",
                          fontFamily: "Poppins_700Bold",
                          flex: 1,
                        }}
                      >
                        {insurer.name}
                      </Text>
                    </View>
                    {isSelected && (
                      <View
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          backgroundColor: "#2563EB",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ color: "#FFFFFF", fontSize: 18 }}>
                          ✓
                        </Text>
                      </View>
                    )}
                  </View>

                  <View
                    style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}
                  >
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "#F8FAFC",
                        padding: 12,
                        borderRadius: 12,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          color: "#64748B",
                          marginBottom: 4,
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        Mensal
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "700",
                          color: "#2563EB",
                          fontFamily: "Poppins_700Bold",
                        }}
                      >
                        {insurer.monthlyPrice}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "#F0FDF4",
                        padding: 12,
                        borderRadius: 12,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          color: "#64748B",
                          marginBottom: 4,
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        Anual (10% desconto)
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "700",
                          color: "#10B981",
                          fontFamily: "Poppins_700Bold",
                        }}
                      >
                        {insurer.yearlyPrice}
                      </Text>
                    </View>
                  </View>

                  <View style={{ gap: 6 }}>
                    {insurer.benefits.map((benefit, i) => (
                      <View
                        key={i}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <CheckCircle size={14} color="#10B981" />
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#64748B",
                            fontFamily: "Poppins_400Regular",
                          }}
                        >
                          {benefit}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
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
          onPress={handleContinue}
          disabled={!selectedInsurer}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={
              selectedInsurer ? ["#10B981", "#059669"] : ["#CBD5E1", "#94A3B8"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              padding: 18,
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
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
              Continuar para Pagamento
            </Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}



