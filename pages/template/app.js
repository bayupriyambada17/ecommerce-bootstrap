import { header } from "./components/header.js";
import { pageTitle } from "./components/inc/env.js";
const runApp = document.getElementById('run')
const titlePages = document.getElementById('titlePage')
titlePages.innerHTML = pageTitle
function run() {

  runApp.innerHTML = header()
}

run();