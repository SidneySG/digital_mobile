import { Alert } from "react-native";
import { useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";

export function usePermissions() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [locationPermission, requestLocationPermission] =
    Location.useForegroundPermissions();

  const requestPermissions = async () => {
    if (!cameraPermission?.granted) {
      const result = await requestCameraPermission();
      if (!result.granted) {
        Alert.alert(
          "Permissão Necessária",
          "Precisamos de acesso à câmera para registar o sinistro.",
        );
        return false;
      }
    }

    if (!locationPermission?.granted) {
      const result = await requestLocationPermission();
      if (!result.granted) {
        Alert.alert(
          "Permissão Necessária",
          "Precisamos de acesso à localização para registar o sinistro.",
        );
        return false;
      }
    }

    return true;
  };

  return {
    cameraPermission,
    locationPermission,
    requestPermissions,
  };
}



