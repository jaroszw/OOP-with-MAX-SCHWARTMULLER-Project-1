class Product {
  constructor(title, image, price, desc) {
    this.title = title;
    this.imageUrl = image;
    this.price = price;
    this.description = desc;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }

    if (attributes && attributes.lengthj > 0) {
      for (attr of attributes) {
        rootElement.setAttribut(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
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
    new Product(
      "A Monitor",
      "https://images.samsung.com/is/image/samsung/pl-led-sf350-ls24f350fhuxen-001-front-black-10059415099326?$PD_GALLERY_L_SHOP_JPG$",
      120,
      "Full HD Panoramic screen"
    ),
    new Product(
      "A second Monitor",
      "https://www.mediaexpert.pl/media/cache/gallery/product/1/542/536/783/hhspagcr/images/96/965058/4741.jpg",
      580,
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
  constructor() {
    this.cart = new ShoppingCart();
    this.prodList = new ProductList();
  }

  render() {
    const renderHook = document.getElementById("app");

    const cartEl = this.cart.render();
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
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
