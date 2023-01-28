import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import { refs, galleryCards, galleryCardsMore } from './cards.js';

// const axios = require('axios').default;
const options = {
  enableKeyboard: true,
  captionDelay: 250,
};

const lightBox = new SimpleLightbox('.gallery a', options);
refs.galleryEl.addEventListener('click', openLightBox);
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', fetchMoreArticles);

let pages = 1;
let name = '';
let totalPages = 0;

function onSearch(event) {
  event.preventDefault();
  if (!event.target.elements.searchQuery.value.trim()) {
    return Notiflix.Notify.info('Enter your request');
  }

  name = event.target.elements.searchQuery.value.trim();
  pages = 1;

  btnHidden(refs.loadMoreBtn, true);
  fetchArticles(name)
    .then(r => {
      if (!r.hits.length) {
        return Notiflix.Notify.info('Enter correct request');
      }
      galleryCards(r.hits)
      totalPages = r.totalHits / 40;
      Notiflix.Notify.info(`Hooray! We found ${r.totalHits} images.`);
    })
    .then(r => {
      pages++;
      if (pages < totalPages) {
        btnHidden(refs.loadMoreBtn, false);
      }
    })
}

async function fetchArticles(name, pages = 1) {
  const key = '33172087-140883ac21b857d399fef061e';
  const url = `https://pixabay.com/api/?key=${key}&q=${name}&image_type=photo&per_page=40&page=${pages}&orientation=horizontal&safesearch=true`;

  const resp = await fetch(url);
  if (!resp.ok) {
    return Notiflix.Notify.info(resp.statusText);
  }

  const respJson = await resp.json();
  return respJson;
}

function fetchMoreArticles() {
  btnHidden(refs.loadMoreBtn, true);

  fetchArticles(name, pages)
    .then(r => galleryCardsMore(r.hits))
    .then(r => {
      pages++;
      if (pages < totalPages) {
        btnHidden(refs.loadMoreBtn, false);
      }
    })
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
  lightBox.overlay = true;
}