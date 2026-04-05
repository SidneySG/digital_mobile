import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function SubmitButton({ onSubmit, canSubmit }) {
  const insets = useSafeAreaInsets();

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
        onPress={onSubmit}
        disabled={!canSubmit}
        activeOpacity={0.8}
      >
        <View
          style={{
            backgroundColor: canSubmit ? "#10B981" : "#CBD5E1",
            padding: 18,
            borderRadius: 12,
            alignItems: "center",
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
            Registar Sinistro
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}



