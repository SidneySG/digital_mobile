import { View, Text } from "react-native";

export function InfoBox() {
  return (
    <View
      style={{
        backgroundColor: "#EFF6FF",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#BFDBFE",
      }}
    >
      <Text
        style={{
          fontSize: 13,
          color: "#1E40AF",
          lineHeight: 20,
          fontFamily: "Montserrat_400Regular",
        }}
      >
        ℹ️ Ao adicionar esta apólice, você receberá alertas quando estiver
        próxima do vencimento, com ofertas para renovação através da Digital ao
        melhor preço.
      </Text>
    </View>
  );
}



