export const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

export function galleryCards(array) {
    refs.galleryEl.innerHTML = array.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="200px" class="photo-img"/>
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

export function galleryCardsMore(array) {
    refs.galleryEl.insertAdjacentHTML('beforeend', array.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="200px" class="photo-img"/>
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