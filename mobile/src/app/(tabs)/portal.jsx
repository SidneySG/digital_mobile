import { View, ScrollView, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { Toast } from "@/components/Toast";
import { PortalHeader } from "@/components/Portal/PortalHeader";
import { StatisticsCards } from "@/components/Portal/StatisticsCards";
import { ClaimsSection } from "@/components/Portal/ClaimsSection";
import { PoliciesSection } from "@/components/Portal/PoliciesSection";
import { PaymentsSection } from "@/components/Portal/PaymentsSection";
import { QuotesSection } from "@/components/Portal/QuotesSection";
import { DocumentsSection } from "@/components/Portal/DocumentsSection";
import { SectionDivider } from "@/components/Portal/SectionDivider";
import { usePortalData } from "@/utils/portal/usePortalData";
import { useToast } from "@/utils/portal/useToast";

export default function PortalScreen() {
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const { toast, showToast, hideToast } = useToast();

  const {
    loading,
    refreshing,
    policyFilter,
    setPolicyFilter,
    paymentFilter,
    setPaymentFilter,
    claimFilter,
    setClaimFilter,
    documentFilter,
    setDocumentFilter,
    filteredPolicies,
    filteredPayments,
    filteredClaims,
    filteredDocuments,
    activePolicies,
    pendingQuotes,
    submittedClaims,
    onRefresh,
    onDeleteDocument,
  } = usePortalData();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <Toast {...toast} onHide={hideToast} />

      <PortalHeader insets={insets} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 84 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh(showToast)}
            colors={["#2563EB"]}
          />
        }
      >
        <StatisticsCards
          activePoliciesCount={activePolicies.length}
          claimsCount={submittedClaims.length}
          quotesCount={pendingQuotes.length}
        />

        <SectionDivider height={1} />

        {/* New Documents Section */}
        <DocumentsSection
          documents={filteredDocuments}
          documentFilter={documentFilter}
          setDocumentFilter={setDocumentFilter}
          loading={loading}
          showToast={showToast}
          onDeleteDocument={(docId) => onDeleteDocument(docId, showToast)}
        />

        <SectionDivider height={2} />

        <ClaimsSection
          filteredClaims={filteredClaims}
          claimFilter={claimFilter}
          setClaimFilter={setClaimFilter}
        />

        <SectionDivider height={2} />

        <PoliciesSection
          filteredPolicies={filteredPolicies}
          policyFilter={policyFilter}
          setPolicyFilter={setPolicyFilter}
          loading={loading}
          showToast={showToast}
        />

        <SectionDivider height={2} />

        <PaymentsSection
          filteredPayments={filteredPayments}
          paymentFilter={paymentFilter}
          setPaymentFilter={setPaymentFilter}
          loading={loading}
          showToast={showToast}
        />

        <SectionDivider height={2} />

        <QuotesSection pendingQuotes={pendingQuotes} />
      </ScrollView>
    </View>
  );
}



