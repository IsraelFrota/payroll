import { CompanyGroup } from './groupCompany';
import { getLatestPayroll } from './payrolls';

export function getGroupTotal(group: CompanyGroup) {
  const companies = [
    group.matriz,
    ...group.filiais,
  ];

  return companies.reduce((total, company) => {
    const payroll = getLatestPayroll(company);

    if (!payroll) return total;

    const sum = payroll.summary.reduce(
      (acc, item) => acc + item.value,
      0
    );

    return total + sum;
  }, 0);
}