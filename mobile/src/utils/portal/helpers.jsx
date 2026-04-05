import { Linking } from "react-native";
import { CheckCircle2, Eye, XCircle, Clock } from "lucide-react-native";

export const handleDownload = async (url, title, showToast) => {
  try {
    showToast("info", "Iniciando download...");
    await Linking.openURL(url);
    setTimeout(() => {
      showToast("success", "PDF aberto com sucesso!");
    }, 1000);
  } catch (error) {
    console.error("Error opening PDF:", error);
    showToast("error", "Erro ao abrir PDF");
  }
};

export const getClaimStatusIcon = (status) => {
  switch (status) {
    case "Aprovado":
      return <CheckCircle2 size={24} color="#10B981" />;
    case "Em análise":
      return <Eye size={24} color="#F59E0B" />;
    case "Rejeitado":
      return <XCircle size={24} color="#EF4444" />;
    case "Pendente":
    default:
      return <Clock size={24} color="#64748B" />;
  }
};



