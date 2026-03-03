import {
	Types,
	Schema,
	Connection,
} from 'mongoose';
import { getModel } from '@/database/model-registry';

import { MODEL_NAME } from '@/shared/constants/user';

export interface IUser {
	username: string;
	keyWord: string;
};

const userSchema = new Schema<IUser>(
	{
		username: {
			type: String,
			required: true,
			trim: true,
		},
		keyWord: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

userSchema.index(
	{ username: 1 },
	{ unique: true }
);

export function getUserModel(connection: Connection) {
	return getModel(connection, MODEL_NAME, userSchema);
}
