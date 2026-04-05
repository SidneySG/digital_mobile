import {
  Car,
  Heart,
  Home,
  Plane,
  Briefcase,
  Shield,
} from "lucide-react-native";

export const INSURANCE_TYPES = [
  {
    id: "auto",
    title: "Seguro Automóvel",
    icon: Car,
    color: "#3B82F6",
    documents: [
      {
        id: "livrete",
        label: "Livrete/Título de Propriedade",
      },
      {
        id: "carta",
        label: "Carta de Condução",
      },
    ],
    fields: [
      {
        id: "coverage_type",
        label: "Tipo de Cobertura",
        type: "select",
        required: true,
        options: [
          { value: "terceiros", label: "Responsabilidade Civil (Terceiros)" },
          { value: "todos_riscos", label: "Todos os Riscos (Compreensivo)" },
        ],
      },
      {
        id: "vehicle_value",
        label: "Valor do Veículo",
        type: "currency",
        required: true,
        placeholder: "Ex: 1.500.000,00 MZN",
        showWhen: (formData) => formData.coverage_type === "todos_riscos",
      },
      {
        id: "vehicle_year",
        label: "Ano do Veículo",
        type: "number",
        required: true,
        placeholder: "Ex: 2020",
      },
    ],
  },
  {
    id: "vida",
    title: "Seguro de Vida",
    icon: Heart,
    color: "#EF4444",
    documents: [
      {
        id: "bi",
        label: "Bilhete de Identidade",
      },
    ],
    fields: [
      {
        id: "coverage_amount",
        label: "Valor de Cobertura Desejado",
        type: "currency",
        required: true,
        placeholder: "Ex: 5.000.000,00 MZN",
      },
      {
        id: "beneficiaries",
        label: "Número de Beneficiários",
        type: "number",
        required: false,
        placeholder: "Ex: 2",
      },
    ],
  },
  {
    id: "habitacao",
    title: "Seguro Habitação",
    icon: Home,
    color: "#10B981",
    documents: [
      {
        id: "escritura",
        label: "Escritura/Título de Propriedade",
      },
      {
        id: "cip",
        label: "CIP (Certificado de Inscrição Predial)",
      },
    ],
    fields: [
      {
        id: "property_value",
        label: "Valor do Imóvel",
        type: "currency",
        required: true,
        placeholder: "Ex: 8.000.000,00 MZN",
      },
      {
        id: "property_type",
        label: "Tipo de Imóvel",
        type: "select",
        required: true,
        options: [
          { value: "apartamento", label: "Apartamento" },
          { value: "moradia", label: "Moradia/Casa" },
          { value: "comercial", label: "Propriedade Comercial" },
        ],
      },
    ],
  },
  {
    id: "viagem",
    title: "Seguro Viagem",
    icon: Plane,
    color: "#8B5CF6",
    documents: [
      {
        id: "passaporte",
        label: "Passaporte",
      },
    ],
    fields: [
      {
        id: "destination",
        label: "Destino da Viagem",
        type: "text",
        required: true,
        placeholder: "Ex: Europa, África do Sul",
      },
      {
        id: "travel_dates",
        label: "Período da Viagem",
        type: "text",
        required: true,
        placeholder: "Ex: 15/05/2026 - 30/05/2026",
      },
      {
        id: "travelers",
        label: "Número de Viajantes",
        type: "number",
        required: true,
        placeholder: "Ex: 2",
      },
    ],
  },
  {
    id: "empresarial",
    title: "Seguro Empresarial",
    icon: Briefcase,
    color: "#F59E0B",
    documents: [
      {
        id: "alvara",
        label: "Alvará Comercial",
      },
    ],
    fields: [
      {
        id: "business_type",
        label: "Tipo de Negócio",
        type: "text",
        required: true,
        placeholder: "Ex: Restaurante, Loja, Escritório",
      },
      {
        id: "insured_value",
        label: "Valor a Segurar",
        type: "currency",
        required: true,
        placeholder: "Ex: 10.000.000,00 MZN",
      },
      {
        id: "employees",
        label: "Número de Funcionários",
        type: "number",
        required: false,
        placeholder: "Ex: 15",
      },
    ],
  },
  {
    id: "acidentes",
    title: "Acidentes Pessoais",
    icon: Shield,
    color: "#EC4899",
    documents: [
      {
        id: "bi",
        label: "Bilhete de Identidade",
      },
    ],
    fields: [
      {
        id: "coverage_amount",
        label: "Valor de Cobertura",
        type: "currency",
        required: true,
        placeholder: "Ex: 2.000.000,00 MZN",
      },
      {
        id: "occupation",
        label: "Ocupação Profissional",
        type: "text",
        required: true,
        placeholder: "Ex: Motorista, Engenheiro, Professor",
      },
    ],
  },
];

export const INSURERS = [
  { id: "hollard", name: "Hollard Moçambique" },
  { id: "sanlam", name: "Sanlam" },
  { id: "aris", name: "Aris Seguros" },
  { id: "indico", name: "Indico Seguros" },
  { id: "britam", name: "Britam" },
];

export const QUOTE_TYPES = {
  BEST_PRICE: "best-price",
  PREFERRED_INSURER: "preferred-insurer",
};



