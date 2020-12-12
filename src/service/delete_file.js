const { FileModel } = require('../models/File');
const { generateResponse } = require('../helpers/generateResponse');
const { GoogleStoreService } = require('../libs/google_storage');
const { MATERIALS_BUCKET_NAME } = require('../libs/config');

async function deleteFile(id) {
  try {
    const file = await FileModel.findByIdAndDelete(id);
    await GoogleStoreService.getInstance().deleteFile(MATERIALS_BUCKET_NAME, file.get('cloudName'))

    return generateResponse(undefined, true);
  } catch (error) {
    return generateResponse(undefined, false, error.message);
  }
}

module.exports = { deleteFile };
