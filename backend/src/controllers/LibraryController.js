const Library = require('../models/Library');

exports.addOrUpdateLibrary = async (req, res) => {
    const { userId, itemId, status } = req.body;
  
    try {
      let libraryEntry = await Library.findOne({ userId, itemId });
  
      if (libraryEntry) {
        // Actualizar entrada existente
        libraryEntry.status = status;
        await libraryEntry.save();
      } else {
        // Crear nueva entrada
        libraryEntry = new Library({ userId, itemId, status });
        await libraryEntry.save();
      }
  
      res.status(200).json(libraryEntry);
    } catch (error) {
      console.error('Error updating library:', error);
      res.status(500).json({ message: 'Error updating library' });
    }
  };
  
  exports.getLibraryByUser = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const libraryEntries = await Library.find({ userId });
      res.status(200).json(libraryEntries);
    } catch (error) {
      console.error('Error fetching library:', error);
      res.status(500).json({ message: 'Error fetching library' });
    }
  };