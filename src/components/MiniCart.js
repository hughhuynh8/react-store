import React from 'react';
import CartModal from './CartModal';
import { connect } from 'react-redux'; 
import { deleteOrder, clearOrders, sendOrders, openCart, closeCart } from '../actions';

import './MiniCart.css';

class MiniCart extends React.Component {

    toggleModal = () => {
        if(this.props.cart.isCartOpen) {
            this.props.closeCart();
        }
        else {
            this.props.openCart();
        }
    }

    checkout = () => {
        this.props.sendOrders(this.props.order);
    }

    cancel = () => {
        this.props.closeCart();
    }

    renderItem() {
        return this.props.order.products.map((prod)=>{
            return (
                <tr key={prod.id}>
                    <td>
                        <img src={prod.image} className="ui small image" alt={prod.name} />
                    </td>
                    <td>
                        {prod.name}
                    </td>
                    <td>
                        {prod.quantity}
                    </td>
                    <td className="right aligned price">
                        ${prod.price.toFixed(2)}
                    </td>
                    <td className="action right aligned">
                        <i className="times circle icon large ui red btn" onClick={() => this.props.deleteOrder(prod.id)}></i>
                    </td>
                </tr>
            );
        });
    }

    renderCart() {
        if(this.props.order.products.length === 0){
            return <div>Cart is empty</div>
        }
        return (
            <div>
                <table className="ui table cart">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th className="right aligned">Price</th>
                            <th className="right aligned">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderItem()}
                    </tbody>
                    <tfoot>
                        <tr className="total">
                            <th colSpan="3">
                                TOTAL
                            </th>
                            <th className="right aligned price" >
                                ${this.props.order.total.toFixed(2)}
                            </th>
                            <th className="right aligned">
                                <button type="button" className="ui button basic red" onClick={this.props.clearOrders}>Clear All</button>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
    renderActions() {
        let checkoutButtonClasses = "ui button primary";
        if(this.props.order.products.length === 0){
            checkoutButtonClasses+= " disabled";
        }
        return (
            <>
                <div className="ui primary basic button cancel" onClick={this.cancel}>
                    Continue Shopping
                </div>
                <div className={checkoutButtonClasses} onClick={this.checkout}>
                    Checkout
                </div>
            </>
        );
    }
    render() {
        return (
            <>
                <button className="ui inverted button icon" onClick={this.toggleModal}><i className="shopping cart icon"></i></button>
                <CartModal title="Shoppping Cart" content={this.renderCart()} actions={this.renderActions()} onDismiss={this.cancel} />
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return { order: state.order, cart: state.cart };
}
export default connect(mapStateToProps, { deleteOrder, clearOrders, sendOrders, openCart, closeCart })(MiniCart);