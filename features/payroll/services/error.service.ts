export class AlreadyExistErro extends Error {
	constructor(message: string) {
		super(message);
	}
}

export class NotFoundError extends Error {
	constructor(message: string) {
		super(message);
	}
}