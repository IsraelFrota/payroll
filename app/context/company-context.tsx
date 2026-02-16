"use client";

import { createContext, useContext, useState } from "react";
import { companies, Company } from "../../mock";

type CompanyContextType = {
  company: Company;
  setCompany: (company: Company) => void;
};

const CompanyContext = createContext<CompanyContextType | null>(null);

export const CompanyProvider = ({ children }: { children: React.ReactNode }) => {
  const [company, setCompany] = useState(companies[0]);

  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) throw new Error("useCompany must be used within CompanyProvider");
  return context;
};
