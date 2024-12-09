// insert your code here

const API_KEY = '47398342-c4f399e57f5c71f1dbfff10b5';
const BASE_URL = 'https://pixabay.com/api/';

const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
console.log(gallery);

async function loadData() {
  try {
    showLoadingMessage();
    const response = await fetch(`${BASE_URL}?key=${API_KEY}`);

    if (response.ok) {
      removeLoadingMessage();

      const data = await response.json();
      console.log(data);

      gallery.innerHTML = renderCards(data.hits);
    }
  } catch {}
}

loadData();

function showLoadingMessage() {
  const loadingMessage = document.createElement('p');
  loadingMessage.textContent = 'Loading images, please wait...';
  loadingMessage.classList.add('loading-message');
  loadMoreBtn.insertAdjacentElement('beforebegin', loadingMessage);
}

function removeLoadingMessage() {
  const loadingMessage = document.querySelector('.loading-message');

  if (loadingMessage) {
    loadingMessage.remove();
  }
}

function createCard(card) {
  return `
    <div class="photo-card">
      <img src="${card.previewURL}" alt="${card.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${card.likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${card.views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${card.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${card.downloads}
        </p>
        </div>
      </div>
   `;
}

function renderCards(cards) {
  return cards.map((c) => createCard(c)).join('');
}

