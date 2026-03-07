require("dotenv").config();
const { MongoClient } = require("mongodb");

const sourceUri =
  process.env.MONGODB_URI_LOCAL || "mongodb://127.0.0.1:27017/jass_automotives";
const targetUri = process.env.MONGODB_URI_CLOUD || process.env.MONGODB_URI;
const sourceDbName = process.env.MONGODB_DB_LOCAL || "jass_automotives";
const targetDbName = process.env.MONGODB_DB_CLOUD || "jass_automotives";
const BATCH_SIZE = Number(process.env.MIGRATION_BATCH_SIZE || 500);

const stripIndexOptions = (index) => {
  const { key, v, ns, background, name, ...options } = index;
  return { key, name, options };
};

const copyCollection = async (sourceDb, targetDb, collectionName) => {
  const sourceCollection = sourceDb.collection(collectionName);
  const targetCollection = targetDb.collection(collectionName);

  try {
    await targetCollection.drop();
    console.log(`Dropped target collection: ${collectionName}`);
  } catch (error) {
    if (error.codeName !== "NamespaceNotFound") {
      throw error;
    }
  }

  const cursor = sourceCollection.find({});
  let batch = [];
  let copied = 0;

  while (await cursor.hasNext()) {
    batch.push(await cursor.next());
    if (batch.length >= BATCH_SIZE) {
      await targetCollection.insertMany(batch, { ordered: false });
      copied += batch.length;
      batch = [];
    }
  }

  if (batch.length) {
    await targetCollection.insertMany(batch, { ordered: false });
    copied += batch.length;
  }

  const indexes = await sourceCollection.indexes();
  for (const index of indexes) {
    if (index.name === "_id_") continue;
    const { key, name, options } = stripIndexOptions(index);
    await targetCollection.createIndex(key, { ...options, name });
  }

  console.log(`Copied ${copied} documents from ${collectionName}`);
};

const run = async () => {
  if (!targetUri) {
    throw new Error(
      "Missing target URI. Set MONGODB_URI_CLOUD or MONGODB_URI in server/.env",
    );
  }

  const sourceClient = new MongoClient(sourceUri);
  const targetClient = new MongoClient(targetUri);

  try {
    await sourceClient.connect();
    await targetClient.connect();
    console.log("Connected to source and target MongoDB");

    const sourceDb = sourceClient.db(sourceDbName);
    const targetDb = targetClient.db(targetDbName);
    const collections = await sourceDb.listCollections({}, { nameOnly: true }).toArray();

    if (!collections.length) {
      console.log("No collections found in source database.");
      return;
    }

    for (const { name } of collections) {
      await copyCollection(sourceDb, targetDb, name);
    }

    console.log("Migration completed successfully.");
  } finally {
    await Promise.all([sourceClient.close(), targetClient.close()]);
  }
};

run().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
