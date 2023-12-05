import db from '../database.js';
import CustomError from '../customError.js';
import axios from 'axios';

async function fetchImageUnsplash(location) {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    params: {
      query: location,
      client_id: process.env.UNSPLASH_ACCESS_KEY,
    },
  });
  if (response.data.results.length > 0) {
    const imageUrl = response.data.results[0].urls.regular;
    return imageUrl;
  } else {
    throw new Error('No images found');
  }
}

async function saveDestination(
  planID,
  destinationName,
  dateFrom,
  dateTo,
  destinationImage,
  orderInPlan
) {
  // Function to reformat date from MM/DD/YYYY to YYYY-MM-DD
  const reformatDate = (dateStr) => {
    const [month, day, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  // Convert dates to the required format
  const formattedStartDate = reformatDate(dateFrom);
  const formattedEndDate = reformatDate(dateTo);

  const result = await db.query(
    `INSERT INTO Destinations (planID,
        destinationName,
        dateFrom,
        dateTo,
        orderInPlan,
        destinationImage) VALUES (?, ?, ?, ?, ?, ? )`,
    [
      planID,
      destinationName,
      formattedStartDate,
      formattedEndDate,
      orderInPlan,
      destinationImage,
    ]
  );

  if (result[0].affectedRows) {
    return {
      destinationID: result[0].insertId, // Retrieve the inserted ID
      destinationName,
      dateFrom,
      dateTo,
      orderInPlan,
      destinationImage,
    };
  }
}

export default {
  fetchImageUnsplash,
  saveDestination,
};
