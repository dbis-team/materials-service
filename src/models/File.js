const { v4: uuidV4 } = require('uuid');
const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  _id: { type: String, default: uuidV4 },
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  cloudName: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

module.exports = {
  FileModel: mongoose.model('File', FileSchema)
};
