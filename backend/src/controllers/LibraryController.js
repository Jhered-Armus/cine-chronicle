const Library = require('../models/Library');

exports.addOrUpdateLibrary = async (req, res) => {
  const { userId, itemId, status } = req.body;

  try {
    let library = await Library.findOne({ userId });

    if (!library) {
      // Crear una nueva entrada en la biblioteca para el usuario
      library = new Library({
        userId,
        entries: [{ itemId, status }]
      });
    } else {
      // Encontrar la entrada existente para el itemId
      const entryIndex = library.entries.findIndex(entry => entry.itemId === itemId);

      if (entryIndex > -1) {
        // Actualizar la entrada existente
        library.entries[entryIndex].status = status;
      } else {
        // Agregar una nueva entrada
        library.entries.push({ itemId, status });
      }
    }

    await library.save();
    res.status(200).json(library);
  } catch (error) {
    console.error('Error al actualizar la biblioteca: ', error);
    res.status(500).json({ message: 'Error al actualizar la biblioteca' });
  }
};

exports.getLibraryByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const library = await Library.findOne({ userId });

    if (!library) {
      return res.status(404).json({ message: 'No se encontró ninguna biblioteca para esta usuario.' });
    }

    res.status(200).json(library);
  } catch (error) {
    console.error('Error al recuperar la biblioteca:', error);
    res.status(500).json({ message: 'Error al recuperar la biblioteca' });
  }
};