import mongoose from 'mongoose';

const connectionOptions = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 8000,
  family: 4,
  maxPoolSize: 10,
};

/**
 * Reuse both the connected client and the in-flight connection promise.
 * Vercel can invoke this module more than once in the same function instance;
 * opening a new connection for every invocation eventually exhausts MongoDB's
 * connection limit and makes otherwise healthy reads fail with a 503.
 */
export function mongooseConnect() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
  }

  if (!global.mongooseCache) {
    global.mongooseCache = { connection: null, promise: null };
  }

  if (mongoose.connection.readyState === 1) {
    global.mongooseCache.connection = mongoose.connection;
    return Promise.resolve(mongoose.connection);
  }

  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose.connect(uri, connectionOptions)
      .then(() => {
        global.mongooseCache.connection = mongoose.connection;
        return mongoose.connection;
      })
      .catch((error) => {
        // Do not keep a rejected promise cached after a transient deployment or
        // network failure. The next request should be allowed to retry.
        global.mongooseCache.promise = null;
        throw error;
      });
  }

  return global.mongooseCache.promise;
}
