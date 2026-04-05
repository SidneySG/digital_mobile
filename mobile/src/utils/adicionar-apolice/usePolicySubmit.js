import { useState } from "react";
import useUpload from "@/utils/useUpload";

export function usePolicySubmit() {
  const [loading, setLoading] = useState(false);
  const [upload, { loading: uploadLoading }] = useUpload();

  const submitPolicy = async ({
    formData,
    showCustomInsurer,
    document,
    userId,
  }) => {
    setLoading(true);

    try {
      // Upload document first
      let certificateUrl = null;
      if (document) {
        const uploadResult = await upload({
          reactNativeAsset: document,
        });

        if (uploadResult.error) {
          throw new Error("Erro ao fazer upload do documento");
        }

        certificateUrl = uploadResult.url;
      }

      const response = await fetch("/api/policies/external", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          policyNumber: formData.policyNumber.trim(),
          insuranceTypeId: formData.insuranceTypeId,
          insuranceCompanyId: showCustomInsurer
            ? null
            : formData.insuranceCompanyId,
          customInsurerName: showCustomInsurer
            ? formData.customInsurerName.trim()
            : null,
          insuredValue: parseFloat(formData.insuredValue),
          startDate: formData.startDate,
          endDate: formData.endDate,
          certificateUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao adicionar apólice");
      }

      return { success: true };
    } catch (error) {
      console.error("Error adding policy:", error);
      alert(error.message || "Erro ao adicionar apólice. Tente novamente.");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return { submitPolicy, loading: loading || uploadLoading };
}



