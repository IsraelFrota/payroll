import {
	CompanyPayrollQueryRepository,
} from '../repositories/company-payroll.query.repository';
import { NotFoundError } from './error.service';

import { CompanyPayrollDTO } from '../types';

export class CompanyPayrollService {
	constructor (
		private repository: CompanyPayrollQueryRepository
	) {}

	async find(): Promise<CompanyPayrollDTO[]> {
		return this.repository.findMatricesAndFiliaisWithPayrolls();
	}

	async findByUserId(id: string) {
		if (!id) {
			throw new NotFoundError('Invalid id');
		}
		return this.repository.findMatricesAndFiliaisWithPayrollsById(id);
	}
}