import React from 'react';
import Modal from './widgets/modal/Modal';
import { connect } from 'react-redux'; 
import { deleteOrder, clearOrders, clearMessage, sendOrders } from '../actions/orderActions';
import { selectModal, closeModal } from '../actions/modalActions';
import { CART_MODAL } from './widgets/modal/modalTypes';

import './MiniCart.css';

const MiniCartItem = (props) => {
    return (
        <tr key={props.prod.id}>
            <td>
                <img src={props.prod.image} className="ui small image" alt={props.prod.name} />
            </td>
            <td>
                {props.prod.name}
            </td>
            <td>
                {props.prod.quantity}
            </td>
            <td className="right aligned price">
                ${props.prod.price.toFixed(2)}
            </td>
            <td className="action right aligned">
                <i className="times circle icon large ui red btn" onClick={props.deleteAction}></i>
            </td>
        </tr>
    );
}

class MiniCart extends React.Component {

    toggleModal = () => {
        if(this.props.modal.selectedModal === CART_MODAL) {
            this.props.closeModal();
        }
        else {
            this.props.selectModal(CART_MODAL);
        }
    }

    checkout = () => {
        this.props.sendOrders(this.props.order);
    }

    cancel = () => {
        this.props.closeModal();
        // After showing Successful checkout, we need to clear the order and message so that next time cart is opened, we can show the products
        if(this.props.order.hasResponse && this.props.order.isSuccess) {
            this.props.clearOrders();
        }
        else if(this.props.order.hasResponse && !this.props.order.isSuccess) {
            this.props.clearMessage();
        }
    }

    renderCart() {
        // Handle success and error messages
        if(this.props.order.hasResponse){
            if(this.props.order.isSuccess){
                return (
                    <div className="ui positive message">
                        <div className="header">
                        {this.props.order.message}
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className="ui negative message">
                        <div className="header">
                            {this.props.order.message}
                        </div>
                    </div>
                )
            }
        }
        // Handle empty cart
        else if(this.props.order.products.length === 0){
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
                        {this.props.order.products.map( prod => <MiniCartItem prod={prod} deleteAction={() => this.props.deleteOrder(prod.id)} key={prod.id}/> )}
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
                {/* show modal when the modal name == cart modal */}
                {this.props.modal.selectedModal === CART_MODAL &&
                    <Modal title="Shoppping Cart" content={this.renderCart()} actions={this.renderActions()} onDismiss={this.cancel} />
                }
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return { order: state.order, modal: state.modal };
}
export default connect(mapStateToProps, { deleteOrder, clearOrders, clearMessage, sendOrders, selectModal, closeModal })(MiniCart);