import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

export function SubmitButton({ onSubmit, loading, insets }) {
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
        disabled={loading}
        activeOpacity={0.8}
        style={{
          backgroundColor: loading ? "#94A3B8" : "#2563EB",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
          shadowColor: "#2563EB",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: "#FFFFFF",
              fontFamily: "Montserrat_700Bold",
            }}
          >
            Adicionar Apólice
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}



