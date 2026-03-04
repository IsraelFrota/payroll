import { CompanyPayrollDTO } from '@/features/payroll/types';

export function getLatestPayroll(
  company: CompanyPayrollDTO
) {
  if (!company.payrolls?.length) return null;

  return [...company.payrolls].sort(
    (a, b) =>
      new Date(b.sentAt).getTime() -
      new Date(a.sentAt).getTime()
  )[0];
}