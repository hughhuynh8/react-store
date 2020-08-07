import React from 'react';
import OrderItem from './OrderItem';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Loading from './Loading';

const Orders = ({orders}) => {
  if(orders == undefined){
    return <Loading />;;
  }
  return (
    <div class="ui grid">
      <div class="ten wide column">
        <table className="ui table cart">
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
    console.log(state);
    return {
      orders: state.firestore.ordered.orders
    };
  };
  export default compose(
    connect(mapStateToProps),
    firestoreConnect((ownProps) => [
      {
        collection: "orders",
        where: ["email", "==", "harry@yahoo.com"],
        orderBy: ["date", "desc"],
      },
    ])
  )(Orders);