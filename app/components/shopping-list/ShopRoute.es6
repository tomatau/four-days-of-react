import React from 'react';
import { Grid, Col } from 'react-bootstrap';
import ProductListContainer from './ProductListContainer';
import CartContainer from './CartContainer';

class ShopRoute extends React.Component {
  render() {
    return (
      <Grid>
        <Col sm={ 8 }>
          <ProductListContainer />
        </Col>
        <Col sm={ 4 }>
          <CartContainer />
        </Col>
      </Grid>
    );
  }
}

export default ShopRoute;
