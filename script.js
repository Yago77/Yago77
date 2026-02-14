const products = [
  { name: "Vela de Massagem Sensual", category: "Bem-estar", price: 89.9, desc: "Aroma de baunilha e toque hidratante." },
  { name: "Kit Lingerie Rendado", category: "Moda íntima", price: 129.9, desc: "Conjunto premium com ajuste confortável." },
  { name: "Gel Beijável Morango", category: "Cosméticos", price: 39.9, desc: "Textura suave e sabor adocicado." },
  { name: "Mini Vibrador Recarregável", category: "Eletrônicos", price: 219.9, desc: "Silencioso, compacto e à prova d'água." },
  { name: "Dado de Posições", category: "Jogos", price: 24.9, desc: "Diversão para explorar novas experiências." },
  { name: "Algema de Pelúcia", category: "Acessórios", price: 59.9, desc: "Maciez com fechamento seguro." },
];

const filtersContainer = document.querySelector("#filters");
const productGrid = document.querySelector("#product-grid");

const categories = ["Todos", ...new Set(products.map((product) => product.category))];
let selectedCategory = "Todos";

function formatPrice(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderFilters() {
  filtersContainer.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category;
    button.className = `filter-chip ${selectedCategory === category ? "active" : ""}`;
    button.addEventListener("click", () => {
      selectedCategory = category;
      renderFilters();
      renderProducts();
    });
    filtersContainer.appendChild(button);
  });
}

function renderProducts() {
  const filtered =
    selectedCategory === "Todos"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  productGrid.innerHTML = "";

  filtered.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p class="product-meta">${product.category}</p>
      <p>${product.desc}</p>
      <p class="product-price">${formatPrice(product.price)}</p>
      <button class="btn btn-secondary" type="button">Adicionar ao carrinho</button>
    `;

    productGrid.appendChild(card);
  });
}

function setupAgeGate() {
  const ageGate = document.querySelector("#age-gate");
  const confirmAge = document.querySelector("#confirm-age");
  const denyAge = document.querySelector("#deny-age");
  const ageConfirmed = localStorage.getItem("ageConfirmed") === "true";

  if (ageConfirmed) {
    ageGate.classList.add("hidden");
  }

  confirmAge.addEventListener("click", () => {
    localStorage.setItem("ageConfirmed", "true");
    ageGate.classList.add("hidden");
  });

  denyAge.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });
}

renderFilters();
renderProducts();
setupAgeGate();
