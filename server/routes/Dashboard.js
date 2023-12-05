import express from 'express';
import controller from '../controllers/Dashboard.js';

const router = express.Router();

router.post('/create-trip', async (req, res, next) => {
  try {
    const result = await controller.createTrip(
      req.body.userID,
      req.body.planName,
      req.body.startDate,
      req.body.endDate
    );
    res.json(result);
  } catch (err) {
    console.error('Error in saving trip', err);
    res.status(500).json({ message: 'Error saving trip' });
  }
});

export default router;
