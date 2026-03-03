import {
  Types,
  Schema,
	Connection,
} from 'mongoose';
import { getModel } from '@/database/model-registry';
import { MODEL_NAME } from '@/shared/constants/user-company';

export interface IUserCompany {
  userId: Types.ObjectId;
  companyId: Types.ObjectId;
  role: 'admin' | 'viewer';
  createdAt: Date;
};

const userCompanySchema = new Schema<IUserCompany>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: ['admin', 'viewer'],
      default: 'viewer',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

userCompanySchema.index(
  { userId: 1, companyId: 1 },
  { unique: true }
);

userCompanySchema.index(
  { companyId: 1, userId: 1 }
);

export function getUserCompanyModel(connection: Connection) {
	return getModel(connection, MODEL_NAME, userCompanySchema);
}