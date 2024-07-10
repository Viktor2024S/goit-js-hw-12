import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import iziToast from 'izitoast/dist/js/iziToast.min.js';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('#loader');

async function handleSearch(event) {
  event.preventDefault();

  const searchQuery = event.target.elements.query.value.trim();
  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Search query cannot be empty!',
    });
    return;
  }

  loader.classList.remove('hidden');
  gallery.innerHTML = '';

  try {
    const images = await fetchImages(searchQuery);
    if (images.length === 0) {
      iziToast.warning({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderGallery(images, gallery);
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    loader.classList.add('hidden');
  }
}

form.addEventListener('submit', handleSearch);
