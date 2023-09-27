import express from 'express';
import controller from '../controllers/User.js';

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
    next(err);
  }
});

// Login a user
router.post('/login', async (req, res, next) => {
  try {
    const result = await controller.login(req.body.email, req.body.password);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;