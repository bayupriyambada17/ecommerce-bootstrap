const count = document.getElementById('count');

async function getProducts() {
  const products = await fetch('https://bootcamp-api.bayupriyambada.repl.co/api/v1/productsApi.json');
  const prodApi = await products.json();

  // hitung total jumlah produk
  count.innerText = prodApi.products.length;
}
function init() {
  getProducts();
}

init();