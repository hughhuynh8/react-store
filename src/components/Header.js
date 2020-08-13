import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'
import { connect } from 'react-redux';
import Authentication from './Authentication';
import MiniCart from './MiniCart';

class Header extends React.Component {
    renderOrderLink() {
        if(this.props.authentication.isSignedIn){
            return (
                <NavLink activeClassName="active" to="/orders" className="item">
                    Orders
                </NavLink>
            );
        }
    }
    render() {
        return (
            <nav className="ui fixed inverted menu my-menu">
                <div className="ui container">
                    <NavLink exact activeClassName="active" to="/" className="header item">
                        <img className="logo" src="/images/logo.png" alt="logo" />
                        Homepage
                    </NavLink>
                    <NavLink activeClassName="active" to="/about" className="item">
                        About
                    </NavLink>
                    {this.renderOrderLink()}
                    <div className="right item">
                        <Authentication />
                        <MiniCart />
                    </div>
                </div>
            </nav>
        );
    }
}

// mapStateToProps
const mapStateToProps = (state) => {
    return { authentication: state.authentication }; 
}

export default connect(mapStateToProps)(Header);