import React from 'react';
import { connect } from 'react-redux';

import './cart.css';

class Cart extends React.Component {
  render() {
    return (
      <div>
        <h1 className="cart-title"> Shopping Cart </h1>
        <h2 className="cart-item"> {this.props.lista} </h2>
        <h3> {localStorage.getItem('cart')} </h3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lista: state.cart.items
  };
};


export default connect(
  mapStateToProps
)(Cart);
