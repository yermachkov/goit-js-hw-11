
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import PicsApiService from './js/fetch-pics';
import Notiflix from 'notiflix';


const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', onFormSubmit);
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.addEventListener('click', onLoadMore);

const lightbox = new SimpleLightbox('.gallery a');
const pics = new PicsApiService();


function onFormSubmit(event) {
  event.preventDefault();

  pics.searchQuery = event.target.elements.searchQuery.value;
  pics.resetPage();
  clearGalleryMarkup();
  loadMoreBtn.classList.add('is-hidden');

  pics.fetchPics().then(response => {
    if (response.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      renderGallery(response);
      loadMoreBtn.classList.remove('is-hidden');
    } 
  });
};

function onLoadMore() {
  pics.fetchPics().then(renderGallery)
  
}

function createMarkup(data) {
  return data.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
  `
  <a href="${largeImageURL}">
    <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}
        </p>
        <p class="info-item">
          <b>Views</b>${views}
        </p>
        <p class="info-item">
          <b>Comments</b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${downloads}
        </p>
      </div>
    </div>
  </a>
  `
  ).join('');
}

function renderGallery(markup) {
  gallery.insertAdjacentHTML('beforeend', createMarkup(markup));
  lightbox.refresh();
}

function clearGalleryMarkup() {
  gallery.innerHTML = "";
};