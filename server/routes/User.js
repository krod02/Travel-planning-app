import express from 'express';
import controller from '../controllers/User.js';
import CustomError from '../customError.js';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res, next) => {
  try {
    const result = await controller.register(
      req.body.email,
      req.body.password,
      req.body.name
    );
    res.json(result);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      next(err);
    }
  }
});

// Login a user
router.post('/login', async (req, res, next) => {
  try {
    const result = await controller.login(req.body.email, req.body.password);
    res.json(result);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      next(err);
    }
  }
});

export default router;
