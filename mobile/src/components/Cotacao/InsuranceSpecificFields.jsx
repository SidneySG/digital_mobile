import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { INSURANCE_TYPES } from "@/utils/cotacao/constants";
import { ChevronDown, Sparkles } from "lucide-react-native";
import { DocumentUploadSection } from "./DocumentUploadSection";
import { useAutoFillFromDocuments } from "@/utils/useAutoFillFromDocuments";
import { useEffect } from "react";

export function InsuranceSpecificFields({
  selectedTypes,
  specificData,
  onUpdateSpecificData,
}) {
  const {
    loading: loadingDocs,
    getAutoInsuranceData,
    getHousingInsuranceData,
    getTravelInsuranceData,
    getBusinessInsuranceData,
    hasDocuments,
  } = useAutoFillFromDocuments();

  // Auto-preencher campos quando documentos estiverem disponíveis
  useEffect(() => {
    if (!loadingDocs && hasDocuments && selectedTypes.length > 0) {
      selectedTypes.forEach((typeId) => {
        // Só auto-preencher se não houver dados já preenchidos
        if (
          !specificData[typeId] ||
          Object.keys(specificData[typeId]).length === 0
        ) {
          let autoFilledData = {};

          switch (typeId) {
            case "auto":
              const autoData = getAutoInsuranceData();
              if (autoData.vehicle) {
                autoFilledData = {
                  marca: autoData.vehicle.marca,
                  modelo: autoData.vehicle.modelo,
                  ano: autoData.vehicle.ano,
                  matricula: autoData.vehicle.matricula,
                  proprietario: autoData.vehicle.proprietario,
                };
              }
              break;

            case "habitacao":
              const housingData = getHousingInsuranceData();
              if (housingData.property) {
                autoFilledData = {
                  endereco: housingData.property.endereco,
                  area: housingData.property.area,
                  tipologia: housingData.property.tipologia,
                };
              }
              break;

            case "viagem":
              const travelData = getTravelInsuranceData();
              if (travelData.passport) {
                autoFilledData = {
                  numeroPassaporte: travelData.passport.numeroPassaporte,
                  nacionalidade: travelData.passport.nacionalidade,
                };
              }
              break;

            case "empresarial":
              const businessData = getBusinessInsuranceData();
              if (businessData.business) {
                autoFilledData = {
                  nomeEmpresa: businessData.business.nomeEmpresa,
                  nuit: businessData.business.nuit,
                  atividade: businessData.business.atividade,
                };
              }
              break;
          }

          // Aplicar dados auto-preenchidos
          if (Object.keys(autoFilledData).length > 0) {
            onUpdateSpecificData({
              ...specificData,
              [typeId]: {
                ...specificData[typeId],
                ...autoFilledData,
              },
            });
          }
        }
      });
    }
  }, [loadingDocs, hasDocuments, selectedTypes]);

  if (selectedTypes.length === 0) return null;

  const selectedInsurances = INSURANCE_TYPES.filter((ins) =>
    selectedTypes.includes(ins.id),
  );

  const shouldShowField = (field, insuranceId) => {
    if (!field.showWhen) return true;
    const data = specificData[insuranceId] || {};
    return field.showWhen(data);
  };

  const updateFieldValue = (insuranceId, fieldId, value) => {
    const currentData = specificData[insuranceId] || {};
    onUpdateSpecificData({
      ...specificData,
      [insuranceId]: {
        ...currentData,
        [fieldId]: value,
      },
    });
  };

  const handleDocumentDataExtracted = (
    insuranceId,
    extractedData,
    documentType,
  ) => {
    const currentData = specificData[insuranceId] || {};

    // Merge extracted data with current data
    const updatedData = {
      ...currentData,
      ...extractedData,
    };

    // Store document reference
    if (!updatedData.documents) {
      updatedData.documents = {};
    }
    updatedData.documents[documentType] = true;

    onUpdateSpecificData({
      ...specificData,
      [insuranceId]: updatedData,
    });
  };

  const handleDocumentRemove = (insuranceId, documentType) => {
    const currentData = specificData[insuranceId] || {};

    if (currentData.documents) {
      delete currentData.documents[documentType];
    }

    onUpdateSpecificData({
      ...specificData,
      [insuranceId]: currentData,
    });
  };

  const getFieldValue = (insuranceId, fieldId) => {
    return specificData[insuranceId]?.[fieldId] || "";
  };

  const handleAutoFill = (insuranceId) => {
    let autoFilledData = {};

    switch (insuranceId) {
      case "auto":
        const autoData = getAutoInsuranceData();
        if (autoData.vehicle) {
          autoFilledData = {
            marca: autoData.vehicle.marca,
            modelo: autoData.vehicle.modelo,
            ano: autoData.vehicle.ano,
            matricula: autoData.vehicle.matricula,
            proprietario: autoData.vehicle.proprietario,
          };
        }
        break;

      case "habitacao":
        const housingData = getHousingInsuranceData();
        if (housingData.property) {
          autoFilledData = {
            endereco: housingData.property.endereco,
            area: housingData.property.area,
            tipologia: housingData.property.tipologia,
          };
        }
        break;

      case "viagem":
        const travelData = getTravelInsuranceData();
        if (travelData.passport) {
          autoFilledData = {
            numeroPassaporte: travelData.passport.numeroPassaporte,
            nacionalidade: travelData.passport.nacionalidade,
          };
        }
        break;

      case "empresarial":
        const businessData = getBusinessInsuranceData();
        if (businessData.business) {
          autoFilledData = {
            nomeEmpresa: businessData.business.nomeEmpresa,
            nuit: businessData.business.nuit,
            atividade: businessData.business.atividade,
          };
        }
        break;
    }

    if (Object.keys(autoFilledData).length > 0) {
      onUpdateSpecificData({
        ...specificData,
        [insuranceId]: {
          ...specificData[insuranceId],
          ...autoFilledData,
        },
      });
    }
  };

  const renderField = (field, insuranceId) => {
    const value = getFieldValue(insuranceId, field.id);

    if (!shouldShowField(field, insuranceId)) return null;

    const commonInputStyle = {
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "#E2E8F0",
      borderRadius: 12,
      padding: 16,
      fontSize: 15,
      color: "#1E293B",
      fontFamily: "Poppins_400Regular",
    };

    return (
      <View key={field.id}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: "#1E293B",
            marginBottom: 8,
            fontFamily: "Poppins_600SemiBold",
          }}
        >
          {field.label}
          {field.required && <Text style={{ color: "#EF4444" }}> *</Text>}
        </Text>

        {field.type === "select" ? (
          <View>
            {field.options.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() =>
                  updateFieldValue(insuranceId, field.id, option.value)
                }
                activeOpacity={0.7}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 16,
                    borderRadius: 12,
                    backgroundColor:
                      value === option.value ? "#EFF6FF" : "#FFFFFF",
                    borderWidth: 2,
                    borderColor: value === option.value ? "#2563EB" : "#E2E8F0",
                    marginBottom: 8,
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor:
                        value === option.value ? "#2563EB" : "#CBD5E1",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    {value === option.value && (
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: "#2563EB",
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 15,
                      color: "#1E293B",
                      fontFamily: "Poppins_400Regular",
                    }}
                  >
                    {option.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : field.type === "currency" ? (
          <TextInput
            value={value}
            onChangeText={(text) => {
              // Format currency input
              const cleaned = text.replace(/[^0-9]/g, "");
              updateFieldValue(insuranceId, field.id, cleaned);
            }}
            placeholder={field.placeholder}
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            style={commonInputStyle}
          />
        ) : field.type === "number" ? (
          <TextInput
            value={value}
            onChangeText={(text) =>
              updateFieldValue(insuranceId, field.id, text)
            }
            placeholder={field.placeholder}
            placeholderTextColor="#94A3B8"
            keyboardType="number-pad"
            style={commonInputStyle}
          />
        ) : (
          <TextInput
            value={value}
            onChangeText={(text) =>
              updateFieldValue(insuranceId, field.id, text)
            }
            placeholder={field.placeholder}
            placeholderTextColor="#94A3B8"
            style={commonInputStyle}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{ marginTop: 24 }}>
      <View
        style={{
          backgroundColor: "#000000",
          padding: 20,
          borderRadius: 16,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#FFFFFF",
            marginBottom: 4,
            fontFamily: "Poppins_700Bold",
          }}
        >
          Informações Específicas
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#D4AF37",
            fontFamily: "Poppins_400Regular",
          }}
        >
          Complete os dados para cada seguro selecionado
        </Text>
      </View>

      {selectedInsurances.map((insurance) => {
        const IconComponent = insurance.icon;
        const hasAutoFillData =
          (insurance.id === "auto" && getAutoInsuranceData().vehicle) ||
          (insurance.id === "habitacao" &&
            getHousingInsuranceData().property) ||
          (insurance.id === "viagem" && getTravelInsuranceData().passport) ||
          (insurance.id === "empresarial" &&
            getBusinessInsuranceData().business);

        return (
          <View
            key={insurance.id}
            style={{
              backgroundColor: "#F8FAFC",
              padding: 20,
              borderRadius: 16,
              marginBottom: 20,
              borderWidth: 2,
              borderColor: "#E2E8F0",
            }}
          >
            {/* Insurance Type Header com botão de auto-preencher */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
                paddingBottom: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#E2E8F0",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: insurance.color,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <IconComponent size={20} color="#FFFFFF" />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#1E293B",
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  {insurance.title}
                </Text>
              </View>

              {hasAutoFillData && (
                <TouchableOpacity
                  onPress={() => handleAutoFill(insurance.id)}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                    backgroundColor: "#EFF6FF",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#BFDBFE",
                  }}
                >
                  <Sparkles size={12} color="#2563EB" />
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "600",
                      color: "#2563EB",
                      fontFamily: "Poppins_600SemiBold",
                    }}
                  >
                    Preencher
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Document Upload Section */}
            {insurance.documents && insurance.documents.length > 0 && (
              <View style={{ marginBottom: 24 }}>
                <View
                  style={{
                    backgroundColor: "#EFF6FF",
                    padding: 12,
                    borderRadius: 12,
                    marginBottom: 16,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#1E40AF",
                      fontFamily: "Poppins_500Medium",
                      textAlign: "center",
                    }}
                  >
                    💡 Carregue documentos para preencher automaticamente
                  </Text>
                </View>

                {insurance.documents.map((doc) => (
                  <DocumentUploadSection
                    key={doc.id}
                    insuranceType={insurance.id}
                    documentType={doc.id}
                    onDataExtracted={(data, docType) =>
                      handleDocumentDataExtracted(insurance.id, data, docType)
                    }
                    onRemove={(docType) =>
                      handleDocumentRemove(insurance.id, docType)
                    }
                    existingDocument={
                      specificData[insurance.id]?.documents?.[doc.id]
                        ? { uri: "uploaded" }
                        : null
                    }
                  />
                ))}

                <View
                  style={{
                    height: 1,
                    backgroundColor: "#E2E8F0",
                    marginTop: 8,
                    marginBottom: 16,
                  }}
                />
              </View>
            )}

            {/* Fields */}
            <View style={{ gap: 16 }}>
              {insurance.fields.map((field) =>
                renderField(field, insurance.id),
              )}
            </View>
          </View>
        );
      })}

      <View
        style={{
          backgroundColor: "#FEF3C7",
          padding: 16,
          borderRadius: 12,
          flexDirection: "row",
          gap: 12,
        }}
      >
        <Text style={{ fontSize: 18 }}>💡</Text>
        <Text
          style={{
            flex: 1,
            fontSize: 13,
            color: "#92400E",
            fontFamily: "Poppins_400Regular",
          }}
        >
          Os campos marcados com * são obrigatórios para processar a sua cotação
        </Text>
      </View>
    </View>
  );
}



