import { useState } from "react";

export function usePolicyForm() {
  const [formData, setFormData] = useState({
    policyNumber: "",
    insuranceTypeId: "",
    insuranceCompanyId: "",
    customInsurerName: "",
    insuredValue: "",
    startDate: "",
    endDate: "",
  });

  const [showCustomInsurer, setShowCustomInsurer] = useState(false);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = (document) => {
    const newErrors = {};

    if (!formData.policyNumber.trim()) {
      newErrors.policyNumber = "Número da apólice é obrigatório";
    }

    if (!formData.insuranceTypeId) {
      newErrors.insuranceTypeId = "Tipo de seguro é obrigatório";
    }

    if (!showCustomInsurer && !formData.insuranceCompanyId) {
      newErrors.insuranceCompanyId = "Seguradora é obrigatória";
    }

    if (showCustomInsurer && !formData.customInsurerName.trim()) {
      newErrors.customInsurerName = "Nome da seguradora é obrigatório";
    }

    if (!formData.insuredValue || parseFloat(formData.insuredValue) <= 0) {
      newErrors.insuredValue = "Valor segurado é obrigatório";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Data de início é obrigatória";
    }

    if (!formData.endDate) {
      newErrors.endDate = "Data de fim é obrigatória";
    }

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end <= start) {
        newErrors.endDate = "Data de fim deve ser posterior à data de início";
      }
    }

    if (!document) {
      newErrors.document = "Documento da apólice é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    showCustomInsurer,
    setShowCustomInsurer,
    errors,
    updateField,
    clearError,
    validateForm,
  };
}



