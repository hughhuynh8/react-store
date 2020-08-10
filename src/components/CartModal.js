import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 

class CartModal extends React.Component {
    render() {
        let classes = '';
        if(this.props.cartModal.isCartOpen) {
            classes = "visible active";
        }
        return ReactDOM.createPortal(
            <div className={`ui dimmer modals ${classes}`} onClick={this.props.onDismiss}>
                <div className={`ui standard modal ${classes}`} onClick={(e) => e.stopPropagation()}>
                    <div className="header">{this.props.title}</div>
                    <div className="content">{this.props.content}</div>
                    <div className="actions">{this.props.actions}</div>
                </div>
            </div>,
            document.querySelector('#modal')
        );
    }
 
}

const mapStateToProps = (state) => {
    return { cartModal: state.cartModal };
}
export default connect(mapStateToProps)(CartModal);
