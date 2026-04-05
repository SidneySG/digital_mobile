import { useState } from "react";
import { Alert } from "react-native";
import { addRulerToImage } from "./addRulerToImage";

export function usePhotoCapture(getCurrentLocation) {
  const [photos, setPhotos] = useState([]);
  const [currentPhotoUri, setCurrentPhotoUri] = useState(null);
  const [photoDescription, setPhotoDescription] = useState("");
  const [showPhotoDescription, setShowPhotoDescription] = useState(false);
  const [savingPhoto, setSavingPhoto] = useState(false);

  const capturePhoto = async (cameraRef) => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        exif: true,
      });

      // Add ruler overlay to photo for anti-fraud verification
      const photoWithRuler = await addRulerToImage(photo.uri);

      setCurrentPhotoUri(photoWithRuler);
      return photoWithRuler;
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Erro", "Não foi possível tirar a foto.");
      return null;
    }
  };

  const savePhotoWithDescription = async () => {
    if (!photoDescription.trim()) {
      Alert.alert("Atenção", "Por favor, adicione uma descrição para a foto.");
      return false;
    }

    setSavingPhoto(true);

    try {
      const location = await getCurrentLocation();

      const photoData = {
        uri: currentPhotoUri,
        description: photoDescription,
        location,
        timestamp: Date.now(),
      };

      setPhotos([...photos, photoData]);
      setCurrentPhotoUri(null);
      setPhotoDescription("");
      setShowPhotoDescription(false);

      Alert.alert("Sucesso", "Foto adicionada com sucesso!");
      return true;
    } catch (error) {
      console.error("Error saving photo:", error);
      Alert.alert("Erro", "Não foi possível guardar a foto.");
      return false;
    } finally {
      setSavingPhoto(false);
    }
  };

  const removePhoto = (index) => {
    Alert.alert("Remover Foto", "Tem certeza que deseja remover esta foto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => {
          setPhotos(photos.filter((_, i) => i !== index));
        },
      },
    ]);
  };

  const cancelPhotoDescription = () => {
    setCurrentPhotoUri(null);
    setPhotoDescription("");
    setShowPhotoDescription(false);
  };

  return {
    photos,
    currentPhotoUri,
    photoDescription,
    showPhotoDescription,
    savingPhoto,
    setCurrentPhotoUri,
    setPhotoDescription,
    setShowPhotoDescription,
    capturePhoto,
    savePhotoWithDescription,
    removePhoto,
    cancelPhotoDescription,
  };
}



