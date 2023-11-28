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
      req.body.firstName,
      req.body.lastName
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
    res.cookie('access_token', result.token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 3600000,
    });
    res.json(result.data);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      next(err);
    }
  }
});

router.get('/data', async (req, res, next) => {
  try {
    const result = await controller.getAllUserData(req.query.email);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
