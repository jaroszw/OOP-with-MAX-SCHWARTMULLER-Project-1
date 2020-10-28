class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ShoppingCart {
  items = [];

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.innerHTML = `<h2>Total \$${1}</h2>`;
    console.log(product);
  }

  render() {
    const cartEl = document.createElement("section");
    cartEl.className = "cart";
    cartEl.innerHTML = `
    <h2>Total \$${0}</h2>
    <button>Order now</button>
    `;
    this.totalOutput = cartEl.querySelector("h2");
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addItemToCart() {
    App.addProductToCart(this.product);
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
    const addItemToCart = prodEl.querySelector("button");
    addItemToCart.addEventListener("click", this.addItemToCart.bind(this));
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
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");

    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();
    this.prodList = new ProductList();
    const prodListEl = this.prodList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
    console.log(this.cart);
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
