import React from 'react';
import * as Product from './Product';
import { ListGroupItem, Button } from 'react-bootstrap';

export const Footer = ({ cartIsEmpty, totalPrice, onClickCheckout, ...props }) =>
  <div className='tf-cart__footer' { ...props }>
    <span className='text-warning'>
      { cartIsEmpty && 'Please add some products to the cart.' }
    </span>
    <p>Total: &#36;{ totalPrice }</p>
    <Button
      onClick={ onClickCheckout }
      disabled={ cartIsEmpty }>
      Checkout
    </Button>
  </div>;

const styles = {
  productQuantity: {
    float: 'right'
  }
};

export const ListItem = ({ quantity, product, ...props }) =>
  <ListGroupItem { ...props }>
    <Product.Quantity
      quantity={ quantity }
      style={ styles.productQuantity }
    />
    <Product.Title
      product={ product }
    />
  </ListGroupItem>;
