const File = require('../models/file');
const Kryptonian = require('../models/kryptonian');
const fs = require('fs');
const path = require('path');

class FileService {
  static async uploadFile(apiKey, file) {
    const kryptonian = await Kryptonian.findOne({ apiKey });
    if (!kryptonian) {
      throw new Error('Invalid API Key');
    }
    const base64Data = fs.readFileSync(file.path, 'base64');
    const newFile = new File({
      kryptonian: kryptonian._id,
      filename: file.originalname,
      data: base64Data,
      contentType: file.mimetype
    });
    await newFile.save();
    fs.unlinkSync(file.path);
    return newFile;
  }

  static async getFile(id) {
    const file = await File.findById(id);
    if (!file) {
      throw new Error('File not found');
    }
    return file;
  }

  static async getAllFiles() {
    const files = await File.find();
    return files;
  }
}

module.exports = FileService;
