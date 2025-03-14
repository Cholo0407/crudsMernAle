//Array de metodos (C R U D)
const reviewsController = {};
import reviewModel from "../models/Reviews.js";


// SELECT
reviewsController.getReview = async (req, res) => {
  const reviews = await reviewModel.find().populate('idClient');
  res.json(reviews);
};

// INSERT
reviewsController.createReview = async (req, res) => {
  const { comment, rating, idClient } = req.body;
  const newReview = new reviewModel({ comment, rating, idClient });
  await newReview.save();
  res.json({ message: "Review saved" });
};

// DELETE
reviewsController.deleteReview = async (req, res) => {
  const deletedReview = await reviewModel.findByIdAndDelete(req.params.id);
  if (!deletedReview) {
    return res.status(404).json({ message: "Review not found" });
  }
  res.json({ message: "Review deleted" });
};

// UPDATE
reviewsController.updateReview = async (req, res) => {
  // Solicito todos los valores
  const { comment, rating, idClient } = req.body;
  // Actualizo
  await reviewModel.findByIdAndUpdate(
    req.params.id,
    {
      comment, 
      rating, 
      idClient,
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "Review updated" });
};

export default reviewsController;
