const fastify = require('fastify');

const { saveLearningMaterials } = require('./service/learning_materials');
const { getFilesByIds } = require('./service/get_files');
const { deleteFile } = require('./service/delete_file');

function configureFastifyServer() {
  const server = fastify({ logger: true });

  server.register(require('fastify-multipart'));
  server.register(require('fastify-cors'), {
    origin: '*'
  });

  server.post('/learning-materials', async (request) => {
    const parts = await request.files()
    const res = await saveLearningMaterials(parts);

    return res;
  });

  server.get('/learning-materials', async (request) => {
    const ids = request.query.ids || [];
    const res = await getFilesByIds(ids);

    return res;
  });

  server.delete('/learning-materials/:id', async (request) => {
    const { id } = request.params;
    const res = await deleteFile(id);

    return res;
  });

  return server;
}

module.exports = { configureFastifyServer };
