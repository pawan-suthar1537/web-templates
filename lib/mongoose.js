import mongoose from 'mongoose';

const connectionOptions = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 10000,
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

  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose.connection);
  }

  if (!global.mongooseConnectionPromise) {
    global.mongooseConnectionPromise = mongoose.connect(uri, connectionOptions)
      .catch((error) => {
        // Do not keep a rejected promise cached after a transient deployment or
        // network failure. The next request should be allowed to retry.
        global.mongooseConnectionPromise = null;
        throw error;
      });
  }

  return global.mongooseConnectionPromise.then(() => mongoose.connection);
}
