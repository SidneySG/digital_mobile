import { useState, useEffect } from "react";

export function useInsuranceData() {
  const [insuranceTypes, setInsuranceTypes] = useState([]);
  const [insuranceCompanies, setInsuranceCompanies] = useState([]);

  useEffect(() => {
    fetchInsuranceData();
  }, []);

  const fetchInsuranceData = async () => {
    try {
      const [typesRes, companiesRes] = await Promise.all([
        fetch("/api/insurance-types"),
        fetch("/api/insurance-companies"),
      ]);

      if (typesRes.ok) {
        const typesData = await typesRes.json();
        setInsuranceTypes(typesData.insuranceTypes || []);
      }

      if (companiesRes.ok) {
        const companiesData = await companiesRes.json();
        setInsuranceCompanies(companiesData.companies || []);
      }
    } catch (error) {
      console.error("Error fetching insurance data:", error);
    }
  };

  return { insuranceTypes, insuranceCompanies };
}



