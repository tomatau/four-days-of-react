import _ from 'lodash';

export default function stubAction(actionClass) {
  const done = sinon.spy();
  const spies = {
    start: sinon.spy(),
    stop: sinon.spy()
  };
  Object.assign(actionClass.prototype, {
    done,
    spies,
    generateActions: sinon.spy(function(...actions) {
      this.actions = _.zipObject(
        actions,
        actions.map(() => sinon.spy())
      );
    }),
    alt: {
      resolve: sinon.spy(callback => Promise.resolve(callback(done))),
      getActions: sinon.stub().returns(spies)
    }
  });
  return actionClass;
}
