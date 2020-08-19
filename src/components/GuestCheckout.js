import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux'; 
// import { deleteOrder, clearOrders, clearMessage, sendOrders } from '../actions/orderActions';
import  { textInput } from './widgets/forms/FormFields';
import { required, minLength2, maxLength15, alphaNumeric, email } from './widgets/forms/FormValidation';

class GuestCheckout extends React.Component {
    onSubmit = (formValues) => {
        console.log(formValues);
    }

    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <fieldset>
                    <legend><h2>Guest Checkout</h2></legend>
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
                    <div class="field">
                        <Field
                            name="email"
                            component={textInput}
                            label="Email"
                            placeholder="Email"
                            validate={[required, email]}
                        />
                    </div>
                    <button type="submit" className="ui primary button">Checkout</button>
                </fieldset>
            </form>
        );
        
    }
}
// initial values for the form using map state to props
// const mapStateToProps = (state) => {
//     return { orders: state.orders };
// }
// export default connect(mapStateToProps, { sendOrders })(reduxForm({ form: 'checkoutForm', validate })(GuestCheckout))

export default reduxForm({ form: 'checkoutForm' })(GuestCheckout);

