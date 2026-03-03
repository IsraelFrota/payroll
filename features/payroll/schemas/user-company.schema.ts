import { z } from 'zod';

const userCompanySchema = z.object({
	userId: z
		.string()
		.trim()
		.nonempty(),

	companyId: z
		.string()
		.trim()
		.nonempty(),

	role: z.enum(['admin', 'viewer']),
});

export type CreateUserCompanyDTO = z.infer<typeof userCompanySchema>;

export { userCompanySchema };