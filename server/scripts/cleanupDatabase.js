const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/jass_automotives';

async function dropUnusedCollections() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    
    const collectionsToRemove = [
      'products',
      'productorders',
      'services',
      'servicebookings',
      'carts'
    ];

    for (const collectionName of collectionsToRemove) {
      try {
        await db.dropCollection(collectionName);
        console.log(`✅ Dropped collection: ${collectionName}`);
      } catch (error) {
        if (error.message.includes('ns not found')) {
          console.log(`⚠️  Collection ${collectionName} does not exist`);
        } else {
          console.error(`❌ Error dropping ${collectionName}:`, error.message);
        }
      }
    }

    console.log('\n✅ Cleanup complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

dropUnusedCollections();
