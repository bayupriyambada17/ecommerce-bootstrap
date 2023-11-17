"use strict"

const count = document.getElementById('count');
const categorySelect = document.getElementById('categorySelect')
const shopSelect = document.getElementById('shopSelect');

// get API
const urlApi = 'https://bootcamp-api.bayupriyambada.repl.co/api/v1/productsApi.json';

async function getProducts() {
  const products = await fetch(urlApi);
  const prodApi = await products.json();
  // hitung total jumlah produk
  count.innerText = prodApi.products.length || 0; // jika ada data total atau 0 data
}

async function getCategory() {
  const categoryProducts = await fetch(urlApi);
  const category = await categoryProducts.json();

  // jika terjadi category sama maka jadikan 1 saja.
  const uniqueCategories = [...new Set(category.products.map(cat => cat.category))];
  uniqueCategories.unshift('Pilihan Kategori');

  const selectUniques = uniqueCategories.map((category) => getCategoryProd(category)).join('');
  categorySelect.innerHTML = selectUniques;
}

const getCategoryProd = (category) => {
  const lowercaseKey = category.toLowerCase().replace(/ /g, '-');
  return `
  <option value="${lowercaseKey}">${category}</option>
  `
}

// Pilihan Toko
async function getShopName() {
  const shopProducts = await fetch(urlApi);
  const shop = await shopProducts.json();
  const uniqueShopName = [...new Set(shop.products.map(s => s.shop))];
  uniqueShopName.unshift('Pilihan Toko');

  const selectUniques = uniqueShopName.map((shop) => getShopNameProd(shop)).join('');
  shopSelect.innerHTML = selectUniques;
}

const getShopNameProd = (shopName) => {
  const lowercaseKey = shopName.toLowerCase().replace(/ /g, '-');

  return `
  <option value="${lowercaseKey}">${shopName}</option>
  `
}

function init() {
  getProducts();
  getCategory();
  getShopName();
}

init();