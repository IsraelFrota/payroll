'use client';

import {
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react';

export type Payroll = {
  companyId: string;
  competence: string;
  paymentTermLabel: string;
  sentAt: string;
  summary: {
    title: string;
    value: number;
  }[];
  details: {
    obligation: string;
    amount: number;
    dueDate: string;
    documentType: string;
  }[];
  indicators: {
    employees: number;
    admitted: number;
    dismissed: number;
    avgCostPerEmployee: number
  };
  evolution: {
    month: string;
    amount: number;
  }[];
};

export type Company = {
  _id: string;
  name: string;
  cnpj: string;
  companyType: 'matriz' | 'filial';
  parentId?: string | null;
  payrolls?: Payroll[];
};

type CompanyContextType = {
  companies: Company[];
  company: Company | null;
  setCompany: (company: Company) => void;
  loading: boolean;
  error: string | null;
};

const CompanyContext = createContext<CompanyContextType | null>(null);

export const CompanyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchCompanies = async () => {
      try {
        const response = await fetch('/api/companies');

        if (!response.ok) {
          throw new Error('Erro ao buscar empresas');
        }

        const { data }: { data: Company[] } = await response.json();

        if (!mounted) return;

        setCompanies(data);

        const firstCompany =
          data.find((c) => c.companyType === 'matriz') ?? data[0] ?? null;

        setCompany(firstCompany);
      } catch (err: any) {
        if (mounted) {
          setError(err.message ?? 'Erro inesperado');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCompanies();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <CompanyContext.Provider
      value={{
        companies,
        company,
        setCompany,
        loading,
        error,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);

  if (!context) {
    throw new Error('useCompany must be used within CompanyProvider');
  }

  return context;
};
