import React from 'react';
import CartModal from './CartModal';
import { connect } from 'react-redux'; 
import { deleteOrder, sendOrders, openCart, closeCart } from '../actions';

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

    checkout() {
        console.log('Checkout clicked');
    }

    cancel = () => {
        this.props.closeCart();
    }

    renderCartProduct() {
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
                    <td className="action">
                        <button type="button" className="ui button red" onClick={() => this.props.deleteOrder(prod.id)}>Delete</button>
                    </td>
                </tr>
            );
        });
    }

    renderEntireCart() {
        return (
            <div>
                <table className="ui table cart">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th className="right aligned">Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCartProduct()}
                    </tbody>
                    <tfoot>
                        <tr className="total">
                            <th colSpan="3">
                                TOTAL
                            </th>
                            <th className="right aligned price" >
                                ${this.props.order.total.toFixed(2)}
                            </th>
                            <th>
                                <button type="button" className="ui button red">Delete All</button>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
    renderActions() {
        return (
            <>
                <div className="ui button cancel" onClick={this.cancel}>
                    Continue Shopping
                </div>
                <div className="ui button primary" onClick={this.checkout}>
                    Checkout
                </div>
            </>
        );
    }
    render() {
        return (
            <>
                <button className="ui inverted button icon" onClick={this.toggleModal}><i className="shopping cart icon"></i></button>
                <CartModal title="Shoppping Cart" content={this.renderEntireCart()} actions={this.renderActions()} onDismiss={this.cancel} />
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return { order: state.order, cart: state.cart };
}
export default connect(mapStateToProps, { deleteOrder, sendOrders, openCart, closeCart })(MiniCart);