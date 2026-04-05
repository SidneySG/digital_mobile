import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { CameraView as ExpoCameraView } from "expo-camera";
import { ChevronLeft, Camera, Video, Ruler } from "lucide-react-native";

export function CameraView({
  cameraRef,
  cameraMode,
  isRecording,
  recordingDuration,
  onBack,
  onCapture,
  onStartRecording,
  onStopRecording,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <StatusBar style="light" />
      <ExpoCameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        mode={cameraMode === "video" ? "video" : "picture"}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom + 20,
            paddingHorizontal: 20,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={onBack}
              style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                padding: 12,
                borderRadius: 12,
              }}
            >
              <ChevronLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>

            {isRecording && (
              <View
                style={{
                  backgroundColor: "#EF4444",
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#FFFFFF",
                  }}
                />
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight: "700",
                    fontFamily: "Poppins_700Bold",
                  }}
                >
                  {recordingDuration}s / 15s
                </Text>
              </View>
            )}
          </View>

          {/* Horizontal Measurement Ruler - Bottom of screen (for photos only) */}
          {cameraMode === "photo" && (
            <View
              style={{
                position: "absolute",
                bottom: insets.bottom + 140,
                left: 20,
                right: 20,
                backgroundColor: "rgba(0,0,0,0.85)",
                borderRadius: 8,
                padding: 12,
                paddingVertical: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Ruler size={16} color="#D4AF37" />
                <Text
                  style={{
                    color: "#D4AF37",
                    fontSize: 11,
                    fontFamily: "Poppins_700Bold",
                    marginLeft: 6,
                  }}
                >
                  RÉGUA DE REFERÊNCIA
                </Text>
              </View>

              {/* Ruler markings */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  height: 40,
                }}
              >
                {Array.from({ length: 51 }).map((_, cm) => {
                  const isTen = cm % 10 === 0;
                  const isFive = cm % 5 === 0;

                  return (
                    <View
                      key={cm}
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      {/* Tick mark */}
                      <View
                        style={{
                          width: 1,
                          height: isTen ? 28 : isFive ? 20 : 12,
                          backgroundColor: isTen ? "#D4AF37" : "#FFFFFF",
                        }}
                      />

                      {/* Number label for every 10cm */}
                      {isTen && (
                        <Text
                          style={{
                            color: "#D4AF37",
                            fontSize: 10,
                            fontFamily: "Poppins_700Bold",
                            marginTop: 4,
                            position: "absolute",
                            bottom: -18,
                          }}
                        >
                          {cm}
                        </Text>
                      )}
                    </View>
                  );
                })}
              </View>

              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 9,
                  marginTop: 20,
                  textAlign: "center",
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Centímetros (cm)
              </Text>
            </View>
          )}

          {/* Bottom Controls */}
          <View
            style={{
              position: "absolute",
              bottom: insets.bottom + 40,
              left: 0,
              right: 0,
              alignItems: "center",
            }}
          >
            {cameraMode === "photo" ? (
              <TouchableOpacity onPress={onCapture} activeOpacity={0.7}>
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: "#FFFFFF",
                    borderWidth: 4,
                    borderColor: "rgba(255,255,255,0.3)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Camera size={32} color="#1E293B" />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={isRecording ? onStopRecording : onStartRecording}
                activeOpacity={0.7}
              >
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: isRecording ? "#EF4444" : "#FFFFFF",
                    borderWidth: 4,
                    borderColor: isRecording
                      ? "rgba(239,68,68,0.3)"
                      : "rgba(255,255,255,0.3)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isRecording ? (
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        backgroundColor: "#FFFFFF",
                        borderRadius: 4,
                      }}
                    />
                  ) : (
                    <Video size={32} color="#EF4444" />
                  )}
                </View>
              </TouchableOpacity>
            )}

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 14,
                marginTop: 16,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              {cameraMode === "photo"
                ? "Toque para tirar foto"
                : isRecording
                  ? "Toque para parar"
                  : "Toque para gravar (máx 15s)"}
            </Text>
          </View>
        </View>
      </ExpoCameraView>
    </View>
  );
}



