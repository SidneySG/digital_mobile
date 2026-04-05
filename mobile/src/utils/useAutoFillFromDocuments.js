import { useState, useEffect } from "react";
import { useUser } from "./auth/useUser";

/**
 * Hook para auto-preencher formulários com dados extraídos de documentos via OCR
 *
 * @returns {Object} Dados extraídos organizados por tipo de documento
 */
export function useAutoFillFromDocuments() {
  const { user } = useUser();
  const [documents, setDocuments] = useState([]);
  const [extractedData, setExtractedData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadUserDocuments();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  const loadUserDocuments = async () => {
    try {
      const response = await fetch(`/api/documents?userId=${user.id}`);
      if (!response.ok) throw new Error("Failed to fetch documents");

      const data = await response.json();
      setDocuments(data.documents || []);

      // Organizar dados extraídos por tipo de documento
      const organized = {};
      (data.documents || []).forEach((doc) => {
        if (doc.extracted_data) {
          const parsedData =
            typeof doc.extracted_data === "string"
              ? JSON.parse(doc.extracted_data)
              : doc.extracted_data;

          organized[doc.document_type] = {
            ...parsedData,
            documentId: doc.id,
            documentNumber: doc.document_number,
            issueDate: doc.issue_date,
            expiryDate: doc.expiry_date,
          };
        }
      });

      setExtractedData(organized);
    } catch (error) {
      console.error("Error loading documents:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Retorna dados pessoais básicos do primeiro documento encontrado
   */
  const getPersonalData = () => {
    // Priorizar BI, depois passaporte
    const biData = extractedData.bi;
    const passportData = extractedData.passport;

    if (biData) {
      return {
        fullName: biData.nome,
        nuit: biData.nuit || biData.bi,
        dateOfBirth: biData.dataNascimento,
        address: biData.residencia,
        idNumber: biData.bi,
        nationality: "Moçambicana",
      };
    }

    if (passportData) {
      return {
        fullName: passportData.nome,
        dateOfBirth: passportData.dataNascimento,
        idNumber: passportData.numeroPassaporte,
        nationality: passportData.nacionalidade,
      };
    }

    return {};
  };

  /**
   * Retorna dados específicos para seguros auto
   */
  const getAutoInsuranceData = () => {
    const livreteData = extractedData.livrete;
    const cartaData = extractedData.carta || extractedData.drivers_license;

    return {
      vehicle: livreteData
        ? {
            marca: livreteData.marca,
            modelo: livreteData.modelo,
            ano: livreteData.ano,
            matricula: livreteData.matricula,
            chassi: livreteData.chassi,
            motor: livreteData.motor,
            cor: livreteData.cor,
            proprietario: livreteData.proprietario,
            nuit: livreteData.nuit,
          }
        : null,
      driver: cartaData
        ? {
            nome: cartaData.nome,
            numeroCarteira: cartaData.numeroCarteira,
            categorias: cartaData.categorias,
            dataValidade: cartaData.dataValidade,
          }
        : null,
    };
  };

  /**
   * Retorna dados específicos para seguros de habitação
   */
  const getHousingInsuranceData = () => {
    const escrituraData =
      extractedData.escritura || extractedData.property_title;
    const cipData = extractedData.cip;

    return {
      property: escrituraData
        ? {
            proprietario: escrituraData.proprietario,
            endereco: escrituraData.endereco,
            area: escrituraData.area,
            tipologia: escrituraData.tipologia,
            valorAquisicao: escrituraData.valorAquisicao,
          }
        : cipData
          ? {
              numeroMatriz: cipData.numeroMatriz,
              endereco: cipData.endereco,
              area: cipData.area,
              valorPatrimonial: cipData.valorPatrimonial,
            }
          : null,
    };
  };

  /**
   * Retorna dados específicos para seguros de viagem
   */
  const getTravelInsuranceData = () => {
    const passportData = extractedData.passport || extractedData.passaporte;

    return {
      passport: passportData
        ? {
            nome: passportData.nome,
            numeroPassaporte: passportData.numeroPassaporte,
            nacionalidade: passportData.nacionalidade,
            dataValidade: passportData.dataValidade,
          }
        : null,
    };
  };

  /**
   * Retorna dados específicos para seguros empresariais
   */
  const getBusinessInsuranceData = () => {
    const alvaraData = extractedData.alvara || extractedData.work_permit;

    return {
      business: alvaraData
        ? {
            nomeEmpresa: alvaraData.nomeEmpresa,
            nuit: alvaraData.nuit,
            endereco: alvaraData.endereco,
            atividade: alvaraData.atividade,
          }
        : null,
    };
  };

  /**
   * Verifica se os documentos necessários estão disponíveis
   * @param {string} insuranceType - Tipo de seguro (auto, vida, habitacao, viagem, empresarial)
   * @returns {Object} { hasRequired: boolean, missing: string[] }
   */
  const checkRequiredDocuments = (insuranceType) => {
    const requirements = {
      auto: ["livrete", "carta"],
      vida: ["bi"],
      habitacao: ["escritura", "cip"],
      viagem: ["passport", "passaporte"],
      empresarial: ["alvara"],
    };

    const required = requirements[insuranceType] || [];
    const missing = [];

    required.forEach((docType) => {
      // Verificar se existe pelo menos um dos documentos alternativos
      if (!extractedData[docType]) {
        // Para alguns casos, verificar nomes alternativos
        const alternatives = {
          carta: "drivers_license",
          passaporte: "passport",
          escritura: "property_title",
        };

        if (!extractedData[alternatives[docType]]) {
          missing.push(docType);
        }
      }
    });

    return {
      hasRequired: missing.length === 0,
      missing,
      available: Object.keys(extractedData),
    };
  };

  /**
   * Calcula a idade baseado na data de nascimento extraída
   */
  const getAge = () => {
    const personalData = getPersonalData();
    if (!personalData.dateOfBirth) return null;

    // Formato esperado: DD/MM/AAAA
    const parts = personalData.dateOfBirth.split("/");
    if (parts.length !== 3) return null;

    const birthDate = new Date(parts[2], parts[1] - 1, parts[0]);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return {
    loading,
    documents,
    extractedData,
    getPersonalData,
    getAutoInsuranceData,
    getHousingInsuranceData,
    getTravelInsuranceData,
    getBusinessInsuranceData,
    checkRequiredDocuments,
    getAge,
    hasDocuments: documents.length > 0,
    reload: loadUserDocuments,
  };
}



