const path = require('path');
const { Storage } = require('@google-cloud/storage');
const { 
  GOOGLE_CLOUD_PROJECT_ID, 
  GOOGLE_CLOUD_SECRET_FILE_NAME, 
  GOOGLE_STORAGE_LINK 
} = require('./config');

class GoogleStoreService {
  constructor() {
    this.storage = new Storage({
      keyFilename: path.join(__dirname, `../../secrets/${GOOGLE_CLOUD_SECRET_FILE_NAME}.json`),
      projectId: GOOGLE_CLOUD_PROJECT_ID
    });
  }

  static instance = null;
  static getInstance() {
    if (!GoogleStoreService.instance) {
      GoogleStoreService.instance = new GoogleStoreService();
    }
    return GoogleStoreService.instance; 
  }

  uploadFileToBucket(bucketName, stream, filename) {
    return new Promise((resolve, reject) => {
      stream
        .pipe(
          this.storage.bucket(bucketName).file(filename).createWriteStream({
            resumable: false,
            gzip: true
          })
        )
        .on('finish', () => { 
          resolve(`${GOOGLE_STORAGE_LINK}/${bucketName}/${filename}`); 
        })
        .on('error', reject);
    });
  }

  async deleteFile(bucketName, filename) {
    const files = await this.storage.bucket(bucketName).getFiles({ prefix: filename });
    await Promise.all(files[0].map(file => file.delete()));
  }
}

module.exports = { GoogleStoreService };
