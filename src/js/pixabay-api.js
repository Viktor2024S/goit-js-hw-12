import axios from 'axios';

const API_KEY = '44806240-6b3f320b71171cc3cb97c5da2';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  };

  const response = await axios.get(BASE_URL, { params });
  if (response.status !== 200) {
    throw new Error('Network response was not ok');
  }
  return response.data;
}