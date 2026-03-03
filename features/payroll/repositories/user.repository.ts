import {
	Model,
	Types,
	Connection,
} from 'mongoose';
import {
	IUser,
	getUserModel,
} from '../models/user.model';
import { CreateUserDTO } from '../schemas/user.schema';

export type UserDocument = 
	IUser & {
		_id: Types.ObjectId;
		createdAt: Date;
		updatedAt: Date;
	};

export class UserRepository {
	private userModel: Model<IUser>;

	constructor(connection: Connection) {
		this.userModel = getUserModel(connection);
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

	async findUserByUsername(username: string): Promise<UserDocument | null> {
		return this.userModel
			.findOne({ username })
			.lean<UserDocument>()
			.exec();
	}

	async create(data: CreateUserDTO): Promise<UserDocument> {
		const document = await this.userModel.create(data);
		return document.toObject<UserDocument>();
	}

	async find(id: string | Types.ObjectId): Promise<UserDocument | null> {
		return this.userModel
			.findById(this.toObjectId(id))
			.lean<UserDocument>()
			.exec();
	}
}