import { products as ExportedAction } from 'flux/actions';
import { ProductsSource } from 'flux/sources';
import stubAction from '../../utils/stub-action';

chai.should();

describe('Products Actions', ()=> {
  let instance;
  beforeEach(()=> {
    const ProductActions = stubAction(ExportedAction);
    instance = new ProductActions();
  });

  ['setProducts', 'startedFetching', 'fetchError'].forEach(name => {
    it(`generate ${name} action creator`, ()=> {
      const firstCall = instance.generateActions.getCall(0);
      firstCall.args.should.include(name);
    });
  });

  describe('Fetch Products', ()=> {
    beforeEach(()=> {
      sinon.stub(ProductsSource, 'fetch');
    });

    afterEach(()=> {
      ProductsSource.fetch.restore();
    });

    it('calls actions started fetching', async (done)=> {
      await instance.fetchProducts();
      instance.actions.startedFetching.should.have.been.calledOnce;
      done();
    });

    it('calls ProductsSource.fetch', async (done)=> {
      await instance.fetchProducts();
      ProductsSource.fetch.should.have.been.calledOnce;
      done();
    });

    it('calls resolve with a promise-callback', async ()=> {
      await instance.fetchProducts();
      instance.alt.resolve.should.have.been.calledOnce;
      const firstArg = instance.alt.resolve.getCall(0).args[0];
      firstArg(()=>{}).should.be.an.instanceOf(Promise);
    });

    it('calls getActions(request).start', async ()=> {
      await instance.fetchProducts();
      instance.alt.getActions.should.have.been.calledWith('requests');
      instance.spies.start.should.have.been.calledOnce;
    });

    context('When ProductsSource.fetch rejects', ()=> {
      const error = new Error('ProductsSource.fetch reject');
      beforeEach(()=> {
        ProductsSource.fetch.returns(
          Promise.reject(error)
        );
      });

      it('calls fetchError with rejected value', async (done)=> {
        await instance.fetchProducts();
        instance.actions.fetchError.should.have.been.calledWith(error);
        done();
      });

      it('calls getActions(request) twice and stop once', async ()=> {
        await instance.fetchProducts();
        instance.alt.getActions.should.have.been.calledTwice;
        instance.spies.stop.should.have.been.calledOnce;
        const secondCallArg = instance.alt.getActions.getCall(1).args[0];
        secondCallArg.should.eql('requests');
        instance.done.should.have.been.calledOnce;
      });
    });

    context('When ProductsSource.fetch resolves Products', ()=> {
      const testProductList = { test: 'products' };
      beforeEach(()=> {
        ProductsSource.fetch.returns(
          Promise.resolve(testProductList)
        );
      });

      it('calls setProducts with resolved value', async (done)=> {
        await instance.fetchProducts();
        instance.actions.setProducts.should.have.been.calledWith(
          testProductList
        );
        done();
      });

      it('calls getActions(request) twice and stop once', async ()=> {
        await instance.fetchProducts();
        instance.alt.getActions.should.have.been.calledTwice;
        instance.spies.stop.should.have.been.calledOnce;
        const secondCallArg = instance.alt.getActions.getCall(1).args[0];
        secondCallArg.should.eql('requests');
        instance.done.should.have.been.calledOnce;
      });
    });
  });
});
