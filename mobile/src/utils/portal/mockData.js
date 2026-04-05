export const activePolicies = [
  {
    id: 1,
    type: "Seguro Automóvel",
    policy: "AUTO-2024-001",
    value: "15.000 MZN",
    status: "Ativa",
    expiry: "15/12/2024",
    pdfUrl: "https://example.com/policy1.pdf",
  },
  {
    id: 2,
    type: "Seguro Habitação",
    policy: "HAB-2024-002",
    value: "25.000 MZN",
    status: "Ativa",
    expiry: "20/01/2025",
    pdfUrl: "https://example.com/policy2.pdf",
  },
];

export const recentPayments = [
  {
    id: 1,
    type: "Seguro Automóvel",
    policy: "AUTO-2024-001",
    amount: "1.250 MZN",
    date: "01/03/2026",
    method: "M-Pesa",
    receiptUrl: "https://example.com/receipt1.pdf",
  },
  {
    id: 2,
    type: "Seguro Habitação",
    policy: "HAB-2024-002",
    amount: "2.100 MZN",
    date: "28/02/2026",
    method: "Cartão",
    receiptUrl: "https://example.com/receipt2.pdf",
  },
  {
    id: 3,
    type: "Seguro de Vida",
    policy: "VIDA-2023-005",
    amount: "800 MZN",
    date: "15/02/2026",
    method: "E-Mola",
    receiptUrl: "https://example.com/receipt3.pdf",
  },
];

export const pendingQuotes = [
  { id: 1, type: "Seguro de Vida", date: "04/03/2026", status: "Em análise" },
  {
    id: 2,
    type: "Seguro Viagem",
    date: "03/03/2026",
    status: "Aguardando resposta",
  },
];

export const submittedClaims = [
  {
    id: 1,
    claimNumber: "SIN-2026-1234",
    policyType: "Seguro Automóvel",
    policyNumber: "AUTO-2024-001",
    date: "28/02/2026",
    status: "Em análise",
    statusColor: "#F59E0B",
    statusBg: "#FEF3C7",
    description: "Colisão lateral no estacionamento",
    estimatedAmount: "8.500 MZN",
  },
  {
    id: 2,
    claimNumber: "SIN-2026-0987",
    policyType: "Seguro Habitação",
    policyNumber: "HAB-2024-002",
    date: "15/02/2026",
    status: "Aprovado",
    statusColor: "#10B981",
    statusBg: "#DCFCE7",
    description: "Danos causados por infiltração",
    estimatedAmount: "12.000 MZN",
    approvedAmount: "10.500 MZN",
  },
  {
    id: 3,
    claimNumber: "SIN-2026-0654",
    policyType: "Seguro Automóvel",
    policyNumber: "AUTO-2024-001",
    date: "01/02/2026",
    status: "Pendente",
    statusColor: "#64748B",
    statusBg: "#F1F5F9",
    description: "Quebra de vidro frontal",
    estimatedAmount: "3.200 MZN",
  },
  {
    id: 4,
    claimNumber: "SIN-2025-9876",
    policyType: "Seguro de Vida",
    policyNumber: "VIDA-2023-005",
    date: "20/01/2026",
    status: "Rejeitado",
    statusColor: "#EF4444",
    statusBg: "#FEE2E2",
    description: "Documentação incompleta",
    estimatedAmount: "5.000 MZN",
    rejectionReason: "Documentos não foram apresentados no prazo",
  },
];



