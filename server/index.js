// Importing all necessary modules and dependencies needed to run the server
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import bodyParser from 'body-parser'; // used to parse incoming request bodies in a middleware before handlers
import cookieParser from 'cookie-parser'; // used to parse cookie header and populate req.cookies with an object keyed by the cookie names
import UserRoutes from './routes/User.js';
import DashboardRoutes from './routes/Dashboard.js';

const __filename = fileURLToPath(import.meta.url); // converting module url to file path
const __dirname = dirname(__filename); // getting directory name from file path

// Create express app server
const app = express();

// using cors to allow cross origin resource sharing from client side
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

// Middleware being used by express app
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes for user login and registration
app.use('/user', UserRoutes);
app.use('/dashboard', DashboardRoutes);

// Port server is listening on
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

// Error handling
app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
  console.error(err.stack);
});
