const{ configureFastifyServer } = require('./server_setup');

(async () => {
  const server = configureFastifyServer();

  try {
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
