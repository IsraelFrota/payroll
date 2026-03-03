import {
	Types,
	Schema,
	Connection,
} from 'mongoose';
import { getModel } from '@/database/model-registry';

import {
	MODEL_NAME,
	COMPANY_TYPES,
} from '@/shared/constants/company';
import { CompanyType } from '../types';

export interface ICompany {
	code: string;
	name: string;
	cnpj: string;
	companyType: CompanyType;
	parentId: Types.ObjectId | null;
	createdAt: Date;
	updatedAt: Date;
};

const companySchema = new Schema<ICompany>(
	{
		code: {
			type: String,
			required: true,
			trim: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		cnpj: {
			type: String,
			required: true,
			trim: true,
			match: /^\d{14}$/,
		},
		companyType: {
			type: String,
			enum: COMPANY_TYPES,
			required: true,
		},
		parentId: {
			type: Schema.Types.ObjectId,
			ref: MODEL_NAME,
			default: null,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

companySchema.index(
  { cnpj: 1 },
  { unique: true }
);

companySchema.index(
  { code: 1 },
  { unique: true }
);

companySchema.index({ parentId: 1 });

export function getCompanyModel(connection: Connection) {
	return getModel(connection, MODEL_NAME, companySchema);
}
