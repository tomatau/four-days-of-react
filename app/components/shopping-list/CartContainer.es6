import React from 'react';
import { map } from 'lodash';
import { mockState } from 'data/mockState';
import { ListGroup } from 'react-bootstrap';
import * as Cart from './Cart';

class CartContainer extends React.Component {
  render() {
    return (
      <div className='tf-cart'>
        <h3>{ mockState.cartPageTitle }</h3>
        <ListGroup>
          { map(mockState.cart.products, (quantity, id) =>
            (quantity > 0) ? (
              <Cart.ListItem
                key={ id }
                quantity={ quantity }
                product={ mockState.getProductById(id) }
              />
            ) : null
          ) }
        </ListGroup>
        <Cart.Footer
          cartIsEmpty={ mockState.cartIsEmpty() }
          totalPrice={ mockState.getTotalPrice() }
          onClickCheckout={ (e) => console.log(e) }
        />
      </div>
    );
  }
}

export default CartContainer;
