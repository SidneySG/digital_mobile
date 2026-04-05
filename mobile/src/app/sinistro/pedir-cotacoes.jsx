import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  Upload,
  MapPin,
  Calendar,
  Users,
  Wrench,
  X,
  Image as ImageIcon,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useUpload } from "@/utils/useUpload";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function PedirCotacoesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { uploadFile } = useUpload();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contactPhone: "",
    minQuotes: "3",
    inspectionAvailable: false,
    deadlineDays: "7",
  });

  const [damagePhotos, setDamagePhotos] = useState([]);
  const [uploading, setUploading] = useState(false);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets) {
        await uploadImages(result.assets);
      }
    } catch (error) {
      console.error("Error picking images:", error);
      Alert.alert("Erro", "Falha ao selecionar imagens");
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permissão necessária", "Precisamos de acesso à câmera");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadImages([result.assets[0]]);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Erro", "Falha ao tirar foto");
    }
  };

  const uploadImages = async (assets) => {
    setUploading(true);
    try {
      const uploadPromises = assets.map((asset) => uploadFile(asset.uri));
      const uploadedUrls = await Promise.all(uploadPromises);

      setDamagePhotos([...damagePhotos, ...uploadedUrls.filter(Boolean)]);
    } catch (error) {
      console.error("Error uploading images:", error);
      Alert.alert("Erro", "Falha ao carregar imagens");
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (index) => {
    setDamagePhotos(damagePhotos.filter((_, i) => i !== index));
  };

  const showPhotoOptions = () => {
    Alert.alert("Adicionar Fotos do Dano", "Como deseja adicionar fotos?", [
      { text: "Tirar Foto", onPress: takePhoto },
      { text: "Escolher da Galeria", onPress: pickImage },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const handleSelectWorkshops = () => {
    router.push("/sinistro/selecionar-oficinas");
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.contactPhone) {
      Alert.alert(
        "Campos Obrigatórios",
        "Preencha todos os campos obrigatórios",
      );
      return;
    }

    if (damagePhotos.length === 0) {
      Alert.alert("Fotos Necessárias", "Adicione pelo menos uma foto do dano");
      return;
    }

    try {
      const deadlineDate = new Date();
      deadlineDate.setDate(
        deadlineDate.getDate() + parseInt(formData.deadlineDays || "7"),
      );

      const response = await fetch("/api/claim-quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          deadline: deadlineDate.toISOString(),
          damagePhotos,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit request");

      Alert.alert("Sucesso! ✅", "Pedido de cotação enviado com sucesso", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Error submitting request:", error);
      Alert.alert("Erro", "Falha ao enviar pedido de cotação");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
      <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
        <StatusBar style="light" />

        {/* Header */}
        <LinearGradient
          colors={["#059669", "#10B981"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingTop: insets.top + 16,
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <TouchableOpacity onPress={() => router.back()}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ArrowLeft size={24} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700",
                  color: "#FFFFFF",
                  fontFamily: "Montserrat_700Bold",
                }}
              >
                Pedir Cotações
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#D1FAE5",
                  fontFamily: "Montserrat_400Regular",
                }}
              >
                Concurso para reparação
              </Text>
            </View>
          </View>
        </LinearGradient>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>
              Título do Pedido <Text style={{ color: "#EF4444" }}>*</Text>
            </Text>
            <TextInput
              value={formData.title}
              onChangeText={(text) => updateField("title", text)}
              placeholder="Ex: Reparação de Danos na Porta Dianteira"
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />
          </View>

          {/* Description */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>
              Descrição do Dano <Text style={{ color: "#EF4444" }}>*</Text>
            </Text>
            <TextInput
              value={formData.description}
              onChangeText={(text) => updateField("description", text)}
              placeholder="Descreva detalhadamente os danos..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
              style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            />
          </View>

          {/* Damage Photos */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>
              Fotos do Dano <Text style={{ color: "#EF4444" }}>*</Text>
            </Text>

            {damagePhotos.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 12, flexGrow: 0 }}
                contentContainerStyle={{ gap: 12 }}
              >
                {damagePhotos.map((photo, index) => (
                  <View key={index} style={{ position: "relative" }}>
                    <Image
                      source={{ uri: photo }}
                      style={{ width: 100, height: 100, borderRadius: 12 }}
                      contentFit="cover"
                    />
                    <TouchableOpacity
                      onPress={() => removePhoto(index)}
                      style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor: "#EF4444",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <X size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}

            <TouchableOpacity onPress={showPhotoOptions} activeOpacity={0.7}>
              <View style={styles.uploadBox}>
                <ImageIcon size={32} color="#10B981" />
                <Text style={styles.uploadText}>
                  {uploading ? "A carregar..." : "Adicionar Fotos"}
                </Text>
                <Text style={styles.uploadHint}>
                  Tire fotos ou escolha da galeria
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Contact Phone */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>
              Contacto <Text style={{ color: "#EF4444" }}>*</Text>
            </Text>
            <TextInput
              value={formData.contactPhone}
              onChangeText={(text) => updateField("contactPhone", text)}
              placeholder="+258 84 000 0000"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>

          {/* Deadline Days */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>
              Prazo para Cotações (dias){" "}
              <Text style={{ color: "#EF4444" }}>*</Text>
            </Text>
            <TextInput
              value={formData.deadlineDays}
              onChangeText={(text) => updateField("deadlineDays", text)}
              placeholder="Ex: 7"
              placeholderTextColor="#94A3B8"
              keyboardType="number-pad"
              style={styles.input}
            />
            <Text style={styles.hint}>
              O concurso encerrará em {formData.deadlineDays || "7"} dias
            </Text>
          </View>

          {/* Min Quotes */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>Mínimo de Cotações para Abertura</Text>
            <TextInput
              value={formData.minQuotes}
              onChangeText={(text) => updateField("minQuotes", text)}
              placeholder="Ex: 3"
              placeholderTextColor="#94A3B8"
              keyboardType="number-pad"
              style={styles.input}
            />
          </View>

          {/* Inspection Available */}
          <View style={[styles.switchRow, { marginBottom: 20 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Disponível para Vistoria</Text>
              <Text style={styles.hint}>
                Permitir que oficinas agendem vistoria
              </Text>
            </View>
            <Switch
              value={formData.inspectionAvailable}
              onValueChange={(value) =>
                updateField("inspectionAvailable", value)
              }
              trackColor={{ false: "#E2E8F0", true: "#10B981" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Select Workshops */}
          <TouchableOpacity onPress={handleSelectWorkshops} activeOpacity={0.7}>
            <View style={styles.selectBox}>
              <Wrench size={24} color="#10B981" />
              <View style={{ flex: 1 }}>
                <Text style={styles.selectTitle}>Oficinas Preferidas</Text>
                <Text style={styles.selectHint}>
                  Selecionar até 10 oficinas (opcional)
                </Text>
              </View>
              <Text style={{ fontSize: 24, color: "#CBD5E1" }}>›</Text>
            </View>
          </TouchableOpacity>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Text style={{ fontSize: 18 }}>💡</Text>
            <Text style={styles.infoText}>
              As oficinas selecionadas receberão o pedido e poderão enviar suas
              propostas até a data de encerramento.
            </Text>
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 20,
            paddingVertical: 16,
            paddingBottom: insets.bottom + 16,
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#E2E8F0",
          }}
        >
          <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8}>
            <LinearGradient
              colors={["#059669", "#10B981"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                padding: 18,
                borderRadius: 16,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#FFFFFF",
                  fontFamily: "Montserrat_700Bold",
                }}
              >
                Enviar Pedido de Cotação
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}

const styles = {
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
    fontFamily: "Montserrat_600SemiBold",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: "#1E293B",
    fontFamily: "Montserrat_400Regular",
  },
  uploadBox: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#D1FAE5",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    borderStyle: "dashed",
  },
  uploadText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
    marginTop: 12,
    fontFamily: "Montserrat_600SemiBold",
  },
  uploadHint: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
    fontFamily: "Montserrat_400Regular",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  hint: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
    fontFamily: "Montserrat_400Regular",
  },
  selectBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
  },
  selectTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
    fontFamily: "Montserrat_600SemiBold",
  },
  selectHint: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
    fontFamily: "Montserrat_400Regular",
  },
  infoBox: {
    backgroundColor: "#FEF3C7",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#92400E",
    fontFamily: "Montserrat_400Regular",
    lineHeight: 18,
  },
};



