import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";
import { useCotacaoFlow } from "@/utils/cotacao/useCotacaoFlow";
import { CotacaoHeader } from "@/components/Cotacao/CotacaoHeader";
import { QuoteTypeSelection } from "@/components/Cotacao/QuoteTypeSelection";
import { InsurerSelection } from "@/components/Cotacao/InsurerSelection";
import { InsuranceTypeSelection } from "@/components/Cotacao/InsuranceTypeSelection";
import { InsuranceSpecificFields } from "@/components/Cotacao/InsuranceSpecificFields";
import { CotacaoForm } from "@/components/Cotacao/CotacaoForm";
import { CotacaoFooter } from "@/components/Cotacao/CotacaoFooter";
import { MissingDocumentsModal } from "@/components/DocumentVerification/MissingDocumentsModal";
import { useAutoFillFromDocuments } from "@/utils/useAutoFillFromDocuments";
import { QUOTE_TYPES } from "@/utils/cotacao/constants";

export default function CotacaoScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const { checkRequiredDocuments } = useAutoFillFromDocuments();

  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [documentCheckResult, setDocumentCheckResult] = useState(null);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const {
    step,
    quoteType,
    setQuoteType,
    selectedTypes,
    toggleInsuranceType,
    selectedInsurer,
    setSelectedInsurer,
    specificData,
    setSpecificData,
    formData,
    setFormData,
    isFromDetails,
    getTotalSteps,
    handleNext,
    handleBack,
    canProceed,
    isFormStep,
    shouldShowInsuranceTypeSelection,
    shouldShowSpecificFields,
  } = useCotacaoFlow(params);

  // Verificar documentos quando usuário avançar para campos específicos
  useEffect(() => {
    if (shouldShowSpecificFields() && selectedTypes.length > 0) {
      const firstType = selectedTypes[0];
      const result = checkRequiredDocuments(firstType);

      if (!result.hasRequired && result.missing.length > 0) {
        setDocumentCheckResult({
          insuranceType: firstType,
          ...result,
        });
        setShowDocumentModal(true);
      }
    }
  }, [shouldShowSpecificFields, selectedTypes]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
      <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
        <StatusBar style="light" />

        <CotacaoHeader
          insets={insets}
          step={step}
          totalSteps={getTotalSteps()}
          onBack={handleBack}
        />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Step 1: Choose Quote Type */}
          {step === 1 && (
            <QuoteTypeSelection
              quoteType={quoteType}
              onSelectQuoteType={setQuoteType}
            />
          )}

          {/* Step 2 (Preferred Insurer): Choose Insurer */}
          {step === 2 && quoteType === QUOTE_TYPES.PREFERRED_INSURER && (
            <InsurerSelection
              selectedInsurer={selectedInsurer}
              onSelectInsurer={setSelectedInsurer}
            />
          )}

          {/* Step 2 (Best Price) or Step 3 (Preferred): Choose Insurance Types */}
          {shouldShowInsuranceTypeSelection() && (
            <InsuranceTypeSelection
              selectedTypes={selectedTypes}
              onToggleType={toggleInsuranceType}
            />
          )}

          {/* Insurance-Specific Fields */}
          {shouldShowSpecificFields() && (
            <InsuranceSpecificFields
              selectedTypes={selectedTypes}
              specificData={specificData}
              onUpdateSpecificData={setSpecificData}
            />
          )}

          {/* Final Step: Fill Form */}
          {isFormStep() && (
            <CotacaoForm formData={formData} onUpdateFormData={setFormData} />
          )}
        </ScrollView>

        <CotacaoFooter
          insets={insets}
          canProceed={canProceed()}
          isFormStep={isFormStep()}
          onNext={handleNext}
        />

        {/* Modal de verificação de documentos */}
        {documentCheckResult && (
          <MissingDocumentsModal
            visible={showDocumentModal}
            onClose={() => setShowDocumentModal(false)}
            insuranceType={documentCheckResult.insuranceType}
            missingDocuments={documentCheckResult.missing}
            availableDocuments={documentCheckResult.available}
          />
        )}
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}



