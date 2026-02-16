type SummaryColor = "orange" | "blue" | "green" | "gray";

export type Company = {
  id: string;
  name: string;
  cnpj: string;
  type: "matriz" | "filial";
  parentId?: string;
  paymentTerm?: string;
  sentIn?: string;
  data?: {
    summary: {
      title: string;
      value: number;
      color: SummaryColor;
    }[];
    details:  {
      obligation: string;
      amount: number;
      overdue: string;
      document: string;
    }[];
    indicators: {
      label: string;
      value: number | string;
    }[];
    evoluation: {
      month: string;
      amount: number;
    }[];
  }
};

export const companies: Company[] = [
  { 
    id: "1",
    name: "Empresa Exemplo LTDA",
    cnpj: "12.345.678/0001-90",
    type: "matriz",
    paymentTerm: "Janeiro/2026",
    sentIn: "2026-01-02 12:00:00:000",
    data: {
      summary: [
        { title: "Total Bruto", value: 245000, color: "orange" },
        { title: "Total de Encargos", value: 72000, color: "blue" },
        { title: "Total Líquido", value: 173000, color: "green" },
        { title: "Total das Obrigações", value: 82500, color: "gray" },
      ],
      details: [
        { obligation: "INSS", amount: 38000, overdue: "20/02/2026", document: "GPS" },
        { obligation: "FGTS", amount: 24500, overdue: "07/02/2026", document: "GRF" },
        { obligation: "IRRF", amount: 20000, overdue: "20/02/2026", document: "DARF" },
      ],
      indicators: [
        { label: "Nº de Colaboradores", value: 46 },
        { label: "Admitidos no Mês", value: 3 },
        { label: "Demitidos no Mês", value: 1 },
        { label: "Custo Médio por Colaborador", value: 5320 },
      ],
      evoluation: [
        { month: "ago", amount: 205000 },
        { month: "set", amount: 210000 },
        { month: "out", amount: 220000 },
        { month: "nov", amount: 228000 },
        { month: "dez", amount: 238000 },
        { month: "jan", amount: 245000 },
      ],
    }, 
  },

  { 
    id: "2",
    name: "Empresa Exemplo Filial SP",
    cnpj: "12.345.678/0002-70",
    type: "filial",
    parentId: "1",
    paymentTerm: "Janeiro/2026",
    sentIn: "2026-01-03 12:00:00:000",
    data: {
      summary: [
        { title: "Total Bruto", value: 145000, color: "orange" },
        { title: "Total de Encargos", value: 43000, color: "blue" },
        { title: "Total Líquido", value: 102000, color: "green" },
        { title: "Total das Obrigações", value: 48500, color: "gray" },
      ],
      details: [
        { obligation: "INSS", amount: 22000, overdue: "20/02/2026", document: "GPS" },
        { obligation: "FGTS", amount: 14500, overdue: "07/02/2026", document: "GRF" },
        { obligation: "IRRF", amount: 12000, overdue: "20/02/2026", document: "DARF" },
      ],
      indicators: [
        { label: "Nº de Colaboradores", value: 27 },
        { label: "Admitidos no Mês", value: 2 },
        { label: "Demitidos no Mês", value: 0 },
        { label: "Custo Médio por Colaborador", value: 5370 },
      ],
      evoluation: [
        { month: "ago", amount: 125000 },
        { month: "set", amount: 130000 },
        { month: "out", amount: 135000 },
        { month: "nov", amount: 140000 },
        { month: "dez", amount: 143000 },
        { month: "jan", amount: 145000 },
      ],
    },
  },

  {
    id: "3",
    name: "Empresa Exemplo Filial RJ",
    cnpj: "12.345.678/0003-50",
    type: "filial",
    parentId: "1",
    paymentTerm: "Janeiro/2026",
    sentIn: "2026-01-04 12:00:00:000",
    data: {
      summary: [
        { title: "Total Bruto", value: 100000, color: "orange" },
        { title: "Total de Encargos", value: 29000, color: "blue" },
        { title: "Total Líquido", value: 71000, color: "green" },
        { title: "Total das Obrigações", value: 34000, color: "gray" },
      ],
      details: [
        { obligation: "INSS", amount: 16000, overdue: "20/02/2026", document: "GPS" },
        { obligation: "FGTS", amount: 10000, overdue: "07/02/2026", document: "GRF" },
        { obligation: "IRRF", amount: 8000, overdue: "20/02/2026", document: "DARF" },
      ],
      indicators: [
        { label: "Nº de Colaboradores", value: 19 },
        { label: "Admitidos no Mês", value: 1 },
        { label: "Demitidos no Mês", value: 1 },
        { label: "Custo Médio por Colaborador", value: 5260 },
      ],
      evoluation: [
        { month: "ago", amount: 80000 },
        { month: "set", amount: 82000 },
        { month: "out", amount: 85000 },
        { month: "nov", amount: 88000 },
        { month: "dez", amount: 95000 },
        { month: "jan", amount: 100000 },
      ],
    },
  },
];
