import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux'; 
import { signInGuest } from '../actions/authenticationActions';
import { clearMessage, sendOrders } from '../actions/orderActions';
import { textInput } from './widgets/forms/FormFields';
import { required, minLength2, maxLength15, alphaNumeric, email } from './widgets/forms/FormValidation';

class Checkout extends React.Component {

    componentWillUnmount() {
        this.props.clearMessage();
    }

    onSubmitGuest = (formValues) => {
        this.props.signInGuest(`${formValues.firstName} ${formValues.lastName}`, formValues.email);
        this.props.sendOrders(this.props.order);
    }

    onSubmitCustomer = () => {
        this.props.sendOrders(this.props.order);
    }


    renderCustomerForm() {
        if(this.props.authentication.isSignedIn) {
            return (
                <div>
                    <h2 className="ui header">Checkout</h2>
                    <p>Username: {this.props.authentication.userName}</p>
                    <p>Email: {this.props.authentication.email}</p>
                    <button type="button" className="ui primary huge button" onClick={this.onSubmitCustomer}>Checkout</button>
                </div>
            );
        }
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmitGuest)}>
                <fieldset>
                    <legend><h2 className="ui header">Guest Checkout</h2></legend>
                    <div className="two fields">
                        <Field
                            name="firstName"
                            component={textInput}
                            label="First Name"
                            placeholder="First Name"
                            validate={[required, maxLength15, minLength2]}
                            warn={alphaNumeric}
                        />
                        <Field
                            name="lastName"
                            component={textInput}
                            label="Last Name"
                            placeholder="Last Name"
                            validate={[required, maxLength15, minLength2]}
                            warn={alphaNumeric}
                        />
                    </div>
                    <div className="field">
                        <Field
                            name="email"
                            component={textInput}
                            label="Email"
                            placeholder="Email"
                            validate={[required, email]}
                        />
                    </div>
                    <button type="submit" className="ui primary huge button">Checkout</button>
                </fieldset>
            </form>
        );
    }

    render() {
        // Handle success and error messages
        if(this.props.order.hasResponse){
            if(this.props.order.isSuccess){
                return (
                    <div className="ui positive message">
                        <div className="header">
                        {this.props.order.message}
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className="ui negative message">
                        <div className="header">
                            {this.props.order.message}
                        </div>
                    </div>
                )
            }
        }
        // Handle empty cart
        else if(this.props.order.products.length === 0){
            return <div>Cart is empty</div>
        }
        return this.renderCustomerForm();
        
    }
}
// initial values for the form using map state to props
const mapStateToProps = (state) => {
    return { order: state.order, authentication: state.authentication };
}
export default connect(mapStateToProps, { signInGuest, clearMessage, sendOrders })(reduxForm({ form: 'checkoutForm' })(Checkout))

