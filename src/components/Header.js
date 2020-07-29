import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'
import MiniCart from './MiniCart';

export default () => {
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
                <div className="right item">
                    <div className="ui inverted button">Log in</div>
                    <MiniCart />
                </div>
            </div>
        </nav>
    );
}
