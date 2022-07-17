import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

// 1) малюємо розмітку галереї використовуючи масив картинок
// 2) При рендері галереї потрібно підставити в розмітку правильні поля
// 3) Потрібно навішати клік на галерею через делегування
// 4) Визначати елемент на який клікнули через event.target
// 5) Потрібно считати данні з атрибута data - source і підставити їх в модальне вікно
// 6) Має зявитися модальне вікно з картинкою я ви отримали з атрибута data-source

const galleryContainer = document.querySelector(".gallery");
const result = createGallery(galleryItems);

function createGallery(array) {
  return array
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

//  variant with reduce

// function createGallery(array) {
//   return array.reduce(
//     (acc, attribute) =>
//       acc +
//       `<div class="gallery__item">
//   <a class="gallery__link" href="${attribute.original}">
//     <img
//       class="gallery__image"
//       src="${attribute.preview}"
//       data-source="${attribute.original}"
//       alt="${attribute.description}"
//     />
//   </a>
// </div>`,
//     ""
//   );
// }

galleryContainer.insertAdjacentHTML("beforeend", result);

function onGalleryPhotoClick(event) {
  event.preventDefault();

  const modal = basicLightbox.create(
    `
    <img src="${event.target.dataset.source}" width="800" height="600">
`,
    {
      onShow: () => window.addEventListener("keydown", onPressKeyEscape),
      onClose: () => window.removeEventListener("keydown", onPressKeyEscape),
    }
  );
  modal.show();

  function onPressKeyEscape(event) {
    if (event.code === "Escape") {
      modal.close();
    }
  }
}

galleryContainer.addEventListener("click", onGalleryPhotoClick);
