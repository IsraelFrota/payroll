'use server';

import { getSession } from '../_lib/auth';
import { CompanyPayrollDTO } from '@/features/payroll/types';
import { getCompanyPayrollService } from '@/database/service-factory';

export async function getCompaniesWithPayrolls(): Promise<{
  data: CompanyPayrollDTO[];
  error?: string;
}> {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return { data: [], error: 'Unauthorized' };
    }

    const service = await getCompanyPayrollService();
    const result: CompanyPayrollDTO[] = await service.findByUserId(session.userId);

    const serializedData = JSON.parse(JSON.stringify(result));

    return {
      data: serializedData
    };

  } catch (error) {
    return { 
      data: [], 
      error: 'Failed to load data. Please try again later.' 
    };
  }
}