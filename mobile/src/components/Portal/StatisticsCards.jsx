import { View, Text } from "react-native";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { Shield, AlertTriangle, FileText } from "lucide-react-native";
import { MotiView } from "moti";

export function StatisticsCards({
  activePoliciesCount,
  claimsCount,
  quotesCount,
}) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 400 }}
      style={{ flexDirection: "row", gap: 12, marginBottom: 24 }}
    >
      <View style={{ flex: 1 }}>
        <GlassView
          isInteractive={false}
          style={[
            { padding: 16, borderRadius: 16, alignItems: "center" },
            isLiquidGlassAvailable()
              ? {}
              : { opacity: 0.9, backgroundColor: "#EFF6FF" },
          ]}
        >
          <Shield size={28} color="#2563EB" />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: "#1E293B",
              marginTop: 8,
              fontFamily: "Montserrat_700Bold",
            }}
          >
            {activePoliciesCount}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#64748B",
              fontFamily: "Montserrat_400Regular",
              textAlign: "center",
            }}
          >
            Apólices Ativas
          </Text>
        </GlassView>
      </View>

      <View style={{ flex: 1 }}>
        <GlassView
          isInteractive={false}
          style={[
            { padding: 16, borderRadius: 16, alignItems: "center" },
            isLiquidGlassAvailable()
              ? {}
              : { opacity: 0.9, backgroundColor: "#FEF3C7" },
          ]}
        >
          <AlertTriangle size={28} color="#F59E0B" />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: "#1E293B",
              marginTop: 8,
              fontFamily: "Montserrat_700Bold",
            }}
          >
            {claimsCount}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#64748B",
              fontFamily: "Montserrat_400Regular",
              textAlign: "center",
            }}
          >
            Sinistros
          </Text>
        </GlassView>
      </View>

      <View style={{ flex: 1 }}>
        <GlassView
          isInteractive={false}
          style={[
            { padding: 16, borderRadius: 16, alignItems: "center" },
            isLiquidGlassAvailable()
              ? {}
              : { opacity: 0.9, backgroundColor: "#F0FDF4" },
          ]}
        >
          <FileText size={28} color="#10B981" />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: "#1E293B",
              marginTop: 8,
              fontFamily: "Montserrat_700Bold",
            }}
          >
            {quotesCount}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#64748B",
              fontFamily: "Montserrat_400Regular",
              textAlign: "center",
            }}
          >
            Cotações
          </Text>
        </GlassView>
      </View>
    </MotiView>
  );
}



