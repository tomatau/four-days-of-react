import React, { Component } from 'react';
import flux from 'flux';

export default function hasCartItems(ChildComponent) {
  class HasCartItemsComponent extends Component {

    static onEnter(next, redirect) {
      if (flux.getStore('cart').cartIsEmpty()) {
        redirect({}, '/shop');
      }
    }

    render() {
      return <ChildComponent {...this.props} {...this.state} />;
    }
  }

  return HasCartItemsComponent;
}
