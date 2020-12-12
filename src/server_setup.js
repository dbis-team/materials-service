const fastify = require('fastify');
const { v4: uuidV4 } = require('uuid');
const { GoogleStoreService } = require('./libs/google_storage');
const { MATERIALS_BUCKET_NAME } = require('./libs/config');

function configureFastifyServer() {
  const server = fastify({ logger: true });
  server.register(require('fastify-multipart'));

  server.post('/learning-materials', async (request, reply) => {
    try {
      const parts = await request.files()
      const urls = [];
      for await (const part of parts) {
        const extention = part.filename.split('.').slice(-1)[0];
        const url = await GoogleStoreService.getInstance()
          .uploadFileToBucket(MATERIALS_BUCKET_NAME, part.file, `${uuidV4()}.${extention}`);
  
        urls.push({
          url,
          filename: part.filename
        });
      }
  
      return urls;    
    } catch (error) {
      return { error };   
    }
  });

  return server;
}

module.exports = { configureFastifyServer };
