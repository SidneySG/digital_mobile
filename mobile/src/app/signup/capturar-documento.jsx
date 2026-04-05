import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  ChevronLeft,
  Camera,
  CreditCard,
  FileText,
  CheckCircle2,
  X,
  BookOpen,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image } from "expo-image";
import { MotiView } from "moti";
import * as ImagePicker from "expo-image-picker";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function CapturarDocumentoScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [documentType, setDocumentType] = useState(null);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [passportImage, setPassportImage] = useState(null);
  const [direImage, setDireImage] = useState(null);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const isIndividual = params.accountType === "individual";

  const openCamera = async (side) => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Permissão de câmera necessária");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      if (documentType === "bi") {
        if (side === "front") setFrontImage(uri);
        else setBackImage(uri);
      } else if (documentType === "passaporte") {
        if (side === "passport") setPassportImage(uri);
        else setDireImage(uri);
      }
    }
  };

  const handleContinue = () => {
    let documentsData = {};

    if (documentType === "bi") {
      if (!frontImage || !backImage) {
        alert("Por favor, capture ambos os lados do BI");
        return;
      }
      documentsData = {
        type: "bi",
        front: frontImage,
        back: backImage,
      };
    } else if (documentType === "passaporte") {
      if (!passportImage || !direImage) {
        alert("Por favor, capture o Passaporte e o DIRE");
        return;
      }
      documentsData = {
        type: "passaporte",
        passport: passportImage,
        dire: direImage,
      };
    }

    router.push({
      pathname: "/signup/extrair-dados",
      params: {
        accountType: params.accountType,
        ...documentsData,
      },
    });
  };

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
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#1E293B",
            fontFamily: "Poppins_700Bold",
          }}
        >
          {isIndividual
            ? "Documento de Identificação"
            : "Documentação Empresarial"}
        </Text>
      </View>

      <View style={{ flex: 1, padding: 20 }}>
        {!documentType ? (
          <>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: "#1E293B",
                fontFamily: "Poppins_700Bold",
                marginBottom: 12,
              }}
            >
              {isIndividual
                ? "Selecione o Tipo de Documento"
                : "Documentos da Empresa"}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#64748B",
                fontFamily: "Poppins_400Regular",
                marginBottom: 32,
                lineHeight: 22,
              }}
            >
              {isIndividual
                ? "Escolha o documento que usará para o registo"
                : "Prepare os documentos necessários para o registo"}
            </Text>

            {isIndividual ? (
              <View style={{ gap: 16 }}>
                <TouchableOpacity
                  onPress={() => setDocumentType("bi")}
                  activeOpacity={0.8}
                >
                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: 12,
                      padding: 20,
                      borderWidth: 1,
                      borderColor: "#E2E8F0",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <View
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                        backgroundColor: "#EFF6FF",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CreditCard size={28} color="#3B82F6" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "700",
                          color: "#1E293B",
                          fontFamily: "Poppins_700Bold",
                          marginBottom: 4,
                        }}
                      >
                        Bilhete de Identidade (BI)
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          color: "#64748B",
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        Para cidadãos moçambicanos
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setDocumentType("passaporte")}
                  activeOpacity={0.8}
                >
                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: 12,
                      padding: 20,
                      borderWidth: 1,
                      borderColor: "#E2E8F0",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <View
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                        backgroundColor: "#F0FDF4",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <BookOpen size={28} color="#10B981" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "700",
                          color: "#1E293B",
                          fontFamily: "Poppins_700Bold",
                          marginBottom: 4,
                        }}
                      >
                        Passaporte + DIRE
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          color: "#64748B",
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        Para cidadãos estrangeiros
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 12,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: "#E2E8F0",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#1E293B",
                    fontFamily: "Poppins_700Bold",
                    marginBottom: 12,
                  }}
                >
                  Documentos Necessários:
                </Text>
                <View style={{ gap: 8 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <CheckCircle2 size={18} color="#10B981" />
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#475569",
                        fontFamily: "Poppins_400Regular",
                      }}
                    >
                      Certidão de Registo Comercial
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <CheckCircle2 size={18} color="#10B981" />
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#475569",
                        fontFamily: "Poppins_400Regular",
                      }}
                    >
                      NUIT da Empresa
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <CheckCircle2 size={18} color="#10B981" />
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#475569",
                        fontFamily: "Poppins_400Regular",
                      }}
                    >
                      BI do Representante Legal
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/signup/formulario-empresa",
                      params: { accountType: params.accountType },
                    })
                  }
                  activeOpacity={0.8}
                  style={{ marginTop: 20 }}
                >
                  <View
                    style={{
                      backgroundColor: "#10B981",
                      padding: 16,
                      borderRadius: 12,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#FFFFFF",
                        fontFamily: "Poppins_700Bold",
                      }}
                    >
                      Continuar
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: "#1E293B",
                fontFamily: "Poppins_700Bold",
                marginBottom: 12,
              }}
            >
              Capture os Documentos
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#64748B",
                fontFamily: "Poppins_400Regular",
                marginBottom: 32,
                lineHeight: 22,
              }}
            >
              {documentType === "bi"
                ? "Tire fotos da frente e verso do BI"
                : "Tire fotos do Passaporte e DIRE"}
            </Text>

            {documentType === "bi" ? (
              <View style={{ gap: 16 }}>
                <TouchableOpacity
                  onPress={() => openCamera("front")}
                  activeOpacity={0.8}
                >
                  <View
                    style={{
                      backgroundColor: frontImage ? "#F0FDF4" : "#FFFFFF",
                      borderRadius: 12,
                      padding: 20,
                      borderWidth: 2,
                      borderColor: frontImage ? "#10B981" : "#E2E8F0",
                      borderStyle: frontImage ? "solid" : "dashed",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    {frontImage ? (
                      <>
                        <Image
                          source={{ uri: frontImage }}
                          style={{
                            width: "100%",
                            height: 200,
                            borderRadius: 8,
                          }}
                          contentFit="cover"
                        />
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <CheckCircle2 size={18} color="#10B981" />
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "600",
                              color: "#10B981",
                              fontFamily: "Poppins_600SemiBold",
                            }}
                          >
                            BI Frente Capturado
                          </Text>
                        </View>
                      </>
                    ) : (
                      <>
                        <Camera size={40} color="#3B82F6" />
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#3B82F6",
                            fontFamily: "Poppins_600SemiBold",
                          }}
                        >
                          Capturar BI Frente
                        </Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => openCamera("back")}
                  activeOpacity={0.8}
                >
                  <View
                    style={{
                      backgroundColor: backImage ? "#F0FDF4" : "#FFFFFF",
                      borderRadius: 12,
                      padding: 20,
                      borderWidth: 2,
                      borderColor: backImage ? "#10B981" : "#E2E8F0",
                      borderStyle: backImage ? "solid" : "dashed",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    {backImage ? (
                      <>
                        <Image
                          source={{ uri: backImage }}
                          style={{
                            width: "100%",
                            height: 200,
                            borderRadius: 8,
                          }}
                          contentFit="cover"
                        />
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <CheckCircle2 size={18} color="#10B981" />
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "600",
                              color: "#10B981",
                              fontFamily: "Poppins_600SemiBold",
                            }}
                          >
                            BI Verso Capturado
                          </Text>
                        </View>
                      </>
                    ) : (
                      <>
                        <Camera size={40} color="#3B82F6" />
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#3B82F6",
                            fontFamily: "Poppins_600SemiBold",
                          }}
                        >
                          Capturar BI Verso
                        </Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ gap: 16 }}>
                <TouchableOpacity
                  onPress={() => openCamera("passport")}
                  activeOpacity={0.8}
                >
                  <View
                    style={{
                      backgroundColor: passportImage ? "#F0FDF4" : "#FFFFFF",
                      borderRadius: 12,
                      padding: 20,
                      borderWidth: 2,
                      borderColor: passportImage ? "#10B981" : "#E2E8F0",
                      borderStyle: passportImage ? "solid" : "dashed",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    {passportImage ? (
                      <>
                        <Image
                          source={{ uri: passportImage }}
                          style={{
                            width: "100%",
                            height: 200,
                            borderRadius: 8,
                          }}
                          contentFit="cover"
                        />
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <CheckCircle2 size={18} color="#10B981" />
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "600",
                              color: "#10B981",
                              fontFamily: "Poppins_600SemiBold",
                            }}
                          >
                            Passaporte Capturado
                          </Text>
                        </View>
                      </>
                    ) : (
                      <>
                        <BookOpen size={40} color="#3B82F6" />
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#3B82F6",
                            fontFamily: "Poppins_600SemiBold",
                          }}
                        >
                          Capturar Passaporte
                        </Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => openCamera("dire")}
                  activeOpacity={0.8}
                >
                  <View
                    style={{
                      backgroundColor: direImage ? "#F0FDF4" : "#FFFFFF",
                      borderRadius: 12,
                      padding: 20,
                      borderWidth: 2,
                      borderColor: direImage ? "#10B981" : "#E2E8F0",
                      borderStyle: direImage ? "solid" : "dashed",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    {direImage ? (
                      <>
                        <Image
                          source={{ uri: direImage }}
                          style={{
                            width: "100%",
                            height: 200,
                            borderRadius: 8,
                          }}
                          contentFit="cover"
                        />
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <CheckCircle2 size={18} color="#10B981" />
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "600",
                              color: "#10B981",
                              fontFamily: "Poppins_600SemiBold",
                            }}
                          >
                            DIRE Capturado
                          </Text>
                        </View>
                      </>
                    ) : (
                      <>
                        <FileText size={40} color="#3B82F6" />
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#3B82F6",
                            fontFamily: "Poppins_600SemiBold",
                          }}
                        >
                          Capturar DIRE
                        </Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              onPress={handleContinue}
              activeOpacity={0.8}
              style={{ marginTop: 24 }}
            >
              <View
                style={{
                  backgroundColor:
                    (documentType === "bi" && frontImage && backImage) ||
                    (documentType === "passaporte" &&
                      passportImage &&
                      direImage)
                      ? "#3B82F6"
                      : "#CBD5E1",
                  padding: 18,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#FFFFFF",
                    fontFamily: "Poppins_700Bold",
                  }}
                >
                  Continuar para Extração de Dados
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}



