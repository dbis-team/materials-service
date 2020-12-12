const { configureFastifyServer } = require('./server_setup');
const { createConnection } = require('./libs/mongo');

(async () => {
  const server = configureFastifyServer();

  try {
    await createConnection();
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
