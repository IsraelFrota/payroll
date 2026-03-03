import {
	Model,
	Schema,
	Connection,
} from 'mongoose';

export function getModel<T>(
	connection: Connection,
	modelName: string,
	schema: Schema<T>
): Model<T> {
	if (connection.models[modelName]) {
		return connection.models[modelName];
	}
	return connection.model<T>(modelName, schema);
}