import { View, Text, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";

export function CotacaoFooter({ insets, canProceed, isFormStep, onNext }) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: insets.bottom + 20,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
      }}
    >
      <TouchableOpacity
        onPress={onNext}
        disabled={!canProceed}
        activeOpacity={0.8}
      >
        <View
          style={{
            backgroundColor: canProceed ? "#2563EB" : "#CBD5E1",
            padding: 18,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: "#FFFFFF",
              fontFamily: "Poppins_700Bold",
            }}
          >
            {isFormStep ? "Enviar Pedido" : "Continuar"}
          </Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
}



