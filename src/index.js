import Notiflix from 'notiflix';

const axios = require('axios').default;

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', fetchMoreArticles);
let pages = 1;
let name = '';
let totalPages = 0;


function onSearch(event) {
    event.preventDefault();
    name = event.target.elements.searchQuery.value;
    pages = 1;

    btnHidden(refs.loadMoreBtn, true);
    fetchArticles(name)
        .then(r => {
            galleryCards(r.hits)
            totalPages = r.totalHits / 40;
        })
        .then(r => {
            pages++;
            if (pages < totalPages) {
                btnHidden(refs.loadMoreBtn, false);
            }
        })
}

function fetchArticles(name, pages = 1) {
    const key = '33172087-140883ac21b857d399fef061e';
    const url = `https://pixabay.com/api/?key=${key}&q=${name}&image_type=photo&per_page=40&page=${pages}&orientation=horizontal&safesearch=true`;

    return fetch(url)
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error(response.statusText)
            }

            return response.json()
        })
}

function galleryCards(array) {
    refs.galleryEl.innerHTML = array.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width="200px"/>
            <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
        </div>`
    ).join('');
}

function galleryCardsMore(array) {
    refs.galleryEl.insertAdjacentHTML('beforeend', array.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
        </div>`
    ).join(''))
}

function fetchMoreArticles() {
    btnHidden(refs.loadMoreBtn, true);

    fetchArticles(name, pages).then(r => galleryCardsMore(r.hits)).then(r => {
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