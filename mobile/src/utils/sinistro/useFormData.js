import { useState } from "react";

export function useFormData() {
  const [formData, setFormData] = useState({
    description: "",
    date: new Date().toLocaleDateString("pt-PT"),
    time: new Date().toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    location: "",
  });

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return {
    formData,
    setFormData,
    updateFormData,
  };
}



