import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, FileText } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { WebView } from "react-native-webview";
import {
  useFonts,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function VisualizarDocumentoScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const documentUrl = params.url;
  const policyNumber = params.policyNumber || "Apólice";

  // Detect if PDF or image
  const isPDF =
    documentUrl?.toLowerCase().includes(".pdf") ||
    documentUrl?.toLowerCase().includes("application/pdf");

  if (!fontsLoaded) {
    return null;
  }

  if (!documentUrl) {
    return (
      <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
        <StatusBar style="dark" />
        <View
          style={{
            paddingTop: insets.top,
            paddingHorizontal: 20,
            paddingBottom: 16,
            backgroundColor: "#2563EB",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
              <ChevronLeft size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#FFFFFF",
                fontFamily: "Montserrat_700Bold",
              }}
            >
              Documento
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <FileText size={64} color="#94A3B8" />
          <Text
            style={{
              fontSize: 16,
              color: "#64748B",
              textAlign: "center",
              marginTop: 16,
              fontFamily: "Montserrat_600SemiBold",
            }}
          >
            Documento não disponível
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top,
          paddingHorizontal: 20,
          paddingBottom: 16,
          backgroundColor: "#2563EB",
          borderBottomWidth: 1,
          borderBottomColor: "#1E40AF",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <ChevronLeft size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#FFFFFF",
                fontFamily: "Montserrat_700Bold",
              }}
            >
              Documento da Apólice
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#DBEAFE",
                marginTop: 2,
                fontFamily: "Montserrat_600SemiBold",
              }}
            >
              {policyNumber}
            </Text>
          </View>
        </View>
      </View>

      {/* Document Viewer */}
      {isPDF ? (
        <WebView
          source={{ uri: documentUrl }}
          style={{ flex: 1 }}
          startInLoadingState={true}
          renderLoading={() => (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F8FAFC",
              }}
            >
              <ActivityIndicator size="large" color="#2563EB" />
              <Text
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  color: "#64748B",
                  fontFamily: "Montserrat_600SemiBold",
                }}
              >
                Carregando documento...
              </Text>
            </View>
          )}
        />
      ) : (
        <View style={{ flex: 1, backgroundColor: "#0F172A" }}>
          <Image
            source={{ uri: documentUrl }}
            style={{ width: "100%", height: "100%" }}
            contentFit="contain"
            placeholder={null}
            transition={200}
          />
        </View>
      )}
    </View>
  );
}



