import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);



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
