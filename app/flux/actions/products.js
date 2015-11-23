import { ProductsSource } from 'flux/sources';

class ProductActions {
  constructor() {
    this.generateActions(
      'startedFetching', 'setProducts', 'fetchError'
    );
  }

  async fetchProducts() {
    this.alt.resolve(async (done) => {
      try {
        this.actions.startedFetching();
        this.alt.getActions('requests').start();
        const products = await ProductsSource.fetch();
        this.actions.setProducts(products);
      } catch (error) {
        this.actions.fetchError(error);
      }
      this.alt.getActions('requests').stop();
      return done();
    });
  }
}

export default ProductActions;
