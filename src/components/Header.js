import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'
import { connect } from 'react-redux';
import Authentication from './Authentication';
import MiniCart from './MiniCart';

class Header extends React.Component {
    state = {isNavOpen: false};

    closeMobileNav = () => {
        document.querySelector('#mobileNav').classList.remove('uncover', 'visible');
        document.querySelector('#pusher').classList.remove('dimmed');
        this.setState({isNavOpen: false});
    }
    openMobileNav = () => {
        document.querySelector('#mobileNav').classList.add('uncover', 'visible');
        document.querySelector('#pusher').classList.add('dimmed');
        this.setState({isNavOpen: true});
    }

    toggleMobileNav = () => {
        if(!this.state.isNavOpen) {
            this.openMobileNav();
        }
        else {
            this.closeMobileNav();
        }
    }
    renderMenuLinks = () => {
        return (
            <>
                <NavLink exact activeClassName="active" to="/" className="header item desktop" onClick={this.closeMobileNav}>
                    <img className="logo mobile hidden" src="/images/logo.png" alt="logo" />
                    Homepage
                </NavLink>
                <NavLink activeClassName="active" to="/about" className="item desktop" onClick={this.closeMobileNav}>
                    About
                </NavLink>
                {this.props.authentication.isSignedIn &&
                    <NavLink activeClassName="active" to="/orders" className="item" onClick={this.closeMobileNav}>
                        Orders
                    </NavLink>
                }
            </>
        );
    }
    render() {
        return (
            <>
                {/* Sidebar menu */}
                <div className="ui vertical inverted sidebar menu left" id="mobileNav">
                    {this.renderMenuLinks()}
                </div>
                {/* Following menu */}
                <nav className="ui fixed inverted menu my-menu">
                    <div className="ui container">
                        <div className="toc item" id="mobileNavButton" onClick={this.toggleMobileNav}>
                            <i className="sidebar icon"></i>
                        </div>
                        
                        {this.renderMenuLinks()}
                        <div className="right item">
                            <Authentication />
                            <MiniCart />
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}

// mapStateToProps
const mapStateToProps = (state) => {
    return { authentication: state.authentication }; 
}

export default connect(mapStateToProps)(Header);