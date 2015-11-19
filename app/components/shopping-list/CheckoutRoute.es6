import React from 'react';
import { Grid, Col } from 'react-bootstrap';
import hasCartItems from 'components/shared/has-cart-items';

@hasCartItems
class CheckoutRoute extends React.Component {

  render() {
    return (
      <Grid>
        <Col sm={ 12 }>
          Checkout
        </Col>
      </Grid>
    );
  }
}

export default CheckoutRoute;
