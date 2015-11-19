import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import { get } from 'lodash';
import * as Product from './Product';
import connect from 'connect-alt';
import { IntlMixin } from 'react-intl';

@connect(state => {
  return {
    productList: get(state, 'products.productList'),
    isPending: get(state, 'products.isPending')
  };
})
class ProductListContainer extends React.Component {

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  };

  static propTypes = {
    productList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.any
      })
    ),
    isPending: PropTypes.bool
  };

  static defaultProps = {
    productList: []
  };

  i18n = IntlMixin.getIntlMessage;

  render() {
    return (
      <div className='tf-product-list'>
        <h3>{ this.i18n('products.pageTitle') }</h3>
        { this.props.isPending ? 'Loading....' : this.renderNotLoading() }
      </div>
    );
  }

  renderNotLoading() {
    return this.props.productList.length ? this.renderProducts() : this.renderEmpty();
  }

  renderProducts() {
    const ProductStore = this.context.flux.getStore('products');
    const CartStore = this.context.flux.getStore('cart');
    return (
      <Product.Table>
        { this.props.productList.map(p =>
          <Product.TableRow
            key={ p.id }
            product={ p }
            soldOut={ ProductStore.isSoldOut(p) }
            canAddToCart={ !CartStore.isMaxItemsInCart(p) }
            quantity={ CartStore.getQuantity(p) }
            onClickAdd={ () => this.handleAddToCartClick(p) }
          />
        ) }
      </Product.Table>
    );
  }

  handleAddToCartClick(product) {
    this.context.flux.getActions('cart').addProductToCart(product);
  }

  renderEmpty() {
    return <span>No products to display!</span>;
  }
}

export default ProductListContainer;
