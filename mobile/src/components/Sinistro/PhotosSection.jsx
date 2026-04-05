import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Camera, MapPin, Trash2, Eye, X, Clock } from "lucide-react-native";
import { Image } from "expo-image";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export function PhotosSection({ photos, onTakePhoto, onRemovePhoto }) {
  const [viewingPhoto, setViewingPhoto] = useState(null);
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return null;

    const date = new Date(timestamp);
    const months = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = String(date.getFullYear()).slice(2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} | ${hours}:${minutes}`;
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: "#1E293B",
          marginBottom: 16,
          fontFamily: "Poppins_700Bold",
        }}
      >
        Fotos do Sinistro * (mín. 1)
      </Text>

      <View style={{ gap: 12, marginBottom: 32 }}>
        {photos.map((photo, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#E2E8F0",
              overflow: "hidden",
            }}
          >
            <View style={{ flexDirection: "row", gap: 12, padding: 12 }}>
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 80, height: 80, borderRadius: 8 }}
                contentFit="cover"
              />
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#1E293B",
                    fontFamily: "Poppins_600SemiBold",
                    marginBottom: 4,
                  }}
                >
                  {photo.description}
                </Text>
                {photo.location && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <MapPin size={12} color="#64748B" />
                    <Text
                      style={{
                        fontSize: 11,
                        color: "#64748B",
                        fontFamily: "Poppins_400Regular",
                      }}
                    >
                      {photo.location.latitude.toFixed(5)},{" "}
                      {photo.location.longitude.toFixed(5)}
                    </Text>
                  </View>
                )}
                <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
                  <TouchableOpacity
                    onPress={() => setViewingPhoto(photo)}
                    style={{ flex: 1 }}
                  >
                    <View
                      style={{
                        backgroundColor: "#3B82F6",
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 6,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                      }}
                    >
                      <Eye size={14} color="#FFFFFF" />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "600",
                          color: "#FFFFFF",
                          fontFamily: "Poppins_600SemiBold",
                        }}
                      >
                        Ver
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onRemovePhoto(index)}
                    style={{ flex: 1 }}
                  >
                    <View
                      style={{
                        backgroundColor: "#EF4444",
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 6,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                      }}
                    >
                      <Trash2 size={14} color="#FFFFFF" />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "600",
                          color: "#FFFFFF",
                          fontFamily: "Poppins_600SemiBold",
                        }}
                      >
                        Apagar
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity onPress={onTakePhoto} activeOpacity={0.7}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderWidth: 2,
              borderColor: "#2563EB",
              borderStyle: "dashed",
              borderRadius: 12,
              padding: 20,
              alignItems: "center",
              gap: 8,
            }}
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
              <Camera size={24} color="#2563EB" />
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "#2563EB",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              Tirar Foto
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#64748B",
                fontFamily: "Poppins_400Regular",
              }}
            >
              {photos.length} foto{photos.length !== 1 ? "s" : ""} adicionada
              {photos.length !== 1 ? "s" : ""}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Full Image Viewer Modal */}
      <Modal
        visible={viewingPhoto !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setViewingPhoto(null)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
          }}
        >
          <View
            style={{
              paddingTop: insets.top + 20,
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: "#FFFFFF",
                    fontFamily: "Poppins_700Bold",
                  }}
                >
                  Foto com Régua
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#D4AF37",
                    marginTop: 2,
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  Verificação anti-fraude
                </Text>
              </View>
              <TouchableOpacity onPress={() => setViewingPhoto(null)}>
                <X size={28} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
          >
            {viewingPhoto && (
              <>
                <Image
                  source={{ uri: viewingPhoto.uri }}
                  style={{ width: "100%", height: "70%" }}
                  contentFit="contain"
                />
                <View
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    padding: 16,
                    borderRadius: 12,
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#D4AF37",
                      marginBottom: 8,
                      fontFamily: "Poppins_600SemiBold",
                    }}
                  >
                    Descrição:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#FFFFFF",
                      fontFamily: "Poppins_400Regular",
                      lineHeight: 20,
                      marginBottom: 12,
                    }}
                  >
                    {viewingPhoto.description}
                  </Text>

                  {viewingPhoto.location && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 8,
                      }}
                    >
                      <MapPin size={14} color="#94A3B8" />
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#94A3B8",
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        {viewingPhoto.location.latitude.toFixed(6)},{" "}
                        {viewingPhoto.location.longitude.toFixed(6)}
                      </Text>
                    </View>
                  )}

                  {viewingPhoto.timestamp && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Clock size={14} color="#94A3B8" />
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#94A3B8",
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        {formatTimestamp(viewingPhoto.timestamp)}
                      </Text>
                    </View>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}



