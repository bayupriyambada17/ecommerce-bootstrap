import { titlePage } from "./inc/env.js"
export const header = () => {
  return `
		<nav
			class="navbar navbar-expand-lg fixed-top"
			style="background-color: rgb(255, 0, 89) !important; color: white;"
		>
			<div class="container">
				<a class="navbar-brand fw-bold" href="/">${titlePage}</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<!-- <li class="nav-item">
							<a class="nav-link active" aria-current="page" href="#">Home</a>
						</li> -->
						<li class="nav-item dropdown">
							<a
								class="nav-link dropdown-toggle"
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Kategori
							</a>
							<ul class="dropdown-menu">
								<li><a class="dropdown-item" href="#">Action</a></li>
								<li><a class="dropdown-item" href="#">Another action</a></li>
								<li><hr class="dropdown-divider" /></li>
								<li>
									<a class="dropdown-item" href="#">Something else here</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Promo</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Tentang Toko</a>
						</li>
					</ul>
					<div class="d-flex">
						<button class="btn btn-outline-dark px-4 mx-1">Masuk</button>
						<button class="btn btn-outline-success px-4 mx-1">Daftar</button>
					</div>
				</div>
			</div>
		</nav>
  `
}