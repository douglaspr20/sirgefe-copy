import { Session } from '@shopify/shopify-api';
import { connectToDatabase } from './mongodb';
import Cryptr from 'cryptr';

const cryption = new Cryptr('mzzcwhixjomx');

const storeSession = async (session: Session) => {
  const conn = await connectToDatabase();
  const collection = conn.collection('shopify_app_sessions');

  collection.findOneAndUpdate(
    { shop: session.shop },
    {
      $set: {
        id: session.id,
        shop: session.shop,
        content: cryption.encrypt(JSON.stringify(session)),
      },
    },
    { upsert: true },
  );
  return true;
};

const loadSession = async (id: string) => {
  const conn = await connectToDatabase();
  const collection = conn.collection('shopify_app_sessions');

  const session = await collection.findOne({ id });

  if (!session) {
    return null;
  }

  if (session.content.length > 0) {
    const sessionObj = JSON.parse(cryption.decrypt(session.content));
    return new Session(sessionObj);
  }
  return undefined;
};

const deleteSession = async (id: string) => {
  const conn = await connectToDatabase();
  const collection = conn.collection('shopify_app_sessions');

  await collection.deleteMany({ id });

  return true;
};

const sessionHandler = { storeSession, loadSession, deleteSession };

export default sessionHandler;
