import { MongoServerError } from 'mongodb';

import { PayrollRepository } from '../repositories/payroll.repository';
import {
	NotFoundError,
	AlreadyExistErro,
} from './error.service';

import {
	payrollSchema,
	updatePayrollSchema,
	type CreatePayrollDTO,
	type UpdatePayrollDTO,
} from '../schemas/payroll.schema';

export class PayrollService {
	constructor (
		private repository: PayrollRepository
	) {}

	async create(data: unknown) {
		const parsed: CreatePayrollDTO = payrollSchema.parse(data);

		const alreadyExist = await this.repository.exists(
			parsed.companyId,
			parsed.competence
		);

		if (alreadyExist) {
			throw new AlreadyExistErro('Payroll already exists for this company and competence');
		}

		try {
			return await this.repository.create(parsed);
		} catch (error: unknown) {
			if (
				error instanceof MongoServerError &&
				error.code === 11000
			) {
				throw new AlreadyExistErro('Payroll already exists for this company and competence');
			}
			throw error;
		}
	}

	async update(id: string, data: unknown) {
		const parsed: UpdatePayrollDTO = updatePayrollSchema.parse(data);

		if ('companyId' in parsed || 'competence' in parsed) {
			throw new Error('companyId and competence cannot be updated');
		}

		const updated = await this.repository.update(id, parsed);

		if (!updated) {
			throw new NotFoundError('Payroll not found');
		}

		return updated;
	}

	async delete(id: string) {
		const deleted = await this.repository.delete(id);

		if (!deleted) {
			throw new NotFoundError('Payroll not found');
		}
	}
}