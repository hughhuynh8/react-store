import React from 'react';
import { connect } from 'react-redux'; 
import { fetchProducts } from '../actions/productActions'
import { Link } from 'react-router-dom';
import Loading from './widgets/Loading';

import './Home.css';

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    renderList() {
        // return the contents of map()
        return this.props.products.map(product => {
            return (
                <Link to={`/product/${product.id}`} className="sixteen wide mobile seven wide tablet four wide computer column" key={product.id}>
                    <div className="ui card">
                        <div className="image">
                            <img src={product.image} alt={product.name}/>
                        </div>
                        <div className="content">
                            <h4 className="header">{product.name}</h4>
                            <div className="description">{product.description}</div>
                        </div>
                        <div className="extra content">
                            <div className="price">${product.price.toFixed(2)}</div>
                        </div>
                    </div>
                </Link>
            )
        });
    }

    render() {
        // offline (TODO: separate this into a separate Component)
        if(!navigator.onLine) {
            return (
                <div>You're offline buddy</div>
            );
        }
        // no products
        if(this.props.products.length === 0) {
            return <Loading />;
        }
        // any error messages?
        const error = this.props.products.find(prod => prod.message !== undefined);
        if(error !== undefined){
            return (
                <div>
                    <h2>Could not get any products</h2>
                    <p>{error.message}</p>
                </div>
            );
        }

        return (
            <div className="ui grid">{this.renderList()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { products: state.products };
}
export default connect(mapStateToProps, { fetchProducts })(Home);