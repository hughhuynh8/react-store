import React, { Component }  from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { fetchProduct, clearProductError } from '../actions/productActions'
import { addOrder } from '../actions/orderActions'
import { selectModal } from '../actions/modalActions'
import { CART_MODAL } from './widgets/modal/modalTypes';
import AddToCartForm from './AddToCartForm';
import Loading from './widgets/Loading';

import './PDP.css';

class PDP extends Component {
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.id);
    }
    // When you click on another product from inside this product page, it doesn't update
    // because componentDidMount is not called. Hence, we also need to update the product when componentDidUpdate
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchProduct(this.props.match.params.id);
        }
    }

    onAddToCartClicked = (formValues) => {
        this.props.addOrder({...this.props.product, ...formValues});
        this.props.selectModal(CART_MODAL);
    }

    componentWillUnmount() {
        this.props.clearProductError();
    }

    render() {
        // if redux product doesn't exist then either it's an error or page is still loading
        if(!this.props.product) {
            if(this.props.error){
                return (
                    <div>
                        <h2>Product does not exist</h2>
                        <p>{this.props.error.message}</p>
                    </div>
                );
            }
            else {
                return <Loading />;
            }
        }
        return (
            <div className="ui container pdp">
                <h2 className="header">{this.props.product.name}</h2>
                <Link to='/product/1'>Product 1</Link>
                <div className="ui two column stackable grid">
                    <div className="column">
                        <div className="ui segment">
                            <div className="ui fluid image">
                                <img src={this.props.product.image} alt={this.props.product.name}/>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui">
                            <div className="content">
                                <div className="price">${this.props.product.price.toFixed(2)}</div>
                                <AddToCartForm onSubmitForm={this.onAddToCartClicked}/>
                                <hr className="divider"/>
                                <div className="description">
                                    <p>{this.props.product.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    if(state.products.length > 0) {
        // set props for product or error message
        const product = state.products.find(prod => prod.id === parseInt(ownProps.match.params.id));    // if state.products has product with our id
        const error = state.products.find(prod => prod.message !== undefined);      // if state.products has an error message
        if(product !== undefined) {
            return { product, order: state.order };
        }
        if(error !== undefined) {
            return { order: state.order, error };
        }
    }
    return { order: state.order };
}

export default connect(mapStateToProps, { fetchProduct, clearProductError, addOrder, selectModal })(PDP);