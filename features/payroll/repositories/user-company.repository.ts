import {
	Model,
	Types,
	Connection,
} from 'mongoose';

import {
	IUserCompany,
	getUserCompanyModel,
} from '../models/user-company.model';
import { CreateUserCompanyDTO } from '../schemas/user-company.schema';

export type UserCompanyDocument = 
	IUserCompany & {
		_id: Types.ObjectId;
		createdAt: Date;
		updatedAt: Date;
	};

export class UserCompanyRepository {
	private userCompanyModel: Model<IUserCompany>;

	constructor (connection: Connection) {
		this.userCompanyModel = getUserCompanyModel(connection);
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

	async linkUserToCompany(data: CreateUserCompanyDTO) {
		const document = await this.userCompanyModel.create({
			userId: this.toObjectId(data.userId),
			companyId: this.toObjectId(data.companyId),
			role: data.role
		});
		return document.toObject<UserCompanyDocument>();
	}
}