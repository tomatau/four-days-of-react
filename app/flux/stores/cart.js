import { filter, get, reduce } from 'lodash';

class CartStore {
  constructor() {
    this.products = {};
    this.bindActions(this.alt.getActions('cart'));
    this.exportPublicMethods({
      cartIsEmpty: ::this.cartIsEmpty,
      getQuantity: ::this.getQuantity,
      isMaxItemsInCart: ::this.isMaxItemsInCart,
      getTotalPrice: ::this.getTotalPrice
    });
  }

  addProductToCart(product) {
    const quantity = this.getQuantity(product);
    this.products[product.id] = quantity ? quantity + 1 : 1;
  }

  cartIsEmpty() {
    return !filter(this.products, q => q > 0).length;
  }

  getQuantity(product) {
    return get(this, `products.${product.id}`);
  }

  isMaxItemsInCart(product) {
    return this.getQuantity(product) >= product.inventory;
  }

  getTotalPrice() {
    const ProductStore = this.alt.getStore('products');
    return reduce(
      this.products, (total, quantity, id) => {
        const product = ProductStore.getProductById(id) || {};
        return total + (product.price * quantity);
      }, 0
    );
  }
}

export default CartStore;
