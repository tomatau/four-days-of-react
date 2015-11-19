import React, { PropTypes } from 'react';
import { Label, Badge, Button, Table as BsTable } from 'react-bootstrap';

export const Title = ({ product, soldOut, ...props }) =>
  <h5 style={ { margin: 0 } }
    className='tf-product-list__product_title'
    { ...props }>
    { product.title }
    &nbsp;
    { soldOut && <Label>Sold out</Label> }
  </h5>;

export const Price = ({ product, ...props }) =>
  <Badge { ...props }>&#36;{ product.price }</Badge>;

export const Quantity = ({ quantity, ...props }) =>
  <span { ...props }>{ !!quantity && <Badge>{ quantity }</Badge> }</span>;

export const AddToCartButton = ({ disabled, onClick, ...props }) =>
  <Button
    bsSize='xsmall'
    disabled={ disabled }
    onClick={ onClick }
    { ...props }>
    Add To Cart
  </Button>;

export const Row = ({ ...props }) =>
  <tr className='tf-product-list__product' { ...props } />;

export const Table = ({ children, ...props }) =>
  <BsTable bordered striped condensed
    className='tf-product-list__table'
    { ...props }>
    <thead className='tf-product-list__table-head'>
      <tr>
        <th>Product Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      { children }
    </tbody>
  </BsTable>;

export class TableRow extends React.Component {

  static propTypes = {
    product: PropTypes.object,
    soldOut: PropTypes.bool,
    canAddToCart: PropTypes.bool,
    quantity: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number
    ]),
    onClickAdd: PropTypes.func
  };

  render() {
    const { product, soldOut, canAddToCart, quantity, onClickAdd } = this.props;
    return (
      <Row>
        <td>
          <Title
            product={ product }
            soldOut={ soldOut }
          />
        </td>
        <td>
          <Price
            product={ product }
          />
        </td>
        <td>
          <Quantity
            quantity={ quantity }
          />
        </td>
        <td>
          <AddToCartButton
            disabled={ soldOut || !canAddToCart }
            onClick={ onClickAdd }
          />
        </td>
      </Row>
    );
  }
}
