const FileService = require('../services/fileService');

class FileController {
  static async uploadFile(req, res) {
    const apiKey = req.headers['x-api-key'];
    try {
      const file = await FileService.uploadFile(apiKey, req.file);
      res.status(201).json({ message: 'File uploaded successfully', file });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getFile(req, res) {
    try {
      const file = await FileService.getFile(req.params.id);
      res.status(200).json({ file });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async getAllFiles(req, res) {
    const files = await FileService.getAllFiles();
    res.status(200).json({ files });
  }
}

module.exports = FileController;
