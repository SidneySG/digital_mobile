import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useState, useEffect } from "react";

export function InsurerSelection({ selectedInsurer, onSelectInsurer }) {
  const [insurers, setInsurers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsurers();
  }, []);

  const fetchInsurers = async () => {
    try {
      const response = await fetch("/api/insurance-companies?active=true");
      if (!response.ok) throw new Error("Failed to fetch insurers");

      const data = await response.json();

      // Filter only insurers with valid logos (not placeholder)
      const validInsurers = data.insuranceCompanies.filter(
        (ins) => ins.logo_url && !ins.logo_url.includes("placeholder"),
      );

      setInsurers(validInsurers);
    } catch (error) {
      console.error("Error fetching insurers:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ padding: 40, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: "#1E293B",
          marginBottom: 8,
          fontFamily: "Poppins_700Bold",
        }}
      >
        Escolha a Seguradora
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "#64748B",
          marginBottom: 20,
          fontFamily: "Poppins_400Regular",
        }}
      >
        Selecione a seguradora da sua preferência
      </Text>

      {/* Horizontal Logo Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 8,
          gap: 16,
        }}
      >
        {insurers.map((insurer) => {
          const isSelected = selectedInsurer === insurer.id;
          return (
            <TouchableOpacity
              key={insurer.id}
              onPress={() => onSelectInsurer(insurer.id)}
              activeOpacity={0.7}
            >
              <View
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 16,
                  backgroundColor: "#FFFFFF",
                  borderWidth: 3,
                  borderColor: isSelected ? "#2563EB" : "#E2E8F0",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  shadowColor: isSelected ? "#2563EB" : "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: isSelected ? 0.3 : 0.1,
                  shadowRadius: 8,
                  elevation: isSelected ? 8 : 2,
                }}
              >
                <Image
                  source={{ uri: insurer.logo_url }}
                  style={{ width: "100%", height: "100%", borderRadius: 8 }}
                  contentFit="contain"
                  transition={200}
                />

                {isSelected && (
                  <View
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: "#2563EB",
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 3,
                      borderColor: "#FFFFFF",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}



