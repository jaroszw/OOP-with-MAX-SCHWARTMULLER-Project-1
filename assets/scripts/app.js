class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
      <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}">
          <div class="product-item__content">
              <h2>${this.product.title}</h2>
              <h3>\$${this.product.price}</h3>
              <p>${this.product.description}</p>
              <button>Add to Cart</button>
          </div>
      </div>
    `;
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      "A Monitor",
      "https://allegro.stati.pl/AllegroIMG/PRODUCENCI/ACER/EK220QABI/Acer_EK220QABI_1.jpg",
      399,
      "Full HD Panoramic screen"
    ),
    new Product(
      "A second Monitor",
      "https://www.delkom.pl/pictures/p0/u7/63484-481340-product_original-monitor-acer-v277ubmiipx-umhv7ee010.jpg",
      499,
      "Yet another monitor in Full HD"
    ),
  ];

  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  }
}

const prodList = new ProductList();
prodList.render();
