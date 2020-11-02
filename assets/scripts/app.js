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
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }

    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }

    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
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

  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
  }

  orderProducts = () => {
    console.log("Orderign ...");
    console.log(this.items);
  };

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
    <h2>Total \$${0}</h2>
    <button>Order now</button>
    `;
    const orderButton = cartEl.querySelector("button");
    // orderButton.addEventListener("click", () => this.orderProducts());
    orderButton.addEventListener("click", this.orderProducts);
    this.totalOutput = cartEl.querySelector("h2");
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId);
    this.product = product;
    // this.render();
  }

  addItemToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    setTimeout(() => {
      const prodEl = this.createRootElement("li", "product-item");
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
    }, 500);
  }
}

class ProductList extends Component {
  #products = [];

  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.fetchProducts();
  }

  fetchProducts() {
    setTimeout(() => {
      this.#products = [
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
      this.renderProducts();
    }, 500);
  }

  renderProducts() {
    for (const prod of this.#products) {
      new ProductItem(prod, "prod-list");
    }
  }

  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    if (this.#products && this.#products.length > 0) {
      this.renderProducts();
    } else {
      console.log("Fetching delay");
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }

  render() {
    this.cart = new ShoppingCart("app");
    new ProductList("app");
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
