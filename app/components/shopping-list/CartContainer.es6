import React, { PropTypes } from 'react';
import { map, get } from 'lodash';
import { ListGroup } from 'react-bootstrap';
import * as Cart from './Cart';
import connect from 'connect-alt';

@connect(state => {
  return {
    cartProducts: get(state, 'cart.products')
  };
})
class CartContainer extends React.Component {

  static contextTypes = { flux: PropTypes.object.isRequired };

  static propTypes = {
    cartProducts: PropTypes.object
  };

  static defaultProps = {
    cartProducts: {}
  };

  render() {
    const { cartProducts } = this.props;
    const CartStore = this.context.flux.getStore('cart');
    const ProductsStore = this.context.flux.getStore('products');
    return (
      <div className='tf-cart'>
        <h3>{ 'Cart' }</h3>
        <ListGroup>
          { map(cartProducts, (quantity, id) =>
            (quantity > 0) ? (
              <Cart.ListItem
                key={ id }
                quantity={ quantity }
                product={ ProductsStore.getProductById(id) }
              />
            ) : null
          ) }
        </ListGroup>
        <Cart.Footer
          cartIsEmpty={ CartStore.cartIsEmpty() }
          totalPrice={ CartStore.getTotalPrice() }
          onClickCheckout={ (e) => console.log(e) }
        />
      </div>
    );
  }
}

export default CartContainer;
