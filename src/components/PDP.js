import React, { Component }  from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { fetchProduct, addOrder } from '../actions'
import AddToCartForm from './AddToCartForm';

import './PDP.css';

class PDP extends Component {
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.id);
    }
    // When you click on another product from inside this product page, it doesn't update
    // because componentDidMount is not called. Hence, we need componentDidUpdate to update the product
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchProduct(this.props.match.params.id);
        }
    }

    onAddToCartClicked = (formValues) => {
        console.log("qty: ", formValues);
        this.props.addOrder({...this.props.product, ...formValues});
    }

    render() {
        if(!this.props.product) {
            return <div>Loading...</div>;
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
    return { product: state.products.find(prod => prod.id === parseInt(ownProps.match.params.id)), order: state.order };
}
export default connect(mapStateToProps, { fetchProduct, addOrder })(PDP);