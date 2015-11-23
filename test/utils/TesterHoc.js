import React from 'react';

export default function testerHoc(Component) {
  return React.createElement(
    class Tester extends React.Component {
      displayName = `Tester.${Component.displayName}`;

      render() {
        return (
          <div>{ Component }</div>
        );
      }
    }
  );
}
