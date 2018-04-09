import React from 'react';
import { connect } from 'react-redux';
import logo from '../logo.svg';
import { increment, decrement } from '../actions.js';

class Button extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayed: false,
    };
  }

  render() {
    return (<div>
      <button id="firstButton" onClick={() => {
        if (!this.state.displayed) {
          const img = document.createElement('img');
          img.id = 'logo';
          img.src = logo;
          document.body.appendChild(img);
          this.setState({ displayed: true });
          const button = document.getElementById('firstButton');
          button.innerHTML = 'GOODBYE';
        } else {
          const img = document.getElementById('logo');
          img.remove();
          this.setState({ displayed: false });
          const button = document.getElementById('firstButton');
          button.innerHTML = 'HELLO';
        }
      }}
      >
      HELLO
      </button>
      <button id="secondButton" onClick={() => {
        this.props.dispatch(increment());
      }}
      >
      Increment
      </button>
      <button id="thirdButton" onClick={() => {
        this.props.dispatch(decrement());
      }}
      >
      Decrement
      </button>
    </div>);
  }
}



export default connect()(Button);
