import { View, ScrollView, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useRef } from "react";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { usePermissions } from "@/utils/sinistro/usePermissions";
import { useLocation } from "@/utils/sinistro/useLocation";
import { usePhotoCapture } from "@/utils/sinistro/usePhotoCapture";
import { useVideoRecording } from "@/utils/sinistro/useVideoRecording";
import { useFormData } from "@/utils/sinistro/useFormData";

import { CameraView } from "@/components/Sinistro/CameraView";
import { PhotoDescriptionModal } from "@/components/Sinistro/PhotoDescriptionModal";
import { FormHeader } from "@/components/Sinistro/FormHeader";
import { RequiredFieldsNotice } from "@/components/Sinistro/RequiredFieldsNotice";
import { FormFields } from "@/components/Sinistro/FormFields";
import { PhotosSection } from "@/components/Sinistro/PhotosSection";
import { VideosSection } from "@/components/Sinistro/VideosSection";
import { SubmitButton } from "@/components/Sinistro/SubmitButton";

export default function FormularioSinistroScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const cameraRef = useRef(null);

  const { requestPermissions } = usePermissions();
  const { getCurrentLocation } = useLocation();
  const { formData, updateFormData } = useFormData();

  const {
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
  } = usePhotoCapture(getCurrentLocation);

  const {
    videos,
    isRecording,
    recordingDuration,
    startVideoRecording,
    stopVideoRecording,
    removeVideo,
  } = useVideoRecording(getCurrentLocation);

  const [showCamera, setShowCamera] = useState(false);
  const [cameraMode, setCameraMode] = useState("photo"); // 'photo' or 'video'

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleTakePhoto = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    setCameraMode("photo");
    setShowCamera(true);
  };

  const handleRecordVideo = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    setCameraMode("video");
    setShowCamera(true);
  };

  const handleCapturePhoto = async () => {
    const uri = await capturePhoto(cameraRef);
    if (uri) {
      setCurrentPhotoUri(uri);
      setShowCamera(false);
      setShowPhotoDescription(true);
    }
  };

  const handleStartVideoRecording = async () => {
    await startVideoRecording(cameraRef);
  };

  const handleStopVideoRecording = () => {
    stopVideoRecording(cameraRef);
  };

  const handleVideoRecordingComplete = async () => {
    const success = await startVideoRecording(cameraRef);
    if (success) {
      setShowCamera(false);
    }
  };

  const handleSavePhoto = async () => {
    const success = await savePhotoWithDescription();
    if (success) {
      // Photo saved successfully
    }
  };

  const canSubmit = () => {
    return (
      formData.description.trim() &&
      formData.location.trim() &&
      photos.length > 0 &&
      videos.length > 0
    );
  };

  const handleSubmit = () => {
    if (!canSubmit()) {
      Alert.alert(
        "Formulário Incompleto",
        "Por favor, preencha todos os campos, adicione pelo menos uma foto e um vídeo.",
      );
      return;
    }

    // Submit the form
    Alert.alert(
      "Sucesso",
      "Sinistro registado com sucesso! Nossa equipa entrará em contacto consigo.",
      [
        {
          text: "OK",
          onPress: () => router.push("/(tabs)"),
        },
      ],
    );
  };

  // Camera View
  if (showCamera) {
    return (
      <CameraView
        cameraRef={cameraRef}
        cameraMode={cameraMode}
        isRecording={isRecording}
        recordingDuration={recordingDuration}
        onBack={() => {
          if (isRecording) {
            stopVideoRecording(cameraRef);
          }
          setShowCamera(false);
        }}
        onCapture={handleCapturePhoto}
        onStartRecording={handleStartVideoRecording}
        onStopRecording={handleStopVideoRecording}
      />
    );
  }

  // Photo Description Modal
  if (showPhotoDescription && currentPhotoUri) {
    return (
      <PhotoDescriptionModal
        photoUri={currentPhotoUri}
        description={photoDescription}
        onDescriptionChange={setPhotoDescription}
        onSave={handleSavePhoto}
        onCancel={cancelPhotoDescription}
        isSaving={savingPhoto}
      />
    );
  }

  // Main Form
  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="light" />

      <FormHeader
        policyNumber={params.policyNumber}
        onBack={() => router.back()}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <RequiredFieldsNotice />

        <FormFields formData={formData} onUpdateField={updateFormData} />

        <PhotosSection
          photos={photos}
          onTakePhoto={handleTakePhoto}
          onRemovePhoto={removePhoto}
        />

        <VideosSection
          videos={videos}
          onRecordVideo={handleRecordVideo}
          onRemoveVideo={removeVideo}
        />
      </ScrollView>

      <SubmitButton onSubmit={handleSubmit} canSubmit={canSubmit()} />
    </View>
  );
}



