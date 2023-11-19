"use strict";
import { urlApi } from "../helper/env.js";
import { getAllCarousel } from "./carousel.js";
import { getCardProduct } from "../components/cardProduct.js";
import { getCategoryProd } from "../components/cardCategory.js";
import { listShopName } from "../components/listShopName.js";
import { namesApp } from "../helper/env.js";

import {
  count,
  categorySelect,
  shopSelect,
  productsList,
  searchProduct,
  loadMoreBtn
} from "../shared/elementId.js";

let displayProductCount = 0;
// sinkron with minim query
async function fetchData() {
  const response = await fetch(urlApi);
  return await response.json();
}

async function getProducts() {
  const { products } = await fetchData();
  const totalProducts = products.length;
  const productsToShow = 24; // Jumlah produk yang ingin ditampilkan setiap kali

  // Fungsi untuk menampilkan produk pada halaman
  const displayProducts = (startIndex, endIndex, searchTerm) => {
    productsList.innerHTML = "";
    displayProductCount = 0; // Reset the count

    for (let i = startIndex; i < endIndex; i++) {
      const product = products[i];

      if (
        !product ||
        typeof product !== "object" ||
        !product.nameProduct ||
        !product.shop.name
      ) {
        continue;
      }

      // check id
      if (!product.id) {
        console.error("Product id is missing:", product);
        continue;
      }

      if (
        searchTerm &&
        !product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        continue;
      }
      const cardProduct = getCardProduct(
        product.id,
        product.img.url,
        product.nameProduct.length > 15
          ? product.nameProduct.slice(0, 15) + "..."
          : product.nameProduct,
        product.category,
        product.price,
        `${product.shop.name} - ${product.shop.rating}`
      );
      productsList.innerHTML += cardProduct;
      displayProductCount++;
    }
    updateCount();
  };

  const getSearchQuery = (nameProduct) => {
    const urlSearch = new URLSearchParams(window.location.search);
    const value = urlSearch.get(nameProduct);

    if (value !== null && value !== "") {
      return value;
    } else {
      urlSearch.delete(nameProduct);
      const newUrl = `${window.location.origin}${window.location.pathname
        }?${urlSearch.toString()}`;
      window.history.replaceState({}, "", newUrl);
      return null;
    }
  };

  const searchQueryParams = getSearchQuery("nameProduct");
  if (searchQueryParams !== null) searchProduct.value = searchQueryParams;

  // kondisi pencarian (search)
  searchProduct.addEventListener("input", () => {
    const searchTerm = searchProduct.value.trim();
    displayProducts(0, productsToShow, searchTerm);

    // update query
    const searchName = `?nameProduct=${encodeURIComponent(searchTerm).replace(
      /%20/g,
      "+"
    )}`;
    window.history.replaceState({}, "", searchName);

    // Show the "Load More" button
    loadMoreBtn.style.display = "block";
    updateCount();
  });

  // Fungsi untuk menangani tombol "Load More"
  const loadMoreHandler = () => {
    // Display all products without search filter
    displayProducts(0, products.length, null);

    // Hide the "Load More" button
    loadMoreBtn.style.display = "none";

    // Update the count
    updateCount();
  };

  // Menambahkan event listener untuk tombol "Load More"
  if (loadMoreBtn) loadMoreBtn.addEventListener("click", loadMoreHandler);

  // Fungsi untuk memperbarui count
  const updateCount = () => {
    if (count) {
      count.innerText = displayProductCount.toString();
    }
  };

  // Menampilkan produk pertama kali
  displayProducts(0, productsToShow, searchQueryParams || "");

  // Tampilkan tombol "Load More" hanya jika ada lebih dari 12 produk
  if (totalProducts > productsToShow) {
    loadMoreBtn.style.display = "block";
  }
  updateCount();
}

async function getCategory() {
  const { products } = await fetchData();

  if (products) {
    // jika terjadi category sama maka jadikan 1 saja.
    const uniqueCategories = [
      ...new Set(products.map((prod) => prod.category)),
    ];
    uniqueCategories.unshift("Pilihan Kategori");

    categorySelect.innerHTML =
      uniqueCategories
        .map((category) => {
          return getCategoryProd(category);
        })
        .join("") || null;
  }
}

// Pilihan Toko
async function getShopName() {
  const { products } = await fetchData();
  if (products) {
    const uniqueShopName = [...new Set(products.map((s) => s.shop.name))];
    uniqueShopName.unshift("Pilihan Toko");
    shopSelect.innerHTML = uniqueShopName
      .map((shop) => listShopName(shop))
      .join("");
  }
}

async function init() {
  await getProducts();
  await getCategory();
  await getShopName();
  await getAllCarousel();
  namesApp
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
