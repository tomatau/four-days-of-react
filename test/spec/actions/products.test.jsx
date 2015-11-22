import stubAction from '../../utils/stub-action';
import { products } from 'flux/actions';
import { ProductsSource } from 'flux/sources';
import _ from 'lodash';
const ActionsClass = stubAction(products);

chai.should();

describe('Products Actions', ()=> {
  let instance;
  beforeEach(()=> {
    instance = new ActionsClass();
  });

  afterEach(()=> {
    _.map(instance.spies, s => s.reset());
  });

  ['setProducts', 'startedFetching', 'fetchError'].map(a =>
    it('generates setProducts, startedFetching, fetchError', ()=> {
      const call = instance.generateActions.getCall(0);
      call.args.should.include(a);
    })
  );

  describe('Fetch Products', ()=> {
    beforeEach(()=> {
      sinon.stub(ProductsSource, 'fetch');
    });

    afterEach(()=> {
      ProductsSource.fetch.restore();
    });

    it('calls resolve with a callback offering a promise', async ()=> {
      await instance.fetchProducts();
      instance.alt.resolve.should.have.been.calledOnce;
      const firstArg = instance.alt.resolve.getCall(0).args[0];
      firstArg(() => {}).should.be.an.instanceOf(Promise);
    });

    it('always calls request start', async ()=> {
      await instance.fetchProducts();
      instance.alt.getActions.should.have.been.calledWith('requests');
      instance.spies.start.should.have.been.calledOnce;
    });

    context('When Products Source Rejects', ()=> {
      const error = new Error('test error');
      beforeEach(()=> {
        ProductsSource.fetch.returns(
          Promise.reject(error)
        );
      });

      it('calls fetchError with error', async ()=> {
        await instance.fetchProducts();
        instance.actions.fetchError.should.have.been.calledWith(
          error
        );
      });

      it('always calls request stop', async ()=> {
        await instance.fetchProducts();
        instance.alt.getActions.should.have.been.calledWith('requests');
        instance.spies.stop.should.have.been.calledOnce;
      });
    });

    context('When ProductsSource Resolves', ()=> {
      const productsData = [ '1', '2', '3' ];

      beforeEach(()=> {
        ProductsSource.fetch.returns(
          Promise.resolve(productsData)
        );
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

      it('always calls request stop', async ()=> {
        await instance.fetchProducts();
        instance.alt.getActions.should.have.been.calledWith('requests');
        instance.spies.stop.should.have.been.calledOnce;
      });
    });
  });
});
