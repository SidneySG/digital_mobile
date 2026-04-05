import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useUser } from "@/utils/auth/useUser";
import { useInsuranceData } from "@/utils/adicionar-apolice/useInsuranceData";
import { useDocumentPicker } from "@/utils/adicionar-apolice/useDocumentPicker";
import { usePolicyForm } from "@/utils/adicionar-apolice/usePolicyForm";
import { usePolicySubmit } from "@/utils/adicionar-apolice/usePolicySubmit";
import { PolicyHeader } from "@/components/AdicionarApolice/PolicyHeader";
import { PolicyNumberField } from "@/components/AdicionarApolice/PolicyNumberField";
import { InsuranceTypeSelector } from "@/components/AdicionarApolice/InsuranceTypeSelector";
import { InsurerSelector } from "@/components/AdicionarApolice/InsurerSelector";
import { InsuredValueField } from "@/components/AdicionarApolice/InsuredValueField";
import { ValidityPeriodFields } from "@/components/AdicionarApolice/ValidityPeriodFields";
import { DocumentUploadSection } from "@/components/AdicionarApolice/DocumentUploadSection";
import { InfoBox } from "@/components/AdicionarApolice/InfoBox";
import { SubmitButton } from "@/components/AdicionarApolice/SubmitButton";

export default function AdicionarApoliceScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useUser();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const { insuranceTypes, insuranceCompanies } = useInsuranceData();
  const {
    document,
    documentName,
    pickDocument,
    takePhoto,
    pickImage,
    removeDocument,
  } = useDocumentPicker();

  const {
    formData,
    showCustomInsurer,
    setShowCustomInsurer,
    errors,
    updateField,
    clearError,
    validateForm,
  } = usePolicyForm();

  const { submitPolicy, loading } = usePolicySubmit();

  const handleSubmit = async () => {
    if (!validateForm(document)) {
      return;
    }

    if (!user?.id) {
      alert("Você precisa estar logado para adicionar uma apólice");
      return;
    }

    const result = await submitPolicy({
      formData,
      showCustomInsurer,
      document,
      userId: user.id,
    });

    if (result.success) {
      router.push("/(tabs)/portal");
    }
  };

  const handleDocumentPicked = async (pickerFn) => {
    const result = await pickerFn();
    if (result.success) {
      clearError("document");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <PolicyHeader onBack={() => router.back()} insets={insets} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <PolicyNumberField
          value={formData.policyNumber}
          onChange={(text) => updateField("policyNumber", text)}
          error={errors.policyNumber}
        />

        <InsuranceTypeSelector
          types={insuranceTypes}
          selectedId={formData.insuranceTypeId}
          onSelect={(id) => updateField("insuranceTypeId", id)}
          error={errors.insuranceTypeId}
        />

        <InsurerSelector
          companies={insuranceCompanies}
          selectedId={formData.insuranceCompanyId}
          onSelect={(id) => updateField("insuranceCompanyId", id)}
          showCustom={showCustomInsurer}
          onToggleCustom={(show) => {
            setShowCustomInsurer(show);
            if (!show) {
              updateField("customInsurerName", "");
            }
          }}
          customName={formData.customInsurerName}
          onCustomNameChange={(text) => updateField("customInsurerName", text)}
          error={errors.insuranceCompanyId}
          customError={errors.customInsurerName}
        />

        <InsuredValueField
          value={formData.insuredValue}
          onChange={(text) => updateField("insuredValue", text)}
          error={errors.insuredValue}
        />

        <ValidityPeriodFields
          startDate={formData.startDate}
          endDate={formData.endDate}
          onStartDateChange={(text) => updateField("startDate", text)}
          onEndDateChange={(text) => updateField("endDate", text)}
          startDateError={errors.startDate}
          endDateError={errors.endDate}
        />

        <DocumentUploadSection
          document={document}
          documentName={documentName}
          onPickDocument={() => handleDocumentPicked(pickDocument)}
          onTakePhoto={() => handleDocumentPicked(takePhoto)}
          onPickImage={() => handleDocumentPicked(pickImage)}
          onRemoveDocument={removeDocument}
          error={errors.document}
        />

        <InfoBox />
      </ScrollView>

      <SubmitButton onSubmit={handleSubmit} loading={loading} insets={insets} />
    </View>
  );
}



