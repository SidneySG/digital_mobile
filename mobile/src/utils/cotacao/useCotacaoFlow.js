import { useState } from "react";
import { useRouter } from "expo-router";
import { QUOTE_TYPES, INSURANCE_TYPES } from "./constants";

export function useCotacaoFlow(params) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [quoteType, setQuoteType] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState(
    params.type ? [params.type] : [],
  );
  const [selectedInsurer, setSelectedInsurer] = useState(null);
  const [specificData, setSpecificData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    nuit: "",
    details: "",
  });

  const isFromDetails = Boolean(params.type);

  const getTotalSteps = () => {
    if (isFromDetails) {
      if (quoteType === QUOTE_TYPES.BEST_PRICE) return 2;
      if (quoteType === QUOTE_TYPES.PREFERRED_INSURER) return 3;
    }

    if (quoteType === QUOTE_TYPES.BEST_PRICE) return 3;
    if (quoteType === QUOTE_TYPES.PREFERRED_INSURER) return 4;
    return 3;
  };

  const toggleInsuranceType = (typeId) => {
    if (selectedTypes.includes(typeId)) {
      setSelectedTypes(selectedTypes.filter((id) => id !== typeId));
    } else {
      setSelectedTypes([...selectedTypes, typeId]);
    }
  };

  // Validate specific insurance fields
  const areSpecificFieldsValid = () => {
    for (const typeId of selectedTypes) {
      const insurance = INSURANCE_TYPES.find((ins) => ins.id === typeId);
      if (!insurance || !insurance.fields) continue;

      const data = specificData[typeId] || {};

      for (const field of insurance.fields) {
        // Check if field should be shown based on conditional logic
        if (field.showWhen && !field.showWhen(data)) continue;

        // Check required fields
        if (field.required) {
          const value = data[field.id];
          if (!value || value.toString().trim() === "") {
            return false;
          }
        }
      }
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && quoteType) {
      if (isFromDetails && quoteType === QUOTE_TYPES.BEST_PRICE) {
        setStep(2);
      } else if (isFromDetails && quoteType === QUOTE_TYPES.PREFERRED_INSURER) {
        setStep(2);
      } else {
        setStep(2);
      }
    } else if (step === 2 && quoteType === QUOTE_TYPES.BEST_PRICE) {
      if (isFromDetails) {
        const hasTiedInsurers = Math.random() > 0.5;

        if (hasTiedInsurers) {
          router.push({
            pathname: "/cotacao/selecionar-seguradora",
            params: {
              type: params.type,
              quoteType: QUOTE_TYPES.BEST_PRICE,
            },
          });
        } else {
          router.push({
            pathname: "/cotacao/pagamento",
            params: {
              insurerId: "hollard",
              amount: "27000",
              insuranceType: params.type || "auto",
            },
          });
        }
      } else {
        if (selectedTypes.length > 0) {
          setStep(3);
        }
      }
    } else if (
      step === 2 &&
      quoteType === QUOTE_TYPES.PREFERRED_INSURER &&
      selectedInsurer
    ) {
      setStep(3);
    } else if (step === 3 && quoteType === QUOTE_TYPES.PREFERRED_INSURER) {
      if (isFromDetails) {
        router.push({
          pathname: "/cotacao/pagamento",
          params: {
            insurerId: selectedInsurer,
            amount: "27000",
            insuranceType: params.type || "auto",
          },
        });
      } else {
        if (selectedTypes.length > 0) {
          setStep(4);
        }
      }
    } else if (step === 4 && quoteType === QUOTE_TYPES.PREFERRED_INSURER) {
      router.push({
        pathname: "/cotacao/pagamento",
        params: {
          insurerId: selectedInsurer,
          amount: "27000",
          insuranceType: selectedTypes[0] || "auto",
        },
      });
    } else if (step === 3 && quoteType === QUOTE_TYPES.BEST_PRICE) {
      const hasTiedInsurers = Math.random() > 0.5;

      if (hasTiedInsurers) {
        router.push({
          pathname: "/cotacao/selecionar-seguradora",
          params: {
            type: selectedTypes[0] || "auto",
            quoteType: QUOTE_TYPES.BEST_PRICE,
          },
        });
      } else {
        router.push({
          pathname: "/cotacao/pagamento",
          params: {
            insurerId: "hollard",
            amount: "27000",
            insuranceType: selectedTypes[0] || "auto",
          },
        });
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const canProceed = () => {
    if (step === 1) return quoteType !== null;

    if (step === 2 && quoteType === QUOTE_TYPES.BEST_PRICE) {
      if (isFromDetails) {
        return (
          formData.name &&
          formData.phone &&
          formData.email &&
          areSpecificFieldsValid()
        );
      }
      return selectedTypes.length > 0;
    }

    if (step === 2 && quoteType === QUOTE_TYPES.PREFERRED_INSURER)
      return selectedInsurer !== null;

    if (step === 3 && quoteType === QUOTE_TYPES.PREFERRED_INSURER) {
      if (isFromDetails) {
        return (
          formData.name &&
          formData.phone &&
          formData.email &&
          areSpecificFieldsValid()
        );
      }
      return selectedTypes.length > 0;
    }

    if (step === 3 && quoteType === QUOTE_TYPES.BEST_PRICE) {
      return selectedTypes.length > 0 && areSpecificFieldsValid();
    }

    if (step === 4 && quoteType === QUOTE_TYPES.PREFERRED_INSURER) {
      return (
        formData.name &&
        formData.phone &&
        formData.email &&
        areSpecificFieldsValid()
      );
    }

    return false;
  };

  const isFormStep = () => {
    return (
      (isFromDetails && step === 2 && quoteType === QUOTE_TYPES.BEST_PRICE) ||
      (isFromDetails &&
        step === 3 &&
        quoteType === QUOTE_TYPES.PREFERRED_INSURER) ||
      (!isFromDetails && step === 3 && quoteType === QUOTE_TYPES.BEST_PRICE) ||
      (!isFromDetails &&
        step === 4 &&
        quoteType === QUOTE_TYPES.PREFERRED_INSURER)
    );
  };

  const shouldShowInsuranceTypeSelection = () => {
    return (
      !isFromDetails &&
      ((step === 2 && quoteType === QUOTE_TYPES.BEST_PRICE) ||
        (step === 3 && quoteType === QUOTE_TYPES.PREFERRED_INSURER))
    );
  };

  const shouldShowSpecificFields = () => {
    return (
      selectedTypes.length > 0 &&
      ((step === 2 && quoteType === QUOTE_TYPES.BEST_PRICE && !isFromDetails) ||
        (step === 3 &&
          quoteType === QUOTE_TYPES.BEST_PRICE &&
          !isFromDetails) ||
        (step === 3 &&
          quoteType === QUOTE_TYPES.PREFERRED_INSURER &&
          !isFromDetails) ||
        (step === 2 && quoteType === QUOTE_TYPES.BEST_PRICE && isFromDetails) ||
        (step === 3 &&
          quoteType === QUOTE_TYPES.PREFERRED_INSURER &&
          isFromDetails))
    );
  };

  return {
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
  };
}



