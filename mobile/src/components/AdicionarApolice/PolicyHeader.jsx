import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";

export function PolicyHeader({ onBack, insets }) {
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingHorizontal: 20,
        paddingBottom: 16,
        backgroundColor: "#2563EB",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
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
          Adicionar Apólice Externa
        </Text>
      </View>
      <Text
        style={{
          fontSize: 14,
          color: "#DBEAFE",
          marginTop: 8,
          marginLeft: 40,
          fontFamily: "Montserrat_400Regular",
        }}
      >
        Adicione apólices de outras seguradoras para gerenciar tudo em um só
        lugar
      </Text>
    </View>
  );
}



