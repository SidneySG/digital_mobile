import { View, Text } from "react-native";
import { AlertCircle } from "lucide-react-native";

export function RequiredFieldsNotice() {
  return (
    <View
      style={{
        backgroundColor: "#FEF3C7",
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        flexDirection: "row",
        gap: 12,
      }}
    >
      <AlertCircle size={20} color="#92400E" />
      <Text
        style={{
          flex: 1,
          fontSize: 13,
          color: "#92400E",
          fontFamily: "Poppins_400Regular",
          lineHeight: 20,
        }}
      >
        É obrigatório preencher todos os campos, adicionar pelo menos 1 foto e 1
        vídeo para registar o sinistro.
      </Text>
    </View>
  );
}



