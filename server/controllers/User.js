import db from '../database.js';
import CustomError from '../customError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user
async function register(email, password, firstName, lastName) {
  // check if user exists
  const [user] = await db.query(`SELECT * FROM User WHERE email = ?`, [email]);
  if (user.length) {
    throw new CustomError('User already exists', 409);
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const [result] = await db.query(
    `INSERT INTO User (email, password, firstName, lastName) VALUES (?, ?, ?, ?)`,
    [email, hash, firstName, lastName]
  );
  if (result.affectedRows) {
    const name = `${firstName} ${lastName}`;
    return { id: result.insertId, email, name };
  }
  throw new CustomError('User could not be created', 500);
}

async function getAllUserData(email) {
  const [data] = await db.query(
    `select u.userID, u.email, u.firstName, u.lastName, t.planID, t.planName, t.startDate, t.endDate, d.destinationID, d.destinationName, d.dateFrom, d.dateTo, d.orderInPlan, d.destinationImage, p.POIID, p.name, p.latitude, p.longitude, p.category, p.POIAddress, p.POIImage
    from User u
      left outer join TravelPlans t on u.userID = t.userID
      left outer join Destinations d on t.planID = d.planID
      left outer join PointsOfInterest p on d.destinationID = p.destinationID
    where u.email = ?
    order by u.userID, t.planID, d.orderInPlan;`,
    [email]
  );

  let formattedData = {};

  data.forEach((row) => {
    // Initialize user data if not already present
    if (!formattedData[row.userID]) {
      formattedData[row.userID] = {
        userID: row.userID,
        email: row.email,
        firstName: row.firstName,
        lastName: row.lastName,
        plans: {}, // Initialize an empty object for plans
      };
    }

    // Alias for ease of access to the user's plans
    let userPlans = formattedData[row.userID].plans;

    // Initialize plan data if not already present
    if (!userPlans[row.planID]) {
      userPlans[row.planID] = {
        planID: row.planID,
        planName: row.planName,
        startDate: row.startDate,
        endDate: row.endDate,
        destinations: {}, // Initialize an empty object for destinations
      };
    }

    // Alias for ease of access to the plan's destinations
    let planDestinations = userPlans[row.planID].destinations;

    // Initialize destination data if not already present
    if (!planDestinations[row.destinationID]) {
      planDestinations[row.destinationID] = {
        destinationID: row.destinationID,
        destinationName: row.destinationName,
        dateFrom: row.dateFrom,
        dateTo: row.dateTo,
        orderInPlan: row.orderInPlan,
        destinationImage: row.destinationImage,
        pointsOfInterest: {}, // Initialize an empty object for points of interest
      };
    }

    // Alias for ease of access to the destination's points of interest
    let destinationPOIs = planDestinations[row.destinationID].pointsOfInterest;

    // Initialize point of interest data if not already present
    if (!destinationPOIs[row.POIID]) {
      destinationPOIs[row.POIID] = {
        POIID: row.POIID,
        name: row.name,
        latitude: row.latitude,
        longitude: row.longitude,
        category: row.category,
        POIAddress: row.POIAddress,
        POIImage: row.POIImage,
      };
    }
  });
  return formattedData;
}

// Login a user
async function login(email, password) {
  const [rows] = await db.query(`SELECT * FROM User WHERE email = ?`, [email]);
  if (rows.length === 0) {
    throw new CustomError('User does not exist', 404);
  }
  const user = rows[0];

  if (!bcrypt.compareSync(password, user.password)) {
    throw new CustomError('Password is incorrect', 400);
  }
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  const userData = await getAllUserData(user.email);

  return { data: userData, token };
}

export default {
  register,
  login,
  getAllUserData,
};
