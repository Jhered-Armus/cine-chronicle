const UserReview = require("../models/Review");

const saveOrUpdateReview = async (req, res) => {
  const { userId, username, itemId, episode, rating, seen, reviewDate, themes, summary, conclusion } = req.body;

  try {
    let userReview = await UserReview.findOne({ userId });

    if (userReview) {
      // Encontrar la reseña específica para el item y episodio
      let reviewIndex = userReview.reviews.findIndex(
        review => review.itemId === itemId && review.episode === episode
      );

      if (reviewIndex !== -1) {
        // Actualizar la reseña existente
        userReview.reviews[reviewIndex] = {
          itemId, episode, rating, seen, reviewDate, themes, summary, conclusion
        };
      } else {
        // Agregar una nueva reseña
        userReview.reviews.push({ itemId, episode, rating, seen, reviewDate, themes, summary, conclusion });
      }
    } else {
      // Crear un nuevo documento de usuario si no existe
      userReview = new UserReview({
        userId,
        username,
        reviews: [{ itemId, episode, rating, seen, reviewDate, themes, summary, conclusion }]
      });
    }

    await userReview.save();
    res.status(201).json(userReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getReview = async (req, res) => {
  const { userId, itemId, episode } = req.params;

  try {
    const userReview = await UserReview.findOne({ userId });

    if (!userReview) {
      console.log('No user review found for userId:', userId);
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    const review = userReview.reviews.find(
      review => review.itemId === itemId && review.episode === parseInt(episode)
    );

    if (!review) {
      console.log('No review found for itemId:', itemId, 'and episode:', episode);
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    console.log('Review found:', review);
    res.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveOrUpdateReview,
  getReview
};