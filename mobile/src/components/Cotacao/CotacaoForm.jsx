import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Sparkles } from "lucide-react-native";
import { useEffect } from "react";
import { useAutoFillFromDocuments } from "@/utils/useAutoFillFromDocuments";

export function CotacaoForm({ formData, onUpdateFormData }) {
  const {
    loading: loadingDocs,
    getPersonalData,
    hasDocuments,
  } = useAutoFillFromDocuments();

  // Auto-preencher com dados de documentos quando disponíveis
  useEffect(() => {
    if (!loadingDocs && hasDocuments && !formData.name) {
      const personalData = getPersonalData();
      if (personalData.fullName || personalData.nuit) {
        onUpdateFormData({
          ...formData,
          name: personalData.fullName || formData.name,
          nuit: personalData.nuit || formData.nuit,
        });
      }
    }
  }, [loadingDocs, hasDocuments]);

  const handleAutoFill = () => {
    const personalData = getPersonalData();
    onUpdateFormData({
      ...formData,
      name: personalData.fullName || formData.name,
      nuit: personalData.nuit || formData.nuit,
    });
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#1E293B",
            fontFamily: "Poppins_700Bold",
          }}
        >
          Preencha os Seus Dados
        </Text>
        {hasDocuments && (
          <TouchableOpacity
            onPress={handleAutoFill}
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              backgroundColor: "#EFF6FF",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#BFDBFE",
            }}
          >
            <Sparkles size={14} color="#2563EB" />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: "#2563EB",
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              Auto-preencher
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Text
        style={{
          fontSize: 14,
          color: "#64748B",
          marginBottom: 20,
          fontFamily: "Poppins_400Regular",
        }}
      >
        Complete o formulário para receber a sua cotação
      </Text>

      {hasDocuments && (
        <View
          style={{
            backgroundColor: "#ECFDF5",
            padding: 12,
            borderRadius: 10,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: "#A7F3D0",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#059669",
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            ✨ Dados disponíveis dos seus documentos carregados
          </Text>
        </View>
      )}

      <View style={{ gap: 16 }}>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1E293B",
              marginBottom: 8,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Nome Completo
          </Text>
          <TextInput
            value={formData.name}
            onChangeText={(text) =>
              onUpdateFormData({ ...formData, name: text })
            }
            placeholder="Digite o seu nome"
            placeholderTextColor="#94A3B8"
            style={{
              backgroundColor: "#FFFFFF",
              borderWidth: 1,
              borderColor: "#E2E8F0",
              borderRadius: 12,
              padding: 16,
              fontSize: 15,
              color: "#1E293B",
              fontFamily: "Poppins_400Regular",
            }}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1E293B",
              marginBottom: 8,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Telefone
          </Text>
          <TextInput
            value={formData.phone}
            onChangeText={(text) =>
              onUpdateFormData({ ...formData, phone: text })
            }
            placeholder="+258 84 000 0000"
            placeholderTextColor="#94A3B8"
            keyboardType="phone-pad"
            style={{
              backgroundColor: "#FFFFFF",
              borderWidth: 1,
              borderColor: "#E2E8F0",
              borderRadius: 12,
              padding: 16,
              fontSize: 15,
              color: "#1E293B",
              fontFamily: "Poppins_400Regular",
            }}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1E293B",
              marginBottom: 8,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Email
          </Text>
          <TextInput
            value={formData.email}
            onChangeText={(text) =>
              onUpdateFormData({ ...formData, email: text })
            }
            placeholder="seu@email.com"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              backgroundColor: "#FFFFFF",
              borderWidth: 1,
              borderColor: "#E2E8F0",
              borderRadius: 12,
              padding: 16,
              fontSize: 15,
              color: "#1E293B",
              fontFamily: "Poppins_400Regular",
            }}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1E293B",
              marginBottom: 8,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            NUIT (Opcional)
          </Text>
          <TextInput
            value={formData.nuit}
            onChangeText={(text) =>
              onUpdateFormData({ ...formData, nuit: text })
            }
            placeholder="000000000"
            placeholderTextColor="#94A3B8"
            keyboardType="number-pad"
            style={{
              backgroundColor: "#FFFFFF",
              borderWidth: 1,
              borderColor: "#E2E8F0",
              borderRadius: 12,
              padding: 16,
              fontSize: 15,
              color: "#1E293B",
              fontFamily: "Poppins_400Regular",
            }}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1E293B",
              marginBottom: 8,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Informações Adicionais
          </Text>
          <TextInput
            value={formData.details}
            onChangeText={(text) =>
              onUpdateFormData({ ...formData, details: text })
            }
            placeholder="Descreva detalhes sobre o seguro que procura"
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={{
              backgroundColor: "#FFFFFF",
              borderWidth: 1,
              borderColor: "#E2E8F0",
              borderRadius: 12,
              padding: 16,
              fontSize: 15,
              color: "#1E293B",
              fontFamily: "Poppins_400Regular",
              minHeight: 100,
            }}
          />
        </View>
      </View>
    </View>
  );
}



