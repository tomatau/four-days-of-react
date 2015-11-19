import { findWhere } from 'lodash';

class ProductsStore {

  static isSoldOut = (product) => product.inventory < 1;

  constructor() {
    this.productList = [];
    this.isPending = false;
    this.bindActions(this.alt.getActions('products'));
    this.exportPublicMethods({
      getProductById: ::this.getProductById
    });
  }

  startedFetching() {
    this.isPending = true;
  }

  setProducts(products) {
    this.productList = products;
    this.isPending = false;
  }

  getProductById(id) {
    return findWhere(this.productList, { id: String(id) });
  }
}

export default ProductsStore;
