import { useState, useRef } from "react";
import { Alert } from "react-native";

export function useVideoRecording(getCurrentLocation) {
  const [videos, setVideos] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recordingTimer = useRef(null);

  const startVideoRecording = async (cameraRef) => {
    if (!cameraRef.current || isRecording) return;

    try {
      setIsRecording(true);
      setRecordingDuration(0);

      // Start timer
      recordingTimer.current = setInterval(() => {
        setRecordingDuration((prev) => {
          if (prev >= 15) {
            stopVideoRecording(cameraRef);
            return 15;
          }
          return prev + 1;
        });
      }, 1000);

      const video = await cameraRef.current.recordAsync({
        maxDuration: 15,
      });

      // Video stopped (either manually or reached max duration)
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }

      const location = await getCurrentLocation();

      const videoData = {
        uri: video.uri,
        location,
        timestamp: Date.now(),
        duration: recordingDuration,
      };

      setVideos([...videos, videoData]);
      setIsRecording(false);
      setRecordingDuration(0);

      Alert.alert("Sucesso", "Vídeo gravado com sucesso!");
      return true;
    } catch (error) {
      console.error("Error recording video:", error);
      setIsRecording(false);
      setRecordingDuration(0);
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }
      Alert.alert("Erro", "Não foi possível gravar o vídeo.");
      return false;
    }
  };

  const stopVideoRecording = (cameraRef) => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
    }
  };

  const removeVideo = (index) => {
    Alert.alert("Remover Vídeo", "Tem certeza que deseja remover este vídeo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => {
          setVideos(videos.filter((_, i) => i !== index));
        },
      },
    ]);
  };

  return {
    videos,
    isRecording,
    recordingDuration,
    startVideoRecording,
    stopVideoRecording,
    removeVideo,
  };
}



