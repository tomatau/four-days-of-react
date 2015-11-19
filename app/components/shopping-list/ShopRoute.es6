import React, { PropTypes } from 'react';
import { Grid, Col } from 'react-bootstrap';
import ProductListContainer from './ProductListContainer';
import CartContainer from './CartContainer';

class ShopRoute extends React.Component {

  static contextTypes = { flux: PropTypes.object.isRequired };

  componentDidMount() {
    const { flux } = this.context;
    flux.getActions('products').fetchProducts();
  }

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
