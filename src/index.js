import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import { refs, galleryCards, galleryCardsMore } from './cards.js';
import 'simplelightbox/dist/simple-lightbox.min.css';

const axios = require('axios').default;
const options = {
  enableKeyboard: true,
  captionDelay: 250,
};

const lightbox = new SimpleLightbox('.gallery a', options);
refs.galleryEl.addEventListener('click', openLightBox);
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', fetchMoreArticles);

let pages = 1;
let name = '';
let totalPages = 0;

async function onSearch(event) {
  event.preventDefault();
  try {
    if (!event.target.elements.searchQuery.value.trim()) {
      refs.galleryEl.innerHTML = '';
      return Notiflix.Notify.info('Enter your request');
    }

    name = event.target.elements.searchQuery.value.trim();
    pages = 1;

    btnHidden(refs.loadMoreBtn, true);
    const data = await fetchArticles(name);
    if (!data.hits.length) {
      refs.galleryEl.innerHTML = '';
      return Notiflix.Notify.info('Enter correct request');
    }
    galleryCards(data.hits)
    totalPages = data.totalHits / 40;
    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    pages++;
    lightbox.refresh();
    if (pages < totalPages) {
      btnHidden(refs.loadMoreBtn, false);
    }

  } catch (error) {
    console.dir(error);
  }
}

async function fetchArticles(name, pages = 1) {
  try {
    const key = '33172087-140883ac21b857d399fef061e';
    const url = `https://pixabay.com/api/?key=${key}&q=${name}&image_type=photo&per_page=40&page=${pages}&orientation=horizontal&safesearch=true`;

    const resp = await axios.get(url);
    // const respJson = await resp.json();
    return resp.data;
  } catch (error) {
    console.dir(error);
    Notiflix.Notify.warning(error.message);
  }
}

async function fetchMoreArticles() {
  try {
    btnHidden(refs.loadMoreBtn, true);

    const fetchArtcl = await fetchArticles(name, pages);
    galleryCardsMore(fetchArtcl.hits);
    pages++;
    lightbox.refresh();
    if (pages < totalPages) {
      btnHidden(refs.loadMoreBtn, false);
    }
  } catch (error) {
    console.log(error);
  }
}

btnHidden(refs.loadMoreBtn, true);
function btnHidden(btn, trigger) {
  if (trigger) {
    btn.disabled = true;
    btn.style.display = 'none';
  } else {
    btn.disabled = false;
    btn.style.display = 'inline-block';
  }
}


function openLightBox(event) {
  lightbox.overlay = true;
}