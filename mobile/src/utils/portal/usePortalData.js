import { useState, useEffect } from "react";
import { useUser } from "@/utils/auth/useUser";

// Helper function to limit and duplicate items per category
const limitAndDuplicateByCategory = (
  items,
  getCategory,
  maxPerCategory = 2,
) => {
  const categorized = {};

  // Group items by category
  items.forEach((item) => {
    const category = getCategory(item);
    if (!categorized[category]) {
      categorized[category] = [];
    }
    if (categorized[category].length < maxPerCategory) {
      categorized[category].push(item);
    }
  });

  // Flatten and duplicate if only 1 item in category
  const result = [];
  Object.values(categorized).forEach((categoryItems) => {
    if (categoryItems.length === 1) {
      result.push(categoryItems[0]);
      result.push({ ...categoryItems[0], id: categoryItems[0].id + "_dup" });
    } else {
      result.push(...categoryItems);
    }
  });

  return result;
};

export function usePortalData() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [policyFilter, setPolicyFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [claimFilter, setClaimFilter] = useState("all");
  const [documentFilter, setDocumentFilter] = useState("all");

  const [policies, setPolicies] = useState([]);
  const [payments, setPayments] = useState([]);
  const [claims, setClaims] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, [user?.id]);

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchPolicies(),
      fetchPayments(),
      fetchClaims(),
      fetchQuotes(),
      fetchDocuments(),
    ]);
    setLoading(false);
  };

  const fetchPolicies = async () => {
    // Comentado para permitir visualização sem login
    // if (!user?.id) return;

    try {
      // Buscar todas as apólices se não houver userId
      const url = user?.id
        ? `/api/policies?userId=${user.id}`
        : "/api/policies";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch policies");

      const data = await response.json();
      const mapped = data.policies.map((policy) => ({
        id: policy.id,
        policy: policy.policy_number,
        type: policy.insurance_type_name || "N/A",
        status:
          policy.status === "active"
            ? "Ativa"
            : policy.status === "expired"
              ? "Expirada"
              : "Pendente",
        value: `${parseFloat(policy.insured_value || 0).toLocaleString(
          "pt-MZ",
          {
            style: "currency",
            currency: "MZN",
          },
        )}`,
        premium: `${parseFloat(policy.premium_value || 0).toLocaleString(
          "pt-MZ",
          {
            style: "currency",
            currency: "MZN",
          },
        )}`,
        startDate: new Date(policy.start_date).toLocaleDateString("pt-PT"),
        expiry: new Date(policy.end_date).toLocaleDateString("pt-PT"),
        pdfUrl: policy.certificate_url || "",
        certificate_url: policy.certificate_url || null,
        rawStatus: policy.status,
        is_external: policy.is_external || false,
        external_insurer_name: policy.external_insurer_name || null,
        payment_frequency: policy.payment_frequency || "mensal",
      }));

      // Limitar a 2 por categoria de status e duplicar se houver apenas 1
      const limited = limitAndDuplicateByCategory(
        mapped,
        (p) => p.rawStatus,
        2,
      );
      setPolicies(limited);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  const fetchPayments = async () => {
    // Comentado para permitir visualização sem login
    // if (!user?.id) return;

    try {
      // Buscar todos os pagamentos se não houver userId
      const url = user?.id
        ? `/api/payments?userId=${user.id}`
        : "/api/payments";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch payments");

      const data = await response.json();
      const mapped = data.payments.map((payment) => ({
        id: payment.id,
        date: new Date(
          payment.payment_date || payment.created_at,
        ).toLocaleDateString("pt-PT"),
        amount: `${parseFloat(payment.amount || 0).toLocaleString("pt-MZ", {
          style: "currency",
          currency: "MZN",
        })}`,
        method: payment.payment_method || "N/A",
        reference: payment.payment_reference || "N/A",
        status:
          payment.status === "completed"
            ? "Pago"
            : payment.status === "pending"
              ? "Pendente"
              : "Falhado",
        rawStatus: payment.status,
        rawMethod: payment.payment_method,
      }));

      // Limitar a 2 por método de pagamento e duplicar se houver apenas 1
      const limited = limitAndDuplicateByCategory(
        mapped,
        (p) => p.rawMethod,
        2,
      );
      setPayments(limited);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const fetchClaims = async () => {
    // Comentado para permitir visualização sem login
    // if (!user?.id) return;

    try {
      // Buscar todos os sinistros se não houver userId
      const url = user?.id ? `/api/claims?userId=${user.id}` : "/api/claims";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch claims");

      const data = await response.json();
      const mapped = data.claims.map((claim) => ({
        id: claim.id,
        claimNumber: claim.claim_number,
        type: claim.insurance_type || "N/A",
        date: new Date(claim.incident_date).toLocaleDateString("pt-PT"),
        amount: `${parseFloat(claim.estimated_amount || 0).toLocaleString(
          "pt-MZ",
          {
            style: "currency",
            currency: "MZN",
          },
        )}`,
        status:
          claim.status === "pending"
            ? "Pendente"
            : claim.status === "approved"
              ? "Aprovado"
              : claim.status === "rejected"
                ? "Rejeitado"
                : "Em análise",
        rawStatus: claim.status,
        description: claim.description || "Sem descrição",
        approvedAmount: claim.approved_amount
          ? `${parseFloat(claim.approved_amount).toLocaleString("pt-MZ", {
              style: "currency",
              currency: "MZN",
            })}`
          : null,
      }));

      // Limitar a 2 por status e duplicar se houver apenas 1
      const limited = limitAndDuplicateByCategory(
        mapped,
        (c) => c.rawStatus,
        2,
      );
      setClaims(limited);
    } catch (error) {
      console.error("Error fetching claims:", error);
    }
  };

  const fetchQuotes = async () => {
    // Comentado para permitir visualização sem login
    // if (!user?.id) return;

    try {
      // Buscar todas as cotações se não houver userId
      const url = user?.id ? `/api/quotes?userId=${user.id}` : "/api/quotes";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch quotes");

      const data = await response.json();
      const allQuotes = data.quotes || [];

      // Enriquecer dados das cotações
      const enriched = allQuotes.map((quote) => ({
        ...quote,
        formattedDate: new Date(quote.created_at).toLocaleDateString("pt-PT"),
        statusLabel:
          quote.status === "pending"
            ? "Pendente"
            : quote.status === "processing"
              ? "Em processamento"
              : quote.status === "approved"
                ? "Aprovada"
                : quote.status === "rejected"
                  ? "Rejeitada"
                  : "Completa",
      }));

      // Limitar a 2 por status e duplicar se houver apenas 1
      const limited = limitAndDuplicateByCategory(enriched, (q) => q.status, 2);
      setQuotes(limited);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const url = user?.id
        ? `/api/documents?userId=${user.id}`
        : "/api/documents";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch documents");

      const data = await response.json();
      setDocuments(data.documents || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const onDeleteDocument = async (documentId, showToast) => {
    try {
      const response = await fetch(`/api/documents?id=${documentId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete document");

      setDocuments(documents.filter((doc) => doc.id !== documentId));
      showToast("success", "Documento removido com sucesso!");
    } catch (error) {
      console.error("Error deleting document:", error);
      showToast("error", "Erro ao remover documento");
    }
  };

  const filteredPolicies = policies.filter((policy) => {
    if (policyFilter === "all") return true;
    if (policyFilter === "active") return policy.status === "Ativa";
    if (policyFilter === "expired") return policy.status === "Expirada";
    return true;
  });

  const filteredPayments = payments.filter((payment) => {
    if (paymentFilter === "all") return true;
    if (paymentFilter === "mpesa") return payment.rawMethod === "mpesa";
    if (paymentFilter === "card") return payment.rawMethod === "card";
    if (paymentFilter === "emola") return payment.rawMethod === "emola";
    return true;
  });

  const filteredClaims = claims.filter((claim) => {
    if (claimFilter === "all") return true;
    if (claimFilter === "pending") return claim.status === "Pendente";
    if (claimFilter === "analysis") return claim.status === "Em análise";
    if (claimFilter === "approved") return claim.status === "Aprovado";
    if (claimFilter === "rejected") return claim.status === "Rejeitado";
    return true;
  });

  const filteredDocuments = documents.filter((doc) => {
    if (documentFilter === "all") return true;
    if (documentFilter === "expiring") {
      if (!doc.expiry_date) return false;
      const daysUntilExpiry = Math.ceil(
        (new Date(doc.expiry_date) - new Date()) / (1000 * 60 * 60 * 24),
      );
      return daysUntilExpiry >= 0 && daysUntilExpiry <= 60;
    }
    return doc.document_type === documentFilter;
  });

  const onRefresh = async (showToast) => {
    setRefreshing(true);
    await fetchAllData();
    setRefreshing(false);
    showToast("success", "Dados atualizados com sucesso!");
  };

  const activePolicies = policies.filter((p) => p.rawStatus === "active");
  const submittedClaims = claims.filter((c) => c.rawStatus !== "rejected");
  const pendingQuotes = quotes.filter((q) => q.status === "pending");

  return {
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
  };
}



