import React from 'react';
import { connect } from 'react-redux'; 
import { selectModal, closeModal } from '../actions/modalActions';

class OrderDetails extends React.Component {
    render() {
        return (
            <>
                {/* TODO: Open Modal for order */}
                <button className="ui button icon">View Order</button>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return { modal: state.modal };
}
export default connect(mapStateToProps, { selectModal, closeModal })(OrderDetails);