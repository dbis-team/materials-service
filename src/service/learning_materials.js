const { v4: uuidV4 } = require('uuid');

const { GoogleStoreService } = require('../libs/google_storage');
const { MATERIALS_BUCKET_NAME } = require('../libs/config');
const { FileModel } = require('../models/File');
const { generateResponse } = require('../helpers/generateResponse');

async function saveLearningMaterials(parts) {
  try {
    const urls = [];
    for await (const part of parts) {
      const extention = part.filename.split('.').slice(-1)[0];
      const cloudName = `${uuidV4()}.${extention}`;

      const url = await GoogleStoreService.getInstance()
        .uploadFileToBucket(MATERIALS_BUCKET_NAME, part.file, cloudName);

      urls.push({
        link: url,
        name: part.filename,
        cloudName,
        mimeType: part.mimetype
      });
    }

    const files = await FileModel.create(urls);

    return generateResponse(files, true);    
  } catch (error) {
    return generateResponse(undefined, false, error.message);
  }
}

module.exports = { saveLearningMaterials };
