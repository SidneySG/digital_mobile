import { View } from "react-native";
import { MotiView } from "moti";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";

export function SkeletonCard({ width = "100%", height = 120 }) {
  return (
    <MotiView
      from={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "timing",
        duration: 1000,
        loop: true,
      }}
      style={{ width }}
    >
      <GlassView
        isInteractive={false}
        style={[
          {
            height,
            borderRadius: 16,
          },
          isLiquidGlassAvailable()
            ? {}
            : { opacity: 0.5, backgroundColor: "#E2E8F0" },
        ]}
      />
    </MotiView>
  );
}

export function SkeletonPolicyCard() {
  return (
    <MotiView
      from={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "timing",
        duration: 1000,
        loop: true,
      }}
    >
      <GlassView
        isInteractive={false}
        style={[
          {
            padding: 18,
            borderRadius: 16,
            gap: 12,
          },
          isLiquidGlassAvailable()
            ? {}
            : { opacity: 0.5, backgroundColor: "#F1F5F9" },
        ]}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              width: 120,
              height: 16,
              backgroundColor: "#CBD5E1",
              borderRadius: 4,
            }}
          />
          <View
            style={{
              width: 60,
              height: 24,
              backgroundColor: "#CBD5E1",
              borderRadius: 8,
            }}
          />
        </View>
        <View
          style={{
            width: 80,
            height: 12,
            backgroundColor: "#CBD5E1",
            borderRadius: 4,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <View
            style={{
              width: 100,
              height: 14,
              backgroundColor: "#CBD5E1",
              borderRadius: 4,
            }}
          />
          <View
            style={{
              width: 80,
              height: 14,
              backgroundColor: "#CBD5E1",
              borderRadius: 4,
            }}
          />
        </View>
      </GlassView>
    </MotiView>
  );
}

export function SkeletonPaymentCard() {
  return (
    <MotiView
      from={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "timing",
        duration: 1000,
        loop: true,
      }}
    >
      <GlassView
        isInteractive={false}
        style={[
          {
            padding: 16,
            borderRadius: 16,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          },
          isLiquidGlassAvailable()
            ? {}
            : { opacity: 0.5, backgroundColor: "#F1F5F9" },
        ]}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: "#CBD5E1",
          }}
        />
        <View style={{ flex: 1, gap: 6 }}>
          <View
            style={{
              width: "60%",
              height: 14,
              backgroundColor: "#CBD5E1",
              borderRadius: 4,
            }}
          />
          <View
            style={{
              width: "80%",
              height: 10,
              backgroundColor: "#CBD5E1",
              borderRadius: 4,
            }}
          />
        </View>
        <View
          style={{
            width: 60,
            height: 16,
            backgroundColor: "#CBD5E1",
            borderRadius: 4,
          }}
        />
      </GlassView>
    </MotiView>
  );
}



