import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions/authenticationActions';

class Authentication extends Component {

    componentDidMount() {
        // this.props.signIn();
    }

    render() {
        // if(this.props.authentication.isSignedIn === null){
        //     return <div>Signing in...</div>;
        // }
        if(this.props.authentication.isSignedIn){
            return (
                <>
                    <span>Logged in: {this.props.authentication.userName}</span>
                    <button className="ui inverted button" onClick={this.props.signOut}>Sign Out</button>
                </>
            )
        }
        return (
            <button className="ui inverted button" onClick={this.props.signIn}>Log in</button>
        );
    }
}

// mapStateToProps
const mapStateToProps = (state) => {
    return { authentication: state.authentication }; 
}

export default connect(mapStateToProps, {signIn, signOut})(Authentication);