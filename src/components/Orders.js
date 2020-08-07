import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const Orders = () => {
    return <div>Orders</div>
}

const mapStateToProps = (state) => {
    console.log(state);
    const orders = state.firestore.ordered.orders;
    return {
      orders: orders
    };
  };
  export default compose(
    connect(mapStateToProps),
    firestoreConnect((ownProps) => [
      {
        collection: "orders",
        where: ["email", "==", "harry@yahoo.com"]
      },
    ])
  )(Orders);