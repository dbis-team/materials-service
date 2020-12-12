function runDotenv() {
  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
}

runDotenv();

module.exports = {
  PORT: +process.env.PORT,
  HOST: process.env.HOST,
  GOOGLE_CLOUD_PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT_ID,
  MATERIALS_BUCKET_NAME: process.env.MATERIALS_BUCKET_NAME,
  GOOGLE_CLOUD_SECRET_FILE_NAME: process.env.GOOGLE_CLOUD_SECRET_FILE_NAME,
  GOOGLE_STORAGE_LINK: process.env.GOOGLE_STORAGE_LINK,
  MONGO_CONNECTION: process.env.MONGO_CONNECTION
};
