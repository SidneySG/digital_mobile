import { View, Text, TouchableOpacity } from "react-native";
import {
  FileText,
  Camera,
  Image as ImageIcon,
  Upload,
  Check,
} from "lucide-react-native";

export function DocumentUploadSection({
  document,
  documentName,
  onPickDocument,
  onTakePhoto,
  onPickImage,
  onRemoveDocument,
  error,
}) {
  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <FileText size={18} color="#64748B" />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: "#1E293B",
            fontFamily: "Montserrat_600SemiBold",
          }}
        >
          Documento da Apólice *
        </Text>
      </View>

      {!document ? (
        <View style={{ gap: 12 }}>
          <TouchableOpacity
            onPress={onPickDocument}
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              backgroundColor: "#F8FAFC",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: error ? "#EF4444" : "#E2E8F0",
              borderStyle: "dashed",
            }}
          >
            <Upload size={24} color="#64748B" />
            <Text
              style={{
                marginLeft: 12,
                fontSize: 14,
                fontFamily: "Montserrat_500Medium",
                color: "#475569",
                flex: 1,
              }}
            >
              Selecionar PDF ou Imagem
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity
              onPress={onTakePhoto}
              activeOpacity={0.7}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 14,
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#E2E8F0",
              }}
            >
              <Camera size={20} color="#64748B" />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 13,
                  fontFamily: "Montserrat_500Medium",
                  color: "#475569",
                }}
              >
                Tirar Foto
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPickImage}
              activeOpacity={0.7}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 14,
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#E2E8F0",
              }}
            >
              <ImageIcon size={20} color="#64748B" />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 13,
                  fontFamily: "Montserrat_500Medium",
                  color: "#475569",
                }}
              >
                Galeria
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            padding: 16,
            backgroundColor: "#F0F9FF",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#BAE6FD",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Check size={24} color="#0EA5E9" />
              <Text
                style={{
                  marginLeft: 12,
                  fontSize: 14,
                  fontFamily: "Montserrat_500Medium",
                  color: "#0369A1",
                  flex: 1,
                }}
                numberOfLines={1}
              >
                {documentName}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onRemoveDocument}
              style={{ marginLeft: 12 }}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Montserrat_600SemiBold",
                  color: "#DC2626",
                }}
              >
                Remover
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {error && (
        <Text
          style={{
            fontSize: 12,
            color: "#EF4444",
            marginTop: 4,
            fontFamily: "Montserrat_400Regular",
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}



