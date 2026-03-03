import { COMPANY_TYPES } from '@/shared/constants/company';

export type CompanyType =	typeof COMPANY_TYPES[number];

type Payroll = {
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

export type CompanyPayrollDTO = {
	_id: string;
	name: string;
	cnpj: string;
	companyType: 'matriz' | 'filial';
	parentId?: string | null;
	payrolls?: Payroll[];
};
