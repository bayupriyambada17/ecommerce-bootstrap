const carouselContainer = document.getElementById('carousel')

export const getAllCarousel = async () => {
  const response = await fetch("https://bootcamp-api.bayupriyambada.repl.co/api/v1/carouselImage.json");
  const carouselImage = await response.json();
  carouselImage.carousel.forEach((element, i) => {
    const isActive = i === 0 ? 'active' : '';
    getSlider(isActive, element.image, element.imageAlt);

  });
}


const getSlider = (i, image, alt) => {
  let carouselHtml = `
    <div class="carousel-item ${i}">
      <img src="${image}" class="d-block w-100 rounded shadow-sm" alt="${alt}" />
    </div>`;

  carouselContainer.innerHTML += carouselHtml;
}
