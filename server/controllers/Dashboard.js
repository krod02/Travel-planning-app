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
  const imageUrl = response.data.results[0].urls.regular;
  return imageUrl;
}

export default {
  fetchImageUnsplash,
};
