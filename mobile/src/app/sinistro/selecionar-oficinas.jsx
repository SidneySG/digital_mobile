import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  Search,
  MapPin,
  Star,
  Phone,
  CheckCircle,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function SelecionarOficinasScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedWorkshops, setSelectedWorkshops] = useState([]);

  const regions = [
    { id: "all", name: "Todas" },
    { id: "maputo", name: "Maputo" },
    { id: "matola", name: "Matola" },
    { id: "beira", name: "Beira" },
    { id: "nampula", name: "Nampula" },
  ];

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const response = await fetch("/api/workshops");
      if (!response.ok) throw new Error("Failed to fetch workshops");

      const data = await response.json();
      setWorkshops(data.workshops || []);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWorkshop = (workshopId) => {
    if (selectedWorkshops.includes(workshopId)) {
      setSelectedWorkshops(selectedWorkshops.filter((id) => id !== workshopId));
    } else {
      if (selectedWorkshops.length < 10) {
        setSelectedWorkshops([...selectedWorkshops, workshopId]);
      }
    }
  };

  const filteredWorkshops = workshops.filter((workshop) => {
    const matchesSearch = workshop.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRegion =
      selectedRegion === "all" || workshop.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="light" />

      {/* Header */}
      <LinearGradient
        colors={["#059669", "#10B981"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: "#FFFFFF",
                fontFamily: "Montserrat_700Bold",
              }}
            >
              Selecionar Oficinas
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#D1FAE5",
                fontFamily: "Montserrat_400Regular",
              }}
            >
              {selectedWorkshops.length}/10 selecionadas
            </Text>
          </View>
        </View>

        {/* Search */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            gap: 12,
          }}
        >
          <Search size={20} color="#64748B" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar oficina..."
            placeholderTextColor="#94A3B8"
            style={{
              flex: 1,
              fontSize: 15,
              color: "#1E293B",
              paddingVertical: 14,
              fontFamily: "Montserrat_400Regular",
            }}
          />
        </View>
      </LinearGradient>

      {/* Region Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 60 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          gap: 8,
        }}
      >
        {regions.map((region) => (
          <TouchableOpacity
            key={region.id}
            onPress={() => setSelectedRegion(region.id)}
            activeOpacity={0.7}
          >
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
                backgroundColor:
                  selectedRegion === region.id ? "#10B981" : "#FFFFFF",
                borderWidth: 1,
                borderColor:
                  selectedRegion === region.id ? "#10B981" : "#E2E8F0",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: selectedRegion === region.id ? "#FFFFFF" : "#64748B",
                  fontFamily: "Montserrat_600SemiBold",
                }}
              >
                {region.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Workshops List */}
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#10B981" />
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredWorkshops.map((workshop) => {
            const isSelected = selectedWorkshops.includes(workshop.id);
            // FIX: Convert rating to number safely to avoid .toFixed() error
            const rating = parseFloat(workshop.rating) || 0;
            const totalReviews = workshop.total_reviews || 0;

            return (
              <TouchableOpacity
                key={workshop.id}
                onPress={() => toggleWorkshop(workshop.id)}
                activeOpacity={0.7}
                disabled={!isSelected && selectedWorkshops.length >= 10}
              >
                <View
                  style={{
                    backgroundColor: isSelected ? "#ECFDF5" : "#FFFFFF",
                    padding: 16,
                    borderRadius: 16,
                    marginBottom: 12,
                    borderWidth: 2,
                    borderColor: isSelected ? "#10B981" : "#E2E8F0",
                    opacity:
                      !isSelected && selectedWorkshops.length >= 10 ? 0.5 : 1,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "700",
                          color: "#1E293B",
                          marginBottom: 6,
                          fontFamily: "Montserrat_700Bold",
                        }}
                      >
                        {workshop.name}
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 6,
                          marginBottom: 4,
                        }}
                      >
                        <MapPin size={14} color="#64748B" />
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#64748B",
                            fontFamily: "Montserrat_400Regular",
                          }}
                        >
                          {workshop.address}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 6,
                          marginBottom: 8,
                        }}
                      >
                        <Phone size={14} color="#64748B" />
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#64748B",
                            fontFamily: "Montserrat_400Regular",
                          }}
                        >
                          {workshop.phone}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Star size={14} color="#F59E0B" fill="#F59E0B" />
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: "600",
                            color: "#1E293B",
                            fontFamily: "Montserrat_600SemiBold",
                          }}
                        >
                          {rating.toFixed(1)}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#94A3B8",
                            fontFamily: "Montserrat_400Regular",
                          }}
                        >
                          ({totalReviews} avaliações)
                        </Text>
                      </View>
                    </View>

                    {isSelected && (
                      <View
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 16,
                          backgroundColor: "#10B981",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CheckCircle size={20} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          {filteredWorkshops.length === 0 && (
            <Text
              style={{
                textAlign: "center",
                color: "#94A3B8",
                fontSize: 14,
                marginTop: 40,
                fontFamily: "Montserrat_400Regular",
              }}
            >
              Nenhuma oficina encontrada
            </Text>
          )}
        </ScrollView>
      )}

      {/* Confirm Button */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
          paddingVertical: 16,
          paddingBottom: insets.bottom + 16,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E2E8F0",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          disabled={selectedWorkshops.length === 0}
        >
          <LinearGradient
            colors={
              selectedWorkshops.length > 0
                ? ["#059669", "#10B981"]
                : ["#94A3B8", "#94A3B8"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 18,
              borderRadius: 16,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#FFFFFF",
                fontFamily: "Montserrat_700Bold",
              }}
            >
              Confirmar Seleção ({selectedWorkshops.length})
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}



