import mongoose, { Connection } from 'mongoose';

type MongooseCache = {
	connection: Connection | null;
	promise: Promise<Connection> | null;
};

type CacheKey = string;

type CreateConnectionProps = {
	cacheKey: CacheKey;
	uri: string | undefined;
};

declare global {
	var mongooseConnections:
		| Record<string, MongooseCache>
		| undefined;
};

if (!global.mongooseConnections) {
	global.mongooseConnections = {};
}

const { STATES } = mongoose;
const globalCache = global.mongooseConnections;

async function createConnection({ cacheKey, uri }: CreateConnectionProps): Promise<Connection> {
	if (!uri) {
		throw new Error(`${cacheKey} not defined in the environment variables`);
	}
	if (!globalCache[cacheKey]) {
		globalCache[cacheKey] = {
			connection: null,
			promise: null,
		};
	}
	const cache = globalCache[cacheKey];
	const connection = cache.connection;
	if (connection?.readyState === STATES.connected) {
		return connection;
	}

	if (connection) {
		await connection.close().catch(() => {});
		cache.connection = null;
		cache.promise = null;
	}
	if (!cache.promise) {
		cache.promise = mongoose
			.createConnection(uri, { bufferCommands: false })
			.asPromise()
			.catch(err => {
				cache.promise = null;
				throw err;
			});
	}
	cache.connection = await cache.promise;
	return cache.connection;
}

export function connectToDatabase(cacheKey: CacheKey, uri: string | undefined) {
	return createConnection({ cacheKey, uri });
}