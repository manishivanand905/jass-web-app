// Run this in MongoDB to fix the duplicate orderId issue:
// 1. Connect to MongoDB
// 2. Use the jass_automotives database
// 3. Run these commands:

// Drop the unique index on orderId
db.orders.collection.dropIndex("orderId_1");

// Or if you want to keep the data, just remove the duplicate:
db.orders.deleteMany({ orderId: "ORD-2026-0004" });

// Then restart your server to recreate the index
