import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import {
  FileText,
  Plus,
  AlertCircle,
  Calendar,
  Eye,
  Trash2,
} from "lucide-react-native";
import { FilterButton } from "./FilterButton";

export function DocumentsSection({
  documents,
  documentFilter,
  setDocumentFilter,
  loading,
  showToast,
  onDeleteDocument,
}) {
  const router = useRouter();

  const getDocumentTypeLabel = (type) => {
    const labels = {
      vehicle_inspection: "Inspeção de Veículo",
      drivers_license: "Carta de Condução",
      property_title: "Título de Propriedade",
      health_certificate: "Certificado de Saúde",
      passport: "Passaporte",
      visa: "Visto",
      work_permit: "Autorização de Trabalho",
      other: "Outro",
    };
    return labels[type] || type;
  };

  const getDocumentIcon = (type) => {
    const iconColor = "#2563EB";
    return <FileText size={20} color={iconColor} />;
  };

  const getDaysUntilExpiry = (expiryDate) => {
    if (!expiryDate) return null;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryStatus = (expiryDate) => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days === null) return null;
    if (days < 0) return { label: "Expirado", color: "#EF4444", bg: "#FEE2E2" };
    if (days <= 15)
      return { label: `${days}d restantes`, color: "#F59E0B", bg: "#FEF3C7" };
    if (days <= 30)
      return { label: `${days}d restantes`, color: "#10B981", bg: "#DCFCE7" };
    return { label: "Válido", color: "#64748B", bg: "#F1F5F9" };
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
          position: "relative",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#1E293B",
            fontFamily: "Montserrat_700Bold",
            textAlign: "center",
          }}
        >
          📋 Meus Documentos
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/adicionar-documento")}
          activeOpacity={0.7}
          style={{
            position: "absolute",
            right: 0,
            backgroundColor: "#10B981",
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Plus size={18} color="#FFFFFF" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 8,
          marginBottom: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <FilterButton
          active={documentFilter === "all"}
          label="Todos"
          onPress={() => setDocumentFilter("all")}
        />
        <FilterButton
          active={documentFilter === "expiring"}
          label="A Expirar"
          onPress={() => setDocumentFilter("expiring")}
        />
        <FilterButton
          active={documentFilter === "vehicle_inspection"}
          label="Inspeções"
          onPress={() => setDocumentFilter("vehicle_inspection")}
        />
        <FilterButton
          active={documentFilter === "drivers_license"}
          label="Cartas"
          onPress={() => setDocumentFilter("drivers_license")}
        />
      </View>

      <View style={{ gap: 12 }}>
        {documents.length === 0 ? (
          <View
            style={{
              backgroundColor: "#F8FAFC",
              padding: 32,
              borderRadius: 16,
              alignItems: "center",
            }}
          >
            <FileText size={48} color="#CBD5E1" />
            <Text
              style={{
                fontSize: 15,
                color: "#64748B",
                marginTop: 12,
                fontFamily: "Montserrat_400Regular",
                textAlign: "center",
              }}
            >
              Nenhum documento encontrado
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#94A3B8",
                marginTop: 4,
                fontFamily: "Montserrat_400Regular",
                textAlign: "center",
              }}
            >
              Adicione documentos para controlar validades
            </Text>
          </View>
        ) : (
          documents.map((doc, index) => {
            const expiryStatus = getExpiryStatus(doc.expiry_date);

            return (
              <MotiView
                key={doc.id}
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  type: "timing",
                  duration: 300,
                  delay: index * 100,
                }}
              >
                <GlassView
                  isInteractive={false}
                  style={[
                    {
                      padding: 16,
                      borderRadius: 16,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.06,
                      shadowRadius: 6,
                      elevation: 2,
                    },
                    isLiquidGlassAvailable()
                      ? {}
                      : {
                          opacity: 0.9,
                          backgroundColor: "#FFFFFF",
                          borderWidth: 1,
                          borderColor: "#E2E8F0",
                        },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        backgroundColor: "#EFF6FF",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {getDocumentIcon(doc.document_type)}
                    </View>

                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 4,
                        }}
                      >
                        <View style={{ flex: 1, marginRight: 8 }}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "700",
                              color: "#1E293B",
                              fontFamily: "Montserrat_700Bold",
                            }}
                          >
                            {doc.title}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#64748B",
                              marginTop: 2,
                              fontFamily: "Montserrat_400Regular",
                            }}
                          >
                            {getDocumentTypeLabel(doc.document_type)}
                          </Text>
                        </View>

                        {expiryStatus && (
                          <View
                            style={{
                              backgroundColor: expiryStatus.bg,
                              paddingHorizontal: 8,
                              paddingVertical: 4,
                              borderRadius: 6,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: "600",
                                color: expiryStatus.color,
                                fontFamily: "Montserrat_600SemiBold",
                              }}
                            >
                              {expiryStatus.label}
                            </Text>
                          </View>
                        )}
                      </View>

                      {doc.document_number && (
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#64748B",
                            fontFamily: "Montserrat_500Medium",
                            marginBottom: 4,
                          }}
                        >
                          Nº {doc.document_number}
                        </Text>
                      )}

                      {doc.expiry_date && (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                            marginTop: 6,
                          }}
                        >
                          <Calendar size={14} color="#64748B" />
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#64748B",
                              fontFamily: "Montserrat_400Regular",
                            }}
                          >
                            Expira:{" "}
                            {new Date(doc.expiry_date).toLocaleDateString(
                              "pt-PT",
                            )}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Action Buttons */}
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      marginTop: 12,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        router.push({
                          pathname: "/visualizar-documento",
                          params: {
                            url: doc.document_url,
                            policyNumber: doc.title,
                          },
                        });
                      }}
                      activeOpacity={0.7}
                      style={{
                        flex: 1,
                        backgroundColor: "#F0F9FF",
                        padding: 10,
                        borderRadius: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        borderWidth: 1,
                        borderColor: "#BAE6FD",
                      }}
                    >
                      <Eye size={16} color="#0284C7" />
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: "600",
                          color: "#0284C7",
                          fontFamily: "Montserrat_600SemiBold",
                        }}
                      >
                        Ver
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => onDeleteDocument(doc.id)}
                      activeOpacity={0.7}
                      style={{
                        backgroundColor: "#FEF2F2",
                        padding: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#FECACA",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Trash2 size={16} color="#EF4444" />
                    </TouchableOpacity>
                  </View>

                  {/* Warning for expiring documents */}
                  {getDaysUntilExpiry(doc.expiry_date) !== null &&
                    getDaysUntilExpiry(doc.expiry_date) <= 30 &&
                    getDaysUntilExpiry(doc.expiry_date) >= 0 && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                          backgroundColor: "#FEF3C7",
                          padding: 10,
                          borderRadius: 8,
                          marginTop: 12,
                        }}
                      >
                        <AlertCircle size={16} color="#F59E0B" />
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12,
                            color: "#92400E",
                            fontFamily: "Montserrat_400Regular",
                          }}
                        >
                          Renove este documento antes que expire!
                        </Text>
                      </View>
                    )}
                </GlassView>
              </MotiView>
            );
          })
        )}
      </View>
    </View>
  );
}



