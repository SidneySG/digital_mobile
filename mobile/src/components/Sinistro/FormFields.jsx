import { View, Text, TextInput } from "react-native";

export function FormFields({ formData, onUpdateField }) {
  return (
    <>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: "#1E293B",
          marginBottom: 16,
          fontFamily: "Poppins_700Bold",
        }}
      >
        Detalhes do Sinistro
      </Text>

      <View style={{ gap: 16, marginBottom: 32 }}>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1E293B",
              marginBottom: 8,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Descrição do Sinistro *
          </Text>
          <TextInput
            value={formData.description}
            onChangeText={(text) => onUpdateField("description", text)}
            placeholder="Descreva o que aconteceu..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={{
              backgroundColor: "#FFFFFF",
              borderWidth: 1,
              borderColor: "#E2E8F0",
              borderRadius: 12,
              padding: 16,
              fontSize: 15,
              color: "#1E293B",
              fontFamily: "Poppins_400Regular",
              minHeight: 100,
            }}
          />
        </View>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#1E293B",
                marginBottom: 8,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              Data
            </Text>
            <TextInput
              value={formData.date}
              editable={false}
              style={{
                backgroundColor: "#F8FAFC",
                borderWidth: 1,
                borderColor: "#E2E8F0",
                borderRadius: 12,
                padding: 16,
                fontSize: 15,
                color: "#64748B",
                fontFamily: "Poppins_400Regular",
              }}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#1E293B",
                marginBottom: 8,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              Hora
            </Text>
            <TextInput
              value={formData.time}
              editable={false}
              style={{
                backgroundColor: "#F8FAFC",
                borderWidth: 1,
                borderColor: "#E2E8F0",
                borderRadius: 12,
                padding: 16,
                fontSize: 15,
                color: "#64748B",
                fontFamily: "Poppins_400Regular",
              }}
            />
          </View>
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1E293B",
              marginBottom: 8,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Local do Sinistro *
          </Text>
          <TextInput
            value={formData.location}
            onChangeText={(text) => onUpdateField("location", text)}
            placeholder="Ex: Av. Julius Nyerere, próximo ao Shoprite"
            placeholderTextColor="#94A3B8"
            style={{
              backgroundColor: "#FFFFFF",
              borderWidth: 1,
              borderColor: "#E2E8F0",
              borderRadius: 12,
              padding: 16,
              fontSize: 15,
              color: "#1E293B",
              fontFamily: "Poppins_400Regular",
            }}
          />
        </View>
      </View>
    </>
  );
}



