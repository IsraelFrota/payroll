import { compare, hash } from 'bcrypt';
import { MongoServerError } from 'mongodb';

import { UserRepository } from '../repositories/user.repository';
import {
	AlreadyExistErro,
	NotFoundError,
} from './error.service';

import {
	userSchema,
	type CreateUserDTO,
} from '../schemas/user.schema';

export class UserService {
	constructor(
		private repository: UserRepository
	) {}
	
	async authenticate(username: string, keyWord: string) {
		if (!username || !keyWord) {
			return null;
		}

		const user = await this.repository
			.findUserByUsername(username);

		if (!user) {
			return null;
		}

		const isValidKeyWord = await compare(keyWord, user.keyWord);

		return isValidKeyWord ? user : null;
	}

	async create(username: string, keyWord: string) {
		const parsed: CreateUserDTO = userSchema.parse({ username, keyWord });

		const alreadyExist = await this.repository
			.findUserByUsername(parsed.username);

		if (alreadyExist) {
			throw new AlreadyExistErro('Invalid username');
		}

		const hashKeyWord = await hash(parsed.keyWord, 10);

		try {
			return this.repository.create({
				username: parsed.username,
				keyWord: hashKeyWord
			});
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

	async findById(id: string) {
		if (!id) {
			throw new NotFoundError('Invalid id');
		}

		return this.repository.find(id);
	}
}