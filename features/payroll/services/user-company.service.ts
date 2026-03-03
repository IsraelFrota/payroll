import { UserCompanyRepository } from '../repositories/user-company.repository';
import {
	userCompanySchema,
	type CreateUserCompanyDTO,
} from '../schemas/user-company.schema';

export class UserCompanyService {
	constructor(
		private repository: UserCompanyRepository
	) {}

	async linkUserToCompany(data: unknown) {
		const parsed: CreateUserCompanyDTO = userCompanySchema.parse(data);

		try {
			return await this.repository.linkUserToCompany(parsed);
		} catch (error) {
			throw error;
		}
	}
}