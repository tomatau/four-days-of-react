
export default function stubStore(storeClass) {
  Object.assign(storeClass.prototype, {
    bindActions: sinon.spy(),
    exportPublicMethods: sinon.spy(),
    alt: {
      getActions: sinon.stub()
    }
  });
  return storeClass;
}
