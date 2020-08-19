import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { quantityWithButtonsInput } from './widgets/forms/FormFields';

import './AddToCartForm.css';

const QUANTITY_SETTINGS = {
    quantityDefaultValue: 1,
    quantityMin: 1,
    quantityMax: 100
};

class AddToCartForm extends React.Component {

    onSubmit = (formValues) => {
        // this.props.createStream(formValues);
        this.props.onSubmitForm(formValues);
    }

    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="actions">
                        
                    <Field
                        name="quantity"
                        component={quantityWithButtonsInput}
                        label="Quantity"
                        normalize={quantityRestrictions}
                    />
                        
                    <button type="submit" className="ui floating primary big button">Add to cart</button>
                </div>
            </form>
        );
        
    }
}

const quantityRestrictions = value => {
    if(value < QUANTITY_SETTINGS.quantityMin) {
      return QUANTITY_SETTINGS.quantityMin
    } else if(value > QUANTITY_SETTINGS.quantityMax) {
      return QUANTITY_SETTINGS.quantityMax
    } else {
      return parseInt(value)
    }
}

const validate = (formValues) => {
    const errors = {};

    if(!formValues.quantity) {
        errors.quantity = 'You must enter a quantity';
    }

    return errors;
}

// initial values for the form
const mapStateToProps = (state) => {
    return {
        initialValues: {
            quantity: QUANTITY_SETTINGS.quantityDefaultValue
        }
    }
}
export default connect(mapStateToProps)(reduxForm({ form: 'addToCartForm', enableReinitialize: true, validate })(AddToCartForm))