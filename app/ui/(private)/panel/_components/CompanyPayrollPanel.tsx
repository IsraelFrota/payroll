'use client';

import {
	useState,
	useCallback,
} from 'react';
import { CompanyCard } from './CompanyCard';
import { PayrollDialog } from './PayrollDialog';
import { CompanyPayrollDTO } from '@/features/payroll/types';

type Props = {
  companies: CompanyPayrollDTO[];
};

export function CompanyPayrollPanel({ companies }: Props) {
  const [selectedCompany, setSelectedCompany] = useState<CompanyPayrollDTO | null>(null);

  const handleOpen = useCallback((company: CompanyPayrollDTO) => {
    setSelectedCompany(company);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCompany(null);
  }, []);

  return (
    <>
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {companies.map((company) => (
          <CompanyCard
            key={company._id}
            company={company}
            onOpen={() => handleOpen(company)}
          />
        ))}
      </section>

      <PayrollDialog
        company={selectedCompany}
				isOpen={!!selectedCompany}
        onClose={handleClose}
      />
    </>
  );
}