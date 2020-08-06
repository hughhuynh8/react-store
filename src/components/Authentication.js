import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class Authentication extends Component {

    componentDidMount() {
        this.props.signIn({userName: "Harry Styles", email: "harry@yahoo.com"});
    }

    login(){
        console.log('login');
    }

    logout() {
        console.log('logout');
    }

    render() {
        if(this.props.authentication.isSignedIn){
            return (
                <>
                    <span>Logged in: {this.props.authentication.userName}</span>
                    <button className="ui inverted button" onClick={this.logout}>Sign Out</button>
                </>
            )
        }
        return (
            <button className="ui inverted button" onClick={this.login}>Log in</button>
        );
    }
}

// mapStateToProps
const mapStateToProps = (state) => {
    return { authentication: state.authentication }; 
}

export default connect(mapStateToProps, {signIn, signOut})(Authentication);