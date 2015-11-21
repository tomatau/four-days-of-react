import stubAction from '../../utils/stub-action';
import { products } from 'flux/actions';
import { ProductsSource } from 'flux/sources';
const ActionsClass = stubAction(products);

chai.should();

describe('Products Actions', ()=> {
  let instance;
  beforeEach(()=> {
    instance = new ActionsClass();
  });

  it('generates setProducts, startedFetching, fetchError', ()=> {
    const call = instance.generateActions.getCall(0);
    ['setProducts', 'startedFetching', 'fetchError'].map(a =>
      call.args.should.include(a)
    );
  });

  describe('Fetch Products', ()=> {
    context('When Products Source Rejects', ()=> {
      const error = new Error('test error');

      beforeEach(()=> {
        sinon.stub(ProductsSource, 'fetch').returns(
          Promise.reject(error)
        );
      });

      afterEach(()=> {
        ProductsSource.fetch.restore();
      });

      it('calls fetchError with error', async ()=> {
        await instance.fetchProducts();
        instance.actions.fetchError.should.have.been.calledWith(
          error
        );
      });
    });

    context('When ProductsSource Resolves', ()=> {
      const productsData = [ '1', '2', '3' ];

      beforeEach(()=> {
        sinon.stub(ProductsSource, 'fetch').returns(
          Promise.resolve(productsData)
        );
      });

      afterEach(()=> {
        ProductsSource.fetch.restore();
      });

      it('calls startedFetching', async ()=> {
        await instance.fetchProducts();
        instance.actions.startedFetching.should.have.been.calledOnce;
      });

      it('calls fetch on the data source', async ()=> {
        await instance.fetchProducts();
        ProductsSource.fetch.should.have.been.calledOnce;
      });

      it('calls setProducts with productsData', async ()=> {
        await instance.fetchProducts();
        instance.actions.setProducts.should.have.been.calledWith(productsData
        );
      });
    });
  });
});
