import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { Camera, Upload, FileText, CheckCircle, X } from "lucide-react-native";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useUpload } from "@/utils/useUpload";

export function DocumentUploadSection({
  insuranceType,
  documentType,
  onDataExtracted,
  existingDocument,
  onRemove,
}) {
  const [uploading, setUploading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [document, setDocument] = useState(existingDocument || null);
  const { uploadFile } = useUpload();

  const documentLabels = {
    auto: {
      livrete: "Livrete/Título de Propriedade",
      carta: "Carta de Condução",
    },
    vida: {
      bi: "Bilhete de Identidade",
    },
    habitacao: {
      escritura: "Escritura/Título de Propriedade",
      cip: "CIP (Certificado de Inscrição Predial)",
    },
    viagem: {
      passaporte: "Passaporte",
    },
    empresarial: {
      alvara: "Alvará Comercial",
    },
  };

  const label = documentLabels[insuranceType]?.[documentType] || "Documento";

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await processDocument(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Erro", "Falha ao selecionar imagem");
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos de acesso à câmera para tirar fotos",
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await processDocument(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Erro", "Falha ao tirar foto");
    }
  };

  const processDocument = async (uri) => {
    try {
      setUploading(true);

      // Upload document
      const uploadedUrl = await uploadFile(uri);

      if (!uploadedUrl) {
        throw new Error("Failed to upload document");
      }

      setDocument({ uri: uploadedUrl });
      setUploading(false);
      setExtracting(true);

      // Extract data using OCR
      const response = await fetch("/api/ocr/extract-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: uploadedUrl,
          documentType,
          insuranceType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to extract document data");
      }

      const result = await response.json();

      if (result.success && result.data) {
        onDataExtracted(result.data, documentType);
        Alert.alert(
          "Sucesso! ✅",
          "Dados extraídos do documento. Verifique e corrija se necessário.",
        );
      }

      setExtracting(false);
    } catch (error) {
      console.error("Error processing document:", error);
      Alert.alert("Erro", "Falha ao processar documento");
      setUploading(false);
      setExtracting(false);
    }
  };

  const showOptions = () => {
    Alert.alert("Carregar Documento", `Como deseja carregar ${label}?`, [
      {
        text: "Tirar Foto",
        onPress: takePhoto,
      },
      {
        text: "Escolher da Galeria",
        onPress: pickImage,
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  };

  const handleRemove = () => {
    setDocument(null);
    onRemove?.(documentType);
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: "#1E293B",
          marginBottom: 8,
          fontFamily: "Poppins_600SemiBold",
        }}
      >
        {label}
        <Text style={{ color: "#64748B", fontWeight: "400" }}> (Opcional)</Text>
      </Text>

      {document ? (
        <View
          style={{
            backgroundColor: "#F0FDF4",
            borderWidth: 2,
            borderColor: "#10B981",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Image
              source={{ uri: document.uri }}
              style={{ width: 60, height: 60, borderRadius: 8 }}
              contentFit="cover"
            />
            <View style={{ flex: 1 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <CheckCircle size={16} color="#10B981" />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#059669",
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  Documento carregado
                </Text>
              </View>
              {extracting && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#64748B",
                    marginTop: 4,
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  A extrair dados...
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={handleRemove}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "#FEE2E2",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={16} color="#DC2626" />
            </TouchableOpacity>
          </View>

          {extracting && (
            <View style={{ marginTop: 12, alignItems: "center" }}>
              <ActivityIndicator size="small" color="#10B981" />
            </View>
          )}
        </View>
      ) : (
        <TouchableOpacity
          onPress={showOptions}
          disabled={uploading}
          activeOpacity={0.7}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderWidth: 2,
              borderColor: "#E2E8F0",
              borderRadius: 12,
              padding: 20,
              alignItems: "center",
              borderStyle: "dashed",
            }}
          >
            {uploading ? (
              <>
                <ActivityIndicator size="large" color="#2563EB" />
                <Text
                  style={{
                    fontSize: 14,
                    color: "#64748B",
                    marginTop: 12,
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  A carregar...
                </Text>
              </>
            ) : (
              <>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: "#EFF6FF",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                  }}
                >
                  <Upload size={28} color="#2563EB" />
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#1E293B",
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  Carregar {label}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#64748B",
                    marginTop: 4,
                    fontFamily: "Poppins_400Regular",
                    textAlign: "center",
                  }}
                >
                  Tire uma foto ou escolha da galeria
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}



