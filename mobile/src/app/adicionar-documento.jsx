import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Upload,
  Check,
} from "lucide-react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useUpload } from "@/utils/useUpload";
import { useUser } from "@/utils/auth/useUser";

export default function AdicionarDocumentoScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useUser();
  const { pickDocument, uploading } = useUpload();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const [documentType, setDocumentType] = useState("vehicle_inspection");
  const [title, setTitle] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [description, setDescription] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [extractedData, setExtractedData] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const documentTypes = [
    { id: "vehicle_inspection", label: "Inspeção de Veículo", icon: "🚗" },
    { id: "drivers_license", label: "Carta de Condução", icon: "🪪" },
    { id: "property_title", label: "Título de Propriedade", icon: "🏠" },
    { id: "health_certificate", label: "Certificado de Saúde", icon: "🏥" },
    { id: "passport", label: "Passaporte", icon: "🛂" },
    { id: "visa", label: "Visto", icon: "📋" },
    { id: "work_permit", label: "Autorização de Trabalho", icon: "💼" },
    { id: "other", label: "Outro", icon: "📄" },
  ];

  const handleDocumentPick = async () => {
    try {
      const result = await pickDocument();
      if (result?.cdnUrl) {
        setDocumentUrl(result.cdnUrl);

        // Extract data from document using OCR if it's an image
        if (result.mimeType?.startsWith("image/")) {
          await extractDocumentData(result.cdnUrl);
        }
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const extractDocumentData = async (url) => {
    try {
      const response = await fetch("/api/ocr/extract-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentUrl: url, documentType }),
      });

      if (response.ok) {
        const data = await response.json();
        setExtractedData(data.extractedData);

        // Auto-fill fields if extraction succeeded
        if (data.extractedData?.document_number) {
          setDocumentNumber(data.extractedData.document_number);
        }
        if (data.extractedData?.title) {
          setTitle(data.extractedData.title);
        }
        if (data.extractedData?.expiry_date) {
          setExpiryDate(data.extractedData.expiry_date);
        }
        if (data.extractedData?.issue_date) {
          setIssueDate(data.extractedData.issue_date);
        }
      }
    } catch (error) {
      console.error("Error extracting document data:", error);
    }
  };

  const handleSubmit = async () => {
    if (!title || !documentUrl) {
      alert("Por favor, preencha o título e carregue um documento");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || null,
          documentType,
          documentNumber: documentNumber || null,
          title,
          description: description || null,
          issueDate: issueDate || null,
          expiryDate: expiryDate || null,
          documentUrl,
          extractedData,
        }),
      });

      if (!response.ok) throw new Error("Failed to create document");

      router.back();
    } catch (error) {
      console.error("Error creating document:", error);
      alert("Erro ao adicionar documento");
    } finally {
      setSubmitting(false);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const selectedType = documentTypes.find((t) => t.id === documentType);

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="light" />

      {/* Header */}
      <LinearGradient
        colors={["#10B981", "#059669"]}
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
              Adicionar Documento
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#D1FAE5",
                fontFamily: "Montserrat_400Regular",
              }}
            >
              Controle as validades dos seus documentos
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Document Type Selection */}
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            color: "#1E293B",
            marginBottom: 12,
            fontFamily: "Montserrat_600SemiBold",
          }}
        >
          Tipo de Documento
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 24,
          }}
        >
          {documentTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              onPress={() => setDocumentType(type.id)}
              activeOpacity={0.7}
            >
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: 12,
                  backgroundColor:
                    documentType === type.id ? "#10B981" : "#FFFFFF",
                  borderWidth: 1,
                  borderColor: documentType === type.id ? "#10B981" : "#E2E8F0",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Text style={{ fontSize: 18 }}>{type.icon}</Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: documentType === type.id ? "#FFFFFF" : "#64748B",
                    fontFamily: "Montserrat_600SemiBold",
                  }}
                >
                  {type.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upload Document */}
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            color: "#1E293B",
            marginBottom: 12,
            fontFamily: "Montserrat_600SemiBold",
          }}
        >
          Carregar Documento *
        </Text>
        <TouchableOpacity
          onPress={handleDocumentPick}
          activeOpacity={0.7}
          disabled={uploading}
        >
          <View
            style={{
              backgroundColor: documentUrl ? "#ECFDF5" : "#FFFFFF",
              padding: 20,
              borderRadius: 16,
              borderWidth: 2,
              borderColor: documentUrl ? "#10B981" : "#E2E8F0",
              borderStyle: "dashed",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            {documentUrl ? (
              <>
                <Check size={48} color="#10B981" />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#10B981",
                    marginTop: 12,
                    fontFamily: "Montserrat_600SemiBold",
                  }}
                >
                  Documento Carregado ✓
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: "#64748B",
                    marginTop: 4,
                    fontFamily: "Montserrat_400Regular",
                  }}
                >
                  Toque para alterar
                </Text>
              </>
            ) : (
              <>
                <Upload size={48} color="#64748B" />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#1E293B",
                    marginTop: 12,
                    fontFamily: "Montserrat_600SemiBold",
                  }}
                >
                  {uploading ? "A carregar..." : "Toque para Carregar"}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: "#64748B",
                    marginTop: 4,
                    fontFamily: "Montserrat_400Regular",
                  }}
                >
                  PDF, Imagem ou outro arquivo
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>

        {/* Title */}
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            color: "#1E293B",
            marginBottom: 8,
            fontFamily: "Montserrat_600SemiBold",
          }}
        >
          Título do Documento *
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder={`Ex: ${selectedType?.label} 2026`}
          placeholderTextColor="#94A3B8"
          style={{
            backgroundColor: "#FFFFFF",
            padding: 16,
            borderRadius: 12,
            fontSize: 15,
            color: "#1E293B",
            borderWidth: 1,
            borderColor: "#E2E8F0",
            marginBottom: 20,
            fontFamily: "Montserrat_400Regular",
          }}
        />

        {/* Document Number */}
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            color: "#1E293B",
            marginBottom: 8,
            fontFamily: "Montserrat_600SemiBold",
          }}
        >
          Número do Documento
        </Text>
        <TextInput
          value={documentNumber}
          onChangeText={setDocumentNumber}
          placeholder="Ex: 123456789"
          placeholderTextColor="#94A3B8"
          style={{
            backgroundColor: "#FFFFFF",
            padding: 16,
            borderRadius: 12,
            fontSize: 15,
            color: "#1E293B",
            borderWidth: 1,
            borderColor: "#E2E8F0",
            marginBottom: 20,
            fontFamily: "Montserrat_400Regular",
          }}
        />

        {/* Description */}
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            color: "#1E293B",
            marginBottom: 8,
            fontFamily: "Montserrat_600SemiBold",
          }}
        >
          Descrição
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Notas adicionais..."
          placeholderTextColor="#94A3B8"
          multiline
          numberOfLines={3}
          style={{
            backgroundColor: "#FFFFFF",
            padding: 16,
            borderRadius: 12,
            fontSize: 15,
            color: "#1E293B",
            borderWidth: 1,
            borderColor: "#E2E8F0",
            marginBottom: 20,
            fontFamily: "Montserrat_400Regular",
            textAlignVertical: "top",
          }}
        />

        {/* Issue Date */}
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            color: "#1E293B",
            marginBottom: 8,
            fontFamily: "Montserrat_600SemiBold",
          }}
        >
          Data de Emissão
        </Text>
        <TextInput
          value={issueDate}
          onChangeText={setIssueDate}
          placeholder="DD/MM/AAAA"
          placeholderTextColor="#94A3B8"
          style={{
            backgroundColor: "#FFFFFF",
            padding: 16,
            borderRadius: 12,
            fontSize: 15,
            color: "#1E293B",
            borderWidth: 1,
            borderColor: "#E2E8F0",
            marginBottom: 20,
            fontFamily: "Montserrat_400Regular",
          }}
        />

        {/* Expiry Date */}
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            color: "#1E293B",
            marginBottom: 8,
            fontFamily: "Montserrat_600SemiBold",
          }}
        >
          Data de Validade
        </Text>
        <TextInput
          value={expiryDate}
          onChangeText={setExpiryDate}
          placeholder="DD/MM/AAAA"
          placeholderTextColor="#94A3B8"
          style={{
            backgroundColor: "#FFFFFF",
            padding: 16,
            borderRadius: 12,
            fontSize: 15,
            color: "#1E293B",
            borderWidth: 1,
            borderColor: "#E2E8F0",
            marginBottom: 8,
            fontFamily: "Montserrat_400Regular",
          }}
        />
        <Text
          style={{
            fontSize: 12,
            color: "#64748B",
            marginBottom: 20,
            fontFamily: "Montserrat_400Regular",
          }}
        >
          Vamos notificá-lo 30 dias antes da expiração
        </Text>

        {extractedData && (
          <View
            style={{
              backgroundColor: "#ECFDF5",
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#A7F3D0",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#059669",
                marginBottom: 8,
                fontFamily: "Montserrat_600SemiBold",
              }}
            >
              ✓ Dados Extraídos Automaticamente
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#064E3B",
                fontFamily: "Montserrat_400Regular",
              }}
            >
              Verificamos e preenchemos os campos automaticamente. Por favor,
              confirme se estão corretos.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Submit Button */}
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
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={submitting || !title || !documentUrl}
        >
          <LinearGradient
            colors={
              title && documentUrl
                ? ["#10B981", "#059669"]
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
              {submitting ? "A Guardar..." : "Guardar Documento"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}



