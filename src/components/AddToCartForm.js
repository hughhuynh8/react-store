import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import './AddToCartForm.css';

const QUANTITY_SETTINGS = {
    quantityDefaultValue: 1,
    quantityMin: 1,
    quantityMax: 100
};

class AddToCartForm extends React.Component {
    

    componentWillMount () {
        this.props.initialize({ quantity: QUANTITY_SETTINGS.quantityDefaultValue });
    }

    renderError ({ error, touched }) {
        if(touched && error) {
            return <div className="ui error message"><div className="header">{error}</div></div>;
        }
        return null;
    }

    // Number Input with increment and decrement buttons
    renderNumberInput = (fieldProps) => {
        const { input, label, meta } = fieldProps;
        const className = `ui left floated quantity menu ${meta.error && meta.touched ? 'error': ''}`;

        return (
            <div className={className}>
                <button className="icon item" data-content="add" onClick={(e) => this.changeStuff(e)} type="button">
                    <i className="minus icon"></i>
                </button>
                <label htmlFor={input.name} className="sr-only">{label}</label>
                <input id={input.name} {...input} autoComplete="off" type="number" className="item" />
                
                {this.renderError(meta)}
                <button className="icon item" data-content="subtract" type="button">
                    <i className="plus icon"></i>
                </button>
            </div>
        );
    }

    changeStuff = (e) => {
        console.log('changing stuff', e);
        this.props.dispatch(change("addToCartForm", "quantity", 20));
    };

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
                        component={this.renderNumberInput}
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


export default reduxForm({ form: 'addToCartForm', validate })(AddToCartForm);

