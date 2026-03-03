import {
	Model,
	Types,
	Connection,
} from 'mongoose';
import {
	IPayroll,
	getPayrollModel,
} from '../models/payroll.model';
import {
	type CreatePayrollDTO,
	type UpdatePayrollDTO,
} from '../schemas/payroll.schema';

export type PayrollDocument = 
	IPayroll & {
		_id: Types.ObjectId;
		createdAt: Date;
		updatedAt: Date;
	};

export class PayrollRepository {
	private payrollModel: Model<IPayroll>;

	constructor(connection: Connection) {
		this.payrollModel = getPayrollModel(connection);
	}

	private toObjectId(id: string | Types.ObjectId) {
		if (id instanceof Types.ObjectId) {
			return id;
		}

		if (!Types.ObjectId.isValid(id)) {
			throw new Error('Invalid Object Id');
		}

		return new Types.ObjectId(id);
	}

	async create(data: CreatePayrollDTO): Promise<PayrollDocument> {
		const document = await this.payrollModel.create(data);
		return document.toObject<PayrollDocument>();
	}

	async findById(id: string | Types.ObjectId): Promise<PayrollDocument | null> {
		return this.payrollModel
			.findById(this.toObjectId(id))
			.lean<PayrollDocument>()
			.exec();
	}

	async findByCompany(
		companyId: string | Types.ObjectId
	): Promise<PayrollDocument[]> {
		return this.payrollModel
			.find({
				companyId: this.toObjectId(companyId),
			})
			.sort({ competence: -1 })
			.lean<PayrollDocument[]>()
			.exec();
	}

	async findByCompanyAndCompetence(
		companyId: string | Types.ObjectId,
		competence: string
	): Promise<PayrollDocument | null> {
		return this.payrollModel
			.findOne({
				companyId: this.toObjectId(companyId),
				competence,
			})
			.lean<PayrollDocument>()
			.exec();
	}

	async exists(
		companyId: string | Types.ObjectId,
		competence: string
	): Promise<boolean> {
		const result = await this.payrollModel.exists({
			companyId: this.toObjectId(companyId),
			competence,
		});

		return !!result;
	}

	async update(
		id: string | Types.ObjectId,
		data: UpdatePayrollDTO
	): Promise<PayrollDocument | null> {
		return this.payrollModel
			.findByIdAndUpdate(
				this.toObjectId(id),
				{ $set: data },
				{
					new: true,
					runValidators: true,
				}
			)
			.lean<PayrollDocument>()
			.exec();
	}

	async delete(id: string | Types.ObjectId): Promise<boolean> {
		const result = await this.payrollModel
			.findByIdAndDelete(this.toObjectId(id))
			.exec();

		return !!result;
	}
}