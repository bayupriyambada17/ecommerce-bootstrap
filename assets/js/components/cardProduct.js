export const getCardProduct = (
  id,
  img,
  nameProduct,
  category,
  price,
  shopName) => {
  const productCard = `
    <div class="col-sm-3 col-md-4 col-12">
      <div class="card">
        <img
          src="${img}"
          class="card-img-top"
          heigth="250"
          alt="${nameProduct}"
        />
        <div class="card-body">
          <h5 class="card-title">${nameProduct}</h5>
         
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${category}</li>
          <li class="list-group-item">${price}</li>
          <li class="list-group-item">${shopName}</li>
        </ul>
        <div class="card-body">
          <a href="#${id}" class="d-block btn btn-outline-dark"
            >Tambah Keranjang</a
          >
        </div>
      </div>
    </div>
  `;
  return productCard
}