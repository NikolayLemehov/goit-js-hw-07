import { galleryItems } from './gallery-items.js';

const galleryRef = document.querySelector('.gallery');

const getItemMarkup = ({preview, original, description}) => `
  <div class="gallery__item">
    <a class="gallery__link">
      <img
        class="gallery__image"
        src="${preview}"
        width="340"
        loading="lazy"
        data-big-url="${original}"
        alt="${description}"/>
    </a>
  </div>
`
const getImagesMarkup = (images) => images.map(it => getItemMarkup(it)).join('')

galleryRef.innerHTML = getImagesMarkup(galleryItems);
galleryRef.addEventListener('click', onClickGallery)

function onClickGallery(e) {
  const link = e.target.closest('.gallery__link');
  const img = link?.querySelector('.gallery__image')

  if (!(link && img)) return;
  const {alt: description, dataset: {bigUrl: url}} = img

  showBigImg({url, description})
}

function showBigImg({url, description}) {
  const instance = window.basicLightbox.create(`
    <img
      class="gallery__image"
      src="${url}"
      width="1280"
      alt="${description}"/>
  `)

  instance.show()
}
