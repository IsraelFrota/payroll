import { z } from 'zod';
import { COMPANY_TYPES } from '@/shared/constants/company';

const createCompanySchema = z.object({
	code: z
		.string()
		.trim()
		.min(1),

	name: z
		.string()
		.trim()
		.min(1)
		.toLowerCase(),

	cnpj: z
		.string()
		.trim()
		.regex(/^\d{14}$/, 'CNPJ must contain 14 digits'),

	companyType: z.enum(COMPANY_TYPES),

	parentId: z
		.string()
		.nullable(),
});

const updateCompanySchema = createCompanySchema.partial();

export type CreateCompanyDTO = z.infer<typeof createCompanySchema>;
export type UpdateCompanyDTO = z.infer<typeof updateCompanySchema>;

export {
	createCompanySchema,
	updateCompanySchema,
};