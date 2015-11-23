import React from 'react';
import ReactDOM from 'react-dom';
import testerHoc from '../../utils/TesterHoc';
import TestUtils from 'react-addons-test-utils';
import { Title } from 'components/shopping-list/Product';

chai.should();

describe('Product.Title', ()=> {
  it('should be a function', ()=> {
    Title.should.be.a('function');
  });

  let node;
  let instance;
  beforeEach(()=> {
    node = window.document.createElement('div');
  });

  it('should render', ()=> {
    instance = ReactDOM.render(testerHoc(<Title />), node);
    const el = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'tf-product-list__product_title'
    );
    el.should.exist;
  });

  it('should render children', ()=> {
    const child = <span className='test-child' />;
    instance = ReactDOM.render(
      testerHoc(<Title product={ { title: child } } />),
      node
    );
    const el = TestUtils.findRenderedDOMComponentWithClass(
      instance, 'test-child'
    );
    el.should.exist;
  });

  it('shouldnt contain sold out when not sold out', ()=> {
    ReactDOM.render(
      testerHoc(<Title />), node
    );
    node.innerHTML.should.not.contain('Sold out');
  });

  it('should render sold out when sold out', ()=> {
    ReactDOM.render(
      testerHoc(<Title soldOut />), node
    );
    node.innerHTML.should.contain('Sold out');
  });

  it('should pass props through', ()=> {
    instance = ReactDOM.render(
      testerHoc(<Title role='test' />), node
    );
    TestUtils.findRenderedDOMComponentWithClass(
      instance, 'tf-product-list__product_title'
    );
    node.innerHTML.should.contain('role="test"');
  });
});
