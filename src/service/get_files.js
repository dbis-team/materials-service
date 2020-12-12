const { FileModel } = require('../models/File');
const { generateResponse } = require('../helpers/generateResponse');

async function getFilesByIds(ids) {
  try {
    const files = await FileModel.find({
      _id: { $in: ids }
    });

    return generateResponse(files, true);
  } catch (error) {
    return generateResponse(undefined, false, error.message);
  }
}

module.exports = { getFilesByIds };
