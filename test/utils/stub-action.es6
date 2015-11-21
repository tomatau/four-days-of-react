import _ from 'lodash';

export default function stubAction(actionClass) {
  const spies = {
    start: sinon.spy(),
    success: sinon.spy(),
    fail: sinon.spy()
  };
  Object.assign(actionClass.prototype, {
    spies,
    generateActions: sinon.spy(function(...actions) {
      this.actions = _.zipObject(actions, actions.map(() => sinon.spy()));
    }),
    alt: {
      getActions: sinon.stub().returns(spies),
      resolve: (promise) => Promise.resolve(promise)
    }
  });
  return actionClass;
}
