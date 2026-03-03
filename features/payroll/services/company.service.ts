import { MongoServerError } from 'mongodb';

import { CompanyRepository } from '../repositories/company.repository';
import {
	NotFoundError,
	AlreadyExistErro,
} from './error.service';

import {
	createCompanySchema,
	updateCompanySchema,
	type CreateCompanyDTO,
	type UpdateCompanyDTO,
} from '../schemas/company.schema';

export class CompanyService {
	constructor (
		private repository: CompanyRepository
	) {}

	async create(data: unknown) {
		const parsed: CreateCompanyDTO = createCompanySchema.parse(data);

		const alreadyExist = await this.repository.findByCnpj(parsed.cnpj);

		if (alreadyExist) {
			throw new AlreadyExistErro('Company already exists for this CNPJ');
		}

		try {
			return await this.repository.create(parsed);
		} catch (error: unknown) {
			if (
				error instanceof MongoServerError &&
				error.code === 11000
			) {
				throw new AlreadyExistErro('Race condition');
			}
			throw error;
		}
	}

	async update(id: string, data: unknown) {
		const parsed: UpdateCompanyDTO = updateCompanySchema.parse(data);

		const updated = await this.repository.update(id, parsed);

		if (!updated) {
			throw new NotFoundError('Company not found');
		}

		return updated;
	}

	async delete(id: string) {
		const deleted = await this.repository.delete(id);
		if (!deleted) {
			throw new NotFoundError('Company not found');
		}
	}
}