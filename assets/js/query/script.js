"use strict"
import { urlApi } from './helper.js'
import { getAllCarousel } from './carousel.js'
import { getCardProduct } from '../helper/cardProduct.js';
import { getCategoryProd } from '../helper/cardCategory.js';
const count = document.getElementById('count');
const categorySelect = document.getElementById('categorySelect')
const shopSelect = document.getElementById('shopSelect');
const productsList = document.getElementById('productsList');


// sinkron with minim query
async function fetchData() {
  const response = await fetch(urlApi);
  return await response.json();
}

async function getProducts() {
  const { products } = await fetchData();
  let displayProductCount = 0;
  const totalProducts = products.length;
  const productsToShow = 12; // Jumlah produk yang ingin ditampilkan setiap kali

  // Fungsi untuk menampilkan produk pada halaman
  const displayProducts = (startIndex, endIndex) => {
    for (let i = startIndex; i < endIndex; i++) {
      const product = products[i];
      if (product) {
        const cardProduct = getCardProduct(
          product.id, product.img.url, product.nameProduct.slice(0, 10),
          product.category, product.price, product.shop.name
        );
        productsList.innerHTML += cardProduct;
        displayProductCount++
      }
    }
  };

  // Hitung jumlah halaman yang diperlukan
  const totalPages = Math.ceil(totalProducts / productsToShow);

  // Fungsi untuk menangani tombol "Load More"
  const loadMoreHandler = () => {
    const currentPage = loadMoreHandler.currentPage || 1;
    const nextPage = currentPage + 1;

    const startIndex = (nextPage - 1) * productsToShow;
    const endIndex = nextPage * productsToShow;

    displayProducts(startIndex, endIndex);

    // Simpan nomor halaman saat ini untuk pemanggilan berikutnya
    loadMoreHandler.currentPage = nextPage;

    // Sembunyikan tombol "Load More" jika semua produk telah ditampilkan
    if (nextPage >= totalPages) {
      loadMoreBtn.style.display = 'none';
    }
    updateCount()
  };

  const loadMoreBtn = document.getElementById('loadMore');
  // Menambahkan event listener untuk tombol "Load More"
  if (loadMoreBtn) loadMoreBtn.addEventListener('click', loadMoreHandler);

  // Fungsi untuk memperbarui count
  const updateCount = () => {
    if (count) {
      count.innerText = displayProductCount.toString();
    }
  };


  // Menampilkan produk pertama kali
  displayProducts(0, productsToShow);

  // Tampilkan tombol "Load More" hanya jika ada lebih dari 12 produk
  if (totalProducts > productsToShow) {
    loadMoreBtn.style.display = 'block';
  }

  updateCount()

}



async function getCategory() {
  const { products } = await fetchData();

  if (products) {
    // jika terjadi category sama maka jadikan 1 saja.
    const uniqueCategories = [...new Set(products.map(prod => prod.category))];
    uniqueCategories.unshift('Pilihan Kategori');

    categorySelect.innerHTML = uniqueCategories.map((category) => {
      return getCategoryProd(category)

    }).join('');
  }

}

// Pilihan Toko
async function getShopName() {
  const { products } = await fetchData();
  if (products) {
    const uniqueShopName = [...new Set(products.map(s => s.shop.name))];
    uniqueShopName.unshift('Pilihan Toko');
    shopSelect.innerHTML = uniqueShopName.map((shop) => getShopNameProd(shop)).join('');;
  }
}

const getShopNameProd = (shopName) => {
  const lowercaseKey = shopName.toLowerCase().replace(/ /g, '-');

  return `
  <option value="${lowercaseKey}">${shopName}</option>
  `
}

async function init() {
  await getProducts();
  await getCategory();
  await getShopName();
  await getAllCarousel();
  // await selectPrices();
}

init();