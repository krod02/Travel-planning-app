import db from '../database.js';
import CustomError from '../customError.js';
import axios from 'axios';
import e from 'express';

async function createTrip(userID, planName, startDate, endDate) {
  // Function to reformat date from MM/DD/YYYY to YYYY-MM-DD
  const reformatDate = (dateStr) => {
    const [month, day, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  // Convert dates to the required format
  const formattedStartDate = reformatDate(startDate);
  const formattedEndDate = reformatDate(endDate);

  const result = await db.query(
    `INSERT INTO TravelPlans (userID, planName, startDate, endDate) VALUES (?, ?, ?, ?)`,
    [userID, planName, formattedStartDate, formattedEndDate]
  );

  if (result[0].affectedRows) {
    return {
      planID: result[0].insertId, // Retrieve the inserted ID
      planName,
      startDate,
      endDate,
      userID,
    };
  }

  throw new CustomError('Trip could not be created', 500);
}

export default {
  createTrip,
};
