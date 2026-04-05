import { View, Text, TouchableOpacity } from "react-native";

export function FilterButton({ active, label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
          backgroundColor: active ? "#2563EB" : "#F1F5F9",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: active ? "#FFFFFF" : "#64748B",
            fontFamily: "Montserrat_600SemiBold",
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}



