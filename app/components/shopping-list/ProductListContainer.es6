import React from 'react';
import { Table } from 'react-bootstrap';
import { mockState } from 'data/mockState';
import * as Product from './Product';

class ProductListContainer extends React.Component {

  render() {
    return (
      <div className='tf-product-list'>
        <h3>{ mockState.productPageTitle }</h3>
        <Product.Table>
          { mockState.products.map(p =>
            <Product.TableRow
              key={ p.id }
              product={ p }
              soldOut={ mockState.isSoldOut(p) }
              canAddToCart={ !mockState.isMaxItemsInCart(p) }
              quantity={ mockState.getQuantity(p) }
              onClickAdd={ (e) => console.log(e) }
            />
          ) }
        </Product.Table>
      </div>
    );
  }
}

export default ProductListContainer;
