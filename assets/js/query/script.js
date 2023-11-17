"use strict"
import { urlApi } from './helper.js'

const count = document.getElementById('count');
const categorySelect = document.getElementById('categorySelect')
const shopSelect = document.getElementById('shopSelect');

async function fetchData() {
  const response = await fetch(urlApi);
  return await response.json();
}

async function getProducts() {
  const { products } = await fetchData();
  // hitung total jumlah produk
  count.innerText = products.length || 0; // jika ada data total atau 0 data
}

async function getCategory() {
  const { products } = await fetch(urlApi);

  if (products) {
    // jika terjadi category sama maka jadikan 1 saja.
    const uniqueCategories = [...new Set(products.map(prod => prod.category))];
    uniqueCategories.unshift('Pilihan Kategori');

    categorySelect.innerHTML = uniqueCategories.map((category) => getCategoryProd(category)).join('');

  }
}

const getCategoryProd = (category) => {
  const lowercaseKey = category.toLowerCase().replace(/ /g, '-');
  return `<option value="${lowercaseKey}">${category}</option>`
}

// Pilihan Toko
async function getShopName() {
  const { products } = await fetch(urlApi);
  if (products) {
    const uniqueShopName = [...new Set(products.map(s => s.shop))];
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
}

init();