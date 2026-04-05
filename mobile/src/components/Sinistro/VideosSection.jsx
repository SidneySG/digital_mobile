import { View, Text, TouchableOpacity } from "react-native";
import { Video, MapPin, Trash2 } from "lucide-react-native";

export function VideosSection({ videos, onRecordVideo, onRemoveVideo }) {
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
        Vídeos do Sinistro * (mín. 1)
      </Text>

      <View style={{ gap: 12 }}>
        {videos.map((video, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#E2E8F0",
              padding: 12,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                backgroundColor: "#F1F5F9",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Video size={28} color="#64748B" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#1E293B",
                  fontFamily: "Poppins_600SemiBold",
                  marginBottom: 4,
                }}
              >
                Vídeo {index + 1}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#64748B",
                  fontFamily: "Poppins_400Regular",
                }}
              >
                {video.duration}s
              </Text>
              {video.location && (
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
                    {video.location.latitude.toFixed(5)},{" "}
                    {video.location.longitude.toFixed(5)}
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={() => onRemoveVideo(index)}
              style={{ padding: 8 }}
            >
              <Trash2 size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity onPress={onRecordVideo} activeOpacity={0.7}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderWidth: 2,
              borderColor: "#EF4444",
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
                backgroundColor: "#FEF2F2",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Video size={24} color="#EF4444" />
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "#EF4444",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              Gravar Vídeo (máx 15s)
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#64748B",
                fontFamily: "Poppins_400Regular",
              }}
            >
              {videos.length} vídeo{videos.length !== 1 ? "s" : ""} adicionado
              {videos.length !== 1 ? "s" : ""}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}