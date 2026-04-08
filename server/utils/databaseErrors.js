const DATABASE_UNAVAILABLE_ERROR_NAMES = new Set([
  'MongooseServerSelectionError',
  'MongoNetworkError',
  'MongoServerSelectionError'
]);

const isDatabaseUnavailableError = (error) => {
  if (!error) return false;

  if (DATABASE_UNAVAILABLE_ERROR_NAMES.has(error.name)) {
    return true;
  }

  return /could not connect to any servers|server selection timed out|querysrv/i.test(
    error.message || ''
  );
};

const getDatabaseUnavailableMessage = () =>
  'Database unavailable. Check the MongoDB connection and Atlas IP whitelist.';

module.exports = {
  isDatabaseUnavailableError,
  getDatabaseUnavailableMessage
};
