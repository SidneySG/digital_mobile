import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Building2, Check } from "lucide-react-native";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";

export function InsurerSelector({
  companies,
  selectedId,
  onSelect,
  showCustom,
  onToggleCustom,
  customName,
  onCustomNameChange,
  error,
  customError,
}) {
  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <Building2 size={18} color="#64748B" />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: "#1E293B",
            fontFamily: "Montserrat_600SemiBold",
          }}
        >
          Seguradora *
        </Text>
      </View>

      {!showCustom ? (
        <>
          <View style={{ gap: 8, marginBottom: 12 }}>
            {companies.map((company) => (
              <TouchableOpacity
                key={company.id}
                onPress={() => onSelect(company.id)}
                activeOpacity={0.7}
              >
                <GlassView
                  isInteractive={true}
                  style={[
                    {
                      padding: 14,
                      borderRadius: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                    isLiquidGlassAvailable()
                      ? {}
                      : {
                          backgroundColor:
                            selectedId === company.id ? "#EFF6FF" : "#FFFFFF",
                          borderWidth: 1,
                          borderColor:
                            selectedId === company.id ? "#2563EB" : "#E2E8F0",
                        },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: selectedId === company.id ? "600" : "400",
                      color: selectedId === company.id ? "#2563EB" : "#1E293B",
                      fontFamily:
                        selectedId === company.id
                          ? "Montserrat_600SemiBold"
                          : "Montserrat_400Regular",
                    }}
                  >
                    {company.name}
                  </Text>
                  {selectedId === company.id && (
                    <Check size={20} color="#2563EB" />
                  )}
                </GlassView>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            onPress={() => onToggleCustom(true)}
            activeOpacity={0.7}
            style={{
              padding: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#2563EB",
              borderStyle: "dashed",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#2563EB",
                textAlign: "center",
                fontFamily: "Montserrat_600SemiBold",
              }}
            >
              + Outra Seguradora
            </Text>
          </TouchableOpacity>
          {error && (
            <Text
              style={{
                fontSize: 12,
                color: "#EF4444",
                marginTop: 4,
                fontFamily: "Montserrat_400Regular",
              }}
            >
              {error}
            </Text>
          )}
        </>
      ) : (
        <>
          <GlassView
            isInteractive={false}
            style={[
              {
                borderRadius: 12,
                overflow: "hidden",
              },
              isLiquidGlassAvailable()
                ? {}
                : {
                    backgroundColor: "#FFFFFF",
                    borderWidth: 1,
                    borderColor: customError ? "#EF4444" : "#E2E8F0",
                  },
            ]}
          >
            <TextInput
              value={customName}
              onChangeText={onCustomNameChange}
              placeholder="Nome da seguradora"
              placeholderTextColor="#94A3B8"
              style={{
                padding: 14,
                fontSize: 15,
                color: "#1E293B",
                fontFamily: "Montserrat_400Regular",
              }}
            />
          </GlassView>
          <TouchableOpacity
            onPress={() => onToggleCustom(false)}
            activeOpacity={0.7}
            style={{ marginTop: 8 }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "#2563EB",
                fontFamily: "Montserrat_500Medium",
              }}
            >
              ← Voltar para lista
            </Text>
          </TouchableOpacity>
          {customError && (
            <Text
              style={{
                fontSize: 12,
                color: "#EF4444",
                marginTop: 4,
                fontFamily: "Montserrat_400Regular",
              }}
            >
              {customError}
            </Text>
          )}
        </>
      )}
    </View>
  );
}



