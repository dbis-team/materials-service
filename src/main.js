const { configureFastifyServer } = require('./server_setup');
const { createConnection } = require('./libs/mongo');
const { HOST, PORT } = require('./libs/config');

(async () => {
  const server = configureFastifyServer();

  try {
    await createConnection();
    await server.listen(PORT, HOST, () => {
      console.info(`Server running on host ${HOST} and port ${PORT}`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
