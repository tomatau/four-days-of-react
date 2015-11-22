import stubStore from '../../utils/stub-store';
import { products } from 'flux/stores';
import _ from 'lodash';

chai.should();

describe('Products Store', ()=> {
  let instance;
  let StoreClass;
  beforeEach(()=> {
    StoreClass = stubStore(products);
  });

  it('provides helper method checking item inventory', ()=> {
    const soldOutProduct = { inventory: 0 };
    const inStockProduct = { inventory: 1 };
    const inStockProduct2 = { inventory: 99 };
    StoreClass.isSoldOut(soldOutProduct).should.be.true;
    StoreClass.isSoldOut(inStockProduct).should.be.false;
    StoreClass.isSoldOut(inStockProduct2).should.be.false;
  });

  it('creates an empty productList', ()=> {
    instance = new StoreClass();
    instance.productList.should.be.an('array');
    instance.productList.should.be.empty;
  });

  it('sets isPending to false', ()=> {
    instance = new StoreClass();
    instance.isPending.should.be.false;
  });

  it('invokes getActions with "products" passing to bindActions', ()=> {
    const returnValue = {};
    StoreClass.prototype.alt.getActions.returns(returnValue);
    instance = new StoreClass();
    StoreClass.prototype.alt.getActions.should.have.been.calledWith('products');
    StoreClass.prototype.bindActions.should.have.been.calledWith(returnValue);
    StoreClass.prototype.alt.getActions.reset();
    StoreClass.prototype.bindActions.reset();
  });

  it('exports gerProductById as a public method', ()=> {
    sinon.spy(StoreClass.prototype, 'getProductById');
    instance = new StoreClass();
    StoreClass.prototype.exportPublicMethods.should.have.been.calledOnce;
    const arg = StoreClass.prototype.exportPublicMethods.getCall(0).args[0];
    arg.getProductById('test');
    StoreClass.prototype.getProductById.should.have.been.calledWith('test');
    StoreClass.prototype.exportPublicMethods.reset();
    StoreClass.prototype.getProductById.restore();
  });

  context('When Instance Created', ()=> {
    beforeEach(()=> {
      instance = new StoreClass();
    });

    describe('Start Fetching', ()=> {
      it('sets isPending to true', ()=> {
        instance.startedFetching();
        instance.isPending.should.be.true;
      });
    });

    describe('Set Products', ()=> {
      it('populates the productList and sets isPending false', ()=> {
        const productList = {};
        instance.isPending = true;
        instance.setProducts(productList);
        instance.productList.should.eql(productList);
        instance.isPending.should.be.false;
      });
    });

    context('When ProductList Set', ()=> {
      const productList = [
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' }
      ];
      beforeEach(()=> {
        instance.setProducts(productList);
      });

      describe('Get Product By Id', ()=> {
        it('gets products by their id', ()=> {
          const sampleProducts = _.sample(productList, 3);
          sampleProducts.forEach(p =>
            instance.getProductById(p.id).should.eql(p)
          );
        });
      });
    });
  });
});
