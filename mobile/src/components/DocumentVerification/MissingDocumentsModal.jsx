import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { X, FileText, Upload, AlertCircle } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Modal que mostra documentos em falta e permite ao usuário carregá-los
 */
export function MissingDocumentsModal({
  visible,
  onClose,
  insuranceType,
  missingDocuments,
  availableDocuments,
}) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const documentLabels = {
    auto: {
      livrete: "Livrete/Título de Propriedade do Veículo",
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
      passport: "Passaporte",
      passaporte: "Passaporte",
    },
    empresarial: {
      alvara: "Alvará Comercial",
    },
  };

  const insuranceLabels = {
    auto: "Seguro Auto",
    vida: "Seguro de Vida",
    habitacao: "Seguro de Habitação",
    viagem: "Seguro de Viagem",
    empresarial: "Seguro Empresarial",
  };

  const handleUploadDocuments = () => {
    onClose();
    router.push("/adicionar-documento");
  };

  const handleContinueAnyway = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: 20,
            paddingBottom: insets.bottom + 20,
            maxHeight: "85%",
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginBottom: 20,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#1E293B",
                  fontFamily: "Poppins_700Bold",
                }}
              >
                Documentos Necessários
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#64748B",
                  fontFamily: "Poppins_400Regular",
                  marginTop: 4,
                }}
              >
                {insuranceLabels[insuranceType] || "Seguro"}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: "#F1F5F9",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={20} color="#64748B" />
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Notice */}
            <View
              style={{
                backgroundColor: "#FEF3C7",
                padding: 16,
                borderRadius: 12,
                flexDirection: "row",
                gap: 12,
                marginBottom: 20,
                borderWidth: 1,
                borderColor: "#FDE68A",
              }}
            >
              <AlertCircle size={20} color="#F59E0B" style={{ marginTop: 2 }} />
              <Text
                style={{
                  flex: 1,
                  fontSize: 13,
                  color: "#92400E",
                  fontFamily: "Poppins_400Regular",
                  lineHeight: 20,
                }}
              >
                Para facilitar o processo de cotação, carregue os documentos
                necessários. Os dados serão extraídos automaticamente.
              </Text>
            </View>

            {/* Missing Documents */}
            {missingDocuments.length > 0 && (
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#1E293B",
                    marginBottom: 12,
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  Documentos em Falta
                </Text>
                {missingDocuments.map((docType) => {
                  const label =
                    documentLabels[insuranceType]?.[docType] || docType;
                  return (
                    <View
                      key={docType}
                      style={{
                        backgroundColor: "#FEE2E2",
                        padding: 16,
                        borderRadius: 12,
                        marginBottom: 12,
                        borderWidth: 1,
                        borderColor: "#FECACA",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: "#FEF2F2",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FileText size={20} color="#DC2626" />
                        </View>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 14,
                            fontWeight: "600",
                            color: "#991B1B",
                            fontFamily: "Poppins_600SemiBold",
                          }}
                        >
                          {label}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {/* Available Documents */}
            {availableDocuments.length > 0 && (
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#1E293B",
                    marginBottom: 12,
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  Documentos Disponíveis ✓
                </Text>
                {availableDocuments.map((docType) => {
                  const label =
                    documentLabels[insuranceType]?.[docType] || docType;
                  return (
                    <View
                      key={docType}
                      style={{
                        backgroundColor: "#ECFDF5",
                        padding: 16,
                        borderRadius: 12,
                        marginBottom: 12,
                        borderWidth: 1,
                        borderColor: "#A7F3D0",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: "#D1FAE5",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FileText size={20} color="#059669" />
                        </View>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 14,
                            fontWeight: "600",
                            color: "#065F46",
                            fontFamily: "Poppins_600SemiBold",
                          }}
                        >
                          {label}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {/* Info */}
            <View
              style={{
                backgroundColor: "#EFF6FF",
                padding: 16,
                borderRadius: 12,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: "#1E40AF",
                  fontFamily: "Poppins_400Regular",
                  lineHeight: 20,
                  textAlign: "center",
                }}
              >
                💡 Pode carregar documentos agora ou continuar manualmente e
                preencher os campos você mesmo
              </Text>
            </View>
          </ScrollView>

          {/* Actions */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 16,
              borderTopWidth: 1,
              borderTopColor: "#E2E8F0",
              gap: 12,
            }}
          >
            <TouchableOpacity
              onPress={handleUploadDocuments}
              activeOpacity={0.8}
            >
              <View
                style={{
                  backgroundColor: "#2563EB",
                  padding: 16,
                  borderRadius: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Upload size={20} color="#FFFFFF" />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#FFFFFF",
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  Carregar Documentos
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleContinueAnyway}
              activeOpacity={0.8}
            >
              <View
                style={{
                  backgroundColor: "#F8FAFC",
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: "#E2E8F0",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#64748B",
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  Continuar Manualmente
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}



