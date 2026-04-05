import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";

export function PhotoDescriptionModal({
  photoUri,
  description,
  onDescriptionChange,
  onSave,
  onCancel,
  isSaving,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="dark" />

      <View
        style={{
          paddingTop: insets.top + 12,
          paddingHorizontal: 20,
          paddingBottom: 16,
          backgroundColor: "#FFFFFF",
          borderBottomWidth: 1,
          borderBottomColor: "#E2E8F0",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#1E293B",
            fontFamily: "Poppins_700Bold",
          }}
        >
          Adicionar Descrição
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: "#D4AF37",
            marginTop: 4,
            fontFamily: "Poppins_600SemiBold",
          }}
        >
          Foto inclui régua de verificação anti-fraude
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      >
        {/* Photo preview showing the ruler */}
        <View
          style={{
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 20,
            borderWidth: 2,
            borderColor: "#D4AF37",
          }}
        >
          <Image
            source={{ uri: photoUri }}
            style={{
              width: "100%",
              height: 300,
            }}
            contentFit="contain"
          />
        </View>

        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: "#1E293B",
            marginBottom: 8,
            fontFamily: "Poppins_600SemiBold",
          }}
        >
          Descrição da Foto
        </Text>
        <TextInput
          value={description}
          onChangeText={onDescriptionChange}
          placeholder="Descreva o que mostra esta foto..."
          placeholderTextColor="#94A3B8"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          editable={!isSaving}
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
            opacity: isSaving ? 0.6 : 1,
          }}
        />
      </ScrollView>

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
          flexDirection: "row",
          gap: 12,
        }}
      >
        <TouchableOpacity
          onPress={onCancel}
          disabled={isSaving}
          style={{ flex: 1 }}
          activeOpacity={0.8}
        >
          <View
            style={{
              backgroundColor: isSaving ? "#E2E8F0" : "#F1F5F9",
              padding: 18,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: isSaving ? "#94A3B8" : "#64748B",
                fontFamily: "Poppins_700Bold",
              }}
            >
              Cancelar
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSave}
          disabled={isSaving}
          style={{ flex: 1 }}
          activeOpacity={0.8}
        >
          <View
            style={{
              backgroundColor: isSaving ? "#93C5FD" : "#2563EB",
              padding: 18,
              borderRadius: 12,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {isSaving && <ActivityIndicator size="small" color="#FFFFFF" />}
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#FFFFFF",
                fontFamily: "Poppins_700Bold",
              }}
            >
              {isSaving ? "Guardando..." : "Guardar Foto"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}



