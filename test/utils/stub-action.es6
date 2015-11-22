import _ from 'lodash';

export default function stubAction(actionClass) {
  const spies = {
    start: sinon.spy(),
    stop: sinon.spy()
  };
  const done = () => {};
  Object.assign(actionClass.prototype, {
    spies,
    generateActions: sinon.spy(function(...actions) {
      this.actions = _.zipObject(actions, actions.map(() => sinon.spy()));
    }),
    alt: {
      getActions: sinon.stub().returns(spies),
      resolve: sinon.spy((promise) => Promise.resolve(promise(done)))
    }
  });
  return actionClass;
}
