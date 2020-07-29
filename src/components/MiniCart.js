import React from 'react';
import CartModal from './CartModal';

class MiniCart extends React.Component {
    state = { showModal: false };

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
        console.log(this.state.showModal);
    }

    checkout() {
        console.log('Checkout clicked');
    }

    cancel = () => {
        this.setState({ showModal: false });
    }

    renderActions() {
        return (
            <>
                <div className="ui button red" onClick={this.checkout}>
                    Checkout
                </div>
                <div className="ui button cancel" onClick={this.cancel}>
                    Cancel
                </div>
            </>
        );
    }
    render() {
        return (
            <>
                <button className="ui inverted button icon" onClick={this.toggleModal}><i className="shopping cart icon"></i></button>
                <CartModal title="Shoppping Cart" content={`Show me the money`} actions={this.renderActions()} onDismiss={this.cancel} active={this.state.showModal}/>
            </>
        );
    }
}

export default MiniCart;