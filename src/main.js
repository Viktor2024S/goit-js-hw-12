import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import iziToast from 'izitoast/dist/js/iziToast.min.js';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('#load-more');

let query = '';
let page = 1;
const perPage = 15;
let lightbox;

async function handleSearch(event) {
  event.preventDefault();

  query = event.target.elements.query.value.trim();
  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Search query cannot be empty!',
    });
    return;
  }

  page = 1;
  loader.classList.remove('hidden');
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('hidden');

  // Destroy the previous instance of SimpleLightbox
  if (lightbox) {
    lightbox.destroy();
  }

  try {
    const data = await fetchImages(query, page, perPage);
    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderGallery(data.hits, gallery);
      lightbox = new SimpleLightbox('.gallery a', {});
      if (data.totalHits > perPage) {
        loadMoreBtn.classList.remove('hidden');
      }
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

async function loadMore() {
  page += 1;
  loader.classList.remove('hidden');
  loadMoreBtn.classList.add('hidden');

  try {
    const data = await fetchImages(query, page, perPage);
    renderGallery(data.hits, gallery);

    if (page * perPage >= data.totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadMoreBtn.classList.remove('hidden');
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
loadMoreBtn.addEventListener('click', loadMore);
