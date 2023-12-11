import { Db, MongoClient } from 'mongodb';

const MONGO_DB_CONNSTRING = process.env.MONGO_DB_CONNSTRING;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

if (!MONGO_DB_CONNSTRING) {
  throw new Error(
    'Please define the MONGO_DB_CONNSTRING environment variable inside .env.local',
  );
}

if (!MONGO_DB_NAME) {
  throw new Error(
    'Please define the MONGO_DB_NAME environment variable inside .env.local',
  );
}

let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (!MONGO_DB_CONNSTRING) {
    console.log(MONGO_DB_CONNSTRING);
    throw new Error(
      'Unable to connect to MongoDb no connection string was provided',
    );
  }

  if (cachedDb) {
    return cachedDb;
  }

  // Connect to our MongoDB database hosted on MongoDB Atlas
  const client = new MongoClient(MONGO_DB_CONNSTRING);

  // Specify which database we want to use
  const db = await client.db(process.env.MONGO_DB_NAME);

  cachedDb = db;
  return db;
}
