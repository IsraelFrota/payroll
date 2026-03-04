import { CompanyPayrollDTO } from '@/features/payroll/types';

export type CompanyGroup = {
  matriz: CompanyPayrollDTO;
  filiais: CompanyPayrollDTO[];
};

export function groupCompanies(
  companies: CompanyPayrollDTO[]
): CompanyGroup[] {

  const matrizes = companies.filter(
    c => c.companyType === 'matriz'
  );

  return matrizes.map(matriz => ({
    matriz,
    filiais: companies.filter(
      c => c.parentId === matriz._id
    ),
  }));
}