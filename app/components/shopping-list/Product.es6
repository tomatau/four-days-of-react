import React, { PropTypes } from 'react';
import { IntlMixin } from 'react-intl';
import { Label, Badge, Button, Table as BsTable } from 'react-bootstrap';

export const Title = ({ product = {}, soldOut, ...props }) =>
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

export const AddToCartButton = ({ disabled, onClick, children, ...props }) =>
  <Button
    bsSize='xsmall'
    disabled={ disabled }
    onClick={ onClick }
    title={ children }
    children={ children }
    { ...props }
  />;

export const Row = ({ ...props }) =>
  <tr className='tf-product-list__product' { ...props } />;

export class Table extends React.Component {

  static contextTypes = {
    messages: PropTypes.object.isRequired
  };

  static propTypes = {
    children: PropTypes.any
  };

  i18n = IntlMixin.getIntlMessage;

  render() {
    const { children, ...props } = this.props;
    return (
      <BsTable bordered striped condensed
        className='tf-product-list__table'
        { ...props }>
        <thead className='tf-product-list__table-head'>
          <tr>
            <th>{ this.i18n('products.listHeaders.name') }</th>
            <th>{ this.i18n('products.listHeaders.price') }</th>
            <th>{ this.i18n('products.listHeaders.quantity') }</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { children }
        </tbody>
      </BsTable>
    );
  }
}

export class TableRow extends React.Component {

  static contextTypes = {
    messages: PropTypes.object.isRequired
  };

  i18n = IntlMixin.getIntlMessage;

  static propTypes = {
    product: PropTypes.object,
    soldOut: PropTypes.bool,
    canAddToCart: PropTypes.bool,
    quantity: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number
    ]),
    onClickAdd: PropTypes.func
  };

  static defaultProps = {
    product: {}
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
            children={ this.i18n('products.addToCartButton') }
          />
        </td>
      </Row>
    );
  }
}
