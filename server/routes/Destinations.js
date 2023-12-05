import express from 'express';
import controller from '../controllers/Destinations.js';

const router = express.Router();

router.get('/fetch-images', async (req, res, next) => {
  try {
    const imageUrl = await controller.fetchImageUnsplash(req.query.location);
    res.json(imageUrl);
  } catch (err) {
    console.error('Error in fetching image from Unsplash', err);
    if (err.response) {
      res
        .status(err.response.status)
        .json({ message: err.response.data.message });
    } else {
      res.status(500).json({ message: 'Error fetching image from Unsplash' });
    }
  }
});

router.post('/save-destination', async (req, res, next) => {
  try {
    const result = await controller.saveDestination(
      req.body.planID,
      req.body.destinationName,
      req.body.dateTo,
      req.body.dateFrom,
      req.body.destinationImage,
      req.body.orderInPlan
    );
    res.json(result);
  } catch (err) {
    console.error('Error in saving destination', err);
    res.status(500).json({ message: 'Error saving destination' });
  }
});

export default router;
