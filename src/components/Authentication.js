import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

const auth = window.firebase.auth();
const provider = new window.firebase.auth.GoogleAuthProvider();

class Authentication extends Component {
    state = {userName: null};

    componentDidMount() {
        auth.onAuthStateChanged(
            user => {
                if(user) {
                    console.log('user logged in: ', user);
                    this.setState({userName: user.displayName});
                    this.props.signIn(user.uid);
                }
                else {
                    console.log('user logged out');
                    this.props.signOut();
                }
            }, 
            error => {
                console.log(error);
            }
        );
    }

    login(){
        // This will open a Google Popup with sign in details
        auth.signInWithPopup(provider);
    }

    logout() {
        auth.signOut()
            .then(() => {
                // Signout successful
            })
            .catch((error) => {
                // error occurred
                console.log(error);
            });
    }

    render() {
        if(this.props.authentication.isSignedIn){
            return (
                <>
                    <span>Logged in: {this.state.userName}</span>
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