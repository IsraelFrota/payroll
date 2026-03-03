import {
	Model,
	Types,
	Connection,
} from 'mongoose';
import {
	ICompany,
	getCompanyModel,
} from '../models/company.model';

import {
	type CreateCompanyDTO,
	type UpdateCompanyDTO,
} from '../schemas/company.schema';

export type CompanyDocument = 
	ICompany & {
		_id: Types.ObjectId;
		createdAt: Date;
		updatedAt: Date;
	};

export class CompanyRepository {
	private companyModel: Model<ICompany>;
	
	constructor(connection: Connection) {
		this.companyModel = getCompanyModel(connection);
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

	async create(data: CreateCompanyDTO): Promise<CompanyDocument> {
		const document = await this.companyModel.create(data);
		return document.toObject<CompanyDocument>();
	}

	async findById(id: string | Types.ObjectId): Promise<CompanyDocument | null> {
		return this.companyModel
			.findById(this.toObjectId(id))
			.lean<CompanyDocument>()
			.exec();
	}

	async findByCnpj(cnpj: string): Promise<CompanyDocument | null> {
		return this.companyModel
			.findOne({ cnpj })
			.lean<CompanyDocument>()
			.exec();
	}

	async findChildren(parentId: string | Types.ObjectId): Promise<CompanyDocument[]> {
		return this.companyModel
			.find({ parentId: this.toObjectId(parentId) })
			.lean<CompanyDocument[]>()
			.exec();
	}

	async update(
		id: string | Types.ObjectId,
		data: UpdateCompanyDTO
	): Promise<CompanyDocument | null> {
		return this.companyModel
			.findByIdAndUpdate(
				this.toObjectId(id),
				{ $set: data },
				{ 
					new: true,
					runValidators: true,
				}
			)
			.lean<CompanyDocument>()
			.exec();
	}

	async delete(id: string | Types.ObjectId): Promise<boolean> {
		const result = await this.companyModel
			.findByIdAndDelete(this.toObjectId(id))
			.exec();

		return !!result;
	}
}