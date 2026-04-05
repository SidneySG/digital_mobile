import { View } from "react-native";

export function SectionDivider({ height = 1 }) {
  return (
    <View
      style={{
        height,
        backgroundColor: "#E2E8F0",
        marginBottom: 24,
      }}
    />
  );
}



