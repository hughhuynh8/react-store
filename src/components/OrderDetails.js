import React from 'react';
import Modal from './widgets/modal/Modal';
import { connect } from 'react-redux'; 
import { selectModal, closeModal } from '../actions/modalActions';
import { ORDER_MODAL } from './widgets/modal/modalTypes';

const OrderDetailRow = (props) => {
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
        </tr>
    );
}

class OrderDetails extends React.Component {

    toggleModal = () => {
        if(this.props.modal.selectedModal === (ORDER_MODAL+this.props.order.id)) {
            this.props.closeModal();
        }
        else {
            this.props.selectModal(ORDER_MODAL+this.props.order.id);
        }
    }

    cancel = () => {
        this.props.closeModal();
    }

    renderOrder() {
        return (
            <div>
                <h4 className="ui header">Order #: {this.props.order.id}</h4>
                <table className="ui table cart">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th className="right aligned">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.order.products.map( prod => <OrderDetailRow prod={prod} key={prod.id}/> )}
                    </tbody>
                    <tfoot>
                        <tr className="total">
                            <th colSpan="3">
                                TOTAL
                            </th>
                            <th className="right aligned price" >
                                ${this.props.order.total.toFixed(2)}
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
                <div className="ui primary basic button cancel" onClick={this.cancel}>
                    Close
                </div>
            </>
        );
    }
    render() {
        return (
            <>
                <button className="ui button primary" onClick={this.toggleModal}>View Details</button>
                {/* show modal when the modal name == order modal */}
                {this.props.modal.selectedModal === (ORDER_MODAL+this.props.order.id) &&
                    <Modal title="Order Details" content={this.renderOrder()} actions={this.renderActions()} onDismiss={this.cancel} />
                }
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return { modal: state.modal };
}
export default connect(mapStateToProps, { selectModal, closeModal })(OrderDetails);