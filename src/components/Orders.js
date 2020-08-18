import React from 'react';
import OrderItem from './OrderItem';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Loading from './Loading';

const Orders = ({orders}) => {
  if(orders === undefined){
    return <Loading />;;
  }
  return (
    <div className="ui grid">
      <div className="twelve wide column">
        <table className="ui table order">
          <thead>
              <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
            {orders.map( order => <OrderItem order={order} key={order.id} /> )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    orders: state.firestore.ordered.orders,
    auth: state.authentication
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect((ownProps) => [
    {
      collection: "orders",
      where: ["email", "==", ownProps.auth.email],
      orderBy: ["date", "desc"],
    },
  ])
)(Orders);