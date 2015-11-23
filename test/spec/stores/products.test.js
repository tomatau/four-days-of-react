import _ from 'lodash';
import { products as ExportedStore } from 'flux/stores';
import stubStore from '../../utils/stub-store';

chai.should();

function getExportObject(instance) {
  return instance.exportPublicMethods.getCall(0).args[0];
}

describe('Products Store', ()=> {
  let instance;
  let ProductsStore;
  beforeEach(()=> {
    ProductsStore = stubStore(ExportedStore);
  });

  it('provides isSoldOut function', ()=> {
    const soldOutProduct = { inventory: 0 };
    const inStockProduct = { inventory: 1 };
    const inStockProduct2 = { inventory: 99 };
    ExportedStore.isSoldOut(soldOutProduct).should.be.true;
    ExportedStore.isSoldOut(inStockProduct).should.be.false;
    ExportedStore.isSoldOut(inStockProduct2).should.be.false;
  });

  it('creates an empty productList array', ()=> {
    instance = new ProductsStore();
    instance.productList.should.be.an('array').with.length(0);
  });

  it('sets isPending to false', ()=> {
    instance = new ProductsStore();
    instance.isPending.should.be.false;
  });

  it('calls alt.getActions with "products"', ()=> {
    instance = new ProductsStore();
    instance.alt.getActions.should.have.been.calledWith('products');
  });

  it('calls bindActions with result from getActions', ()=> {
    const testReturn = {};
    ProductsStore.prototype.alt.getActions.returns(testReturn);
    instance = new ProductsStore();
    instance.bindActions.should.have.been.calledWith(testReturn);
  });

  it('exports getProductById through export API', ()=> {
    sinon.spy(ProductsStore.prototype, 'getProductById');
    instance = new ProductsStore();
    const exportObject = getExportObject(instance);
    const dummyValue = {};
    exportObject.getProductById(dummyValue);
    instance.getProductById.should.have.been.calledWith(dummyValue);
  });

  context('When Instantiated', ()=> {
    beforeEach(()=> {
      instance = new ProductsStore();
    });

    describe('Started Fetching', ()=> {
      it('sets isPending to true', ()=> {
        instance.isPending = false;
        instance.startedFetching();
        instance.isPending.should.be.true;
      });
    });

    describe('Set Products', ()=> {
      it('sets isPending to false', ()=> {
        instance.isPending = true;
        instance.setProducts();
        instance.isPending.should.be.false;
      });

      it('sets the productList', ()=> {
        const productList = {};
        instance.setProducts(productList);
        instance.productList.should.equal(productList);
      });
    });

    context('When Populated With Products', ()=> {
      const productList = [
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
        { id: '8' }
      ];
      beforeEach(()=> {
        instance.setProducts(productList);
      });

      describe('Get Product By Id', ()=> {
        /*
          We're testing through exportPublicMethods to ensure correct context
         */
        it('should get the correct product by ID', ()=> {
          const sampleProducts = _.sample(productList, 4);
          const exportObject = getExportObject(instance);
          sampleProducts.forEach(p => {
            exportObject.getProductById(p.id).should.equal(p);
          });
        });
      });
    });
  });
});
