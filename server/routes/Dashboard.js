import e from 'express';
import express from 'express';
import controller from '../controllers/Dashboard.js';

const router = express.Router();

router.get('/fetch-images', async (req, res, next) => {
  try {
    const imageUrl = await controller.fetchImageUnsplash(req.body.location);
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

router.post('/save-trip', async (req, res, next) => {
  try {
    const result = await controller.saveTrip(
      req.body.tripName,
      req.body.tripStartDate,
      req.body.tripEndDate,
      req.body.userId
    );
    res.json(result);
  } catch (err) {
    console.error('Error in saving trip', err);
    res.status(500).json({ message: 'Error saving trip' });
  }
});

export default router;
