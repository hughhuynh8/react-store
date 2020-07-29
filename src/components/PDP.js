import React, { Component }  from 'react';
import { connect } from 'react-redux'; 
import { fetchProduct } from '../actions'
import './PDP.css';

class PDP extends Component {
    state = {};
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.id);
    }

    // For when you click on another product from inside the product page
    // because it needs to get the new product but the componentDidMount is not called, we need componentDidUpdate
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                id: this.props.match.params.id
            });
            this.props.fetchProduct(this.props.match.params.id);
        }
    }
    render() {
        if(!this.props.product) {
            return <div>Loading...</div>;
        }
        return (
            <div className="ui container pdp">
                <h2 className="header">{this.props.product.title}</h2>
                <div className="ui two column stackable grid">
                    <div className="column">
                        <div className="ui segment">
                            <div className="ui fluid image">
                                <img src={this.props.product.image} alt={this.props.product.title}/>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui">
                            <div className="content">
                                <div className="price">${this.props.product.price.toFixed(2)}</div>
                                <div className="actions">
                                    <div className="ui left floated quantity menu">
                                        <button className="icon item" data-content="add">
                                            <i className="minus icon"></i>
                                        </button>
                                        <input type="text" className="item" name="quantity" placeholder="0"/>
                                        <button className="icon item" data-content="subtract">
                                            <i className="plus icon"></i>
                                        </button>
                                    </div>
                                    <div className="ui floating primary large button">Add to cart</div>
                                </div>
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
    return { product: state.products.find(prod => prod.id === parseInt(ownProps.match.params.id)) };
}
export default connect(mapStateToProps, { fetchProduct })(PDP);