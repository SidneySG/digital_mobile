import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

export function useDocumentPicker() {
  const [document, setDocument] = useState(null);
  const [documentName, setDocumentName] = useState("");

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        setDocument(asset);
        setDocumentName(asset.name);
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error("Error picking document:", error);
      alert("Erro ao selecionar documento");
      return { success: false };
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão de câmera necessária");
      return { success: false };
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        setDocument(asset);
        setDocumentName("Foto da Apólice");
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error("Error taking photo:", error);
      alert("Erro ao tirar foto");
      return { success: false };
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão de galeria necessária");
      return { success: false };
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        setDocument(asset);
        setDocumentName("Imagem da Apólice");
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Erro ao selecionar imagem");
      return { success: false };
    }
  };

  const removeDocument = () => {
    setDocument(null);
    setDocumentName("");
  };

  return {
    document,
    documentName,
    pickDocument,
    takePhoto,
    pickImage,
    removeDocument,
  };
}



