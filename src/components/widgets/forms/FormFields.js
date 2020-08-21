import React from 'react';
import './FormFields.css';

function renderError({ error, touched }) {
    if(touched && error) {
        return <div className="error message">{error}</div>;
    }
    return null;
}

// Number Input with increment and decrement buttons
export const quantityWithButtonsInput = (fieldProps) => {
    const { input, label, meta } = fieldProps;
    const className = `ui left floated quantity menu ${meta.error && meta.touched ? 'error': ''}`;

    return (
        <div className={className}>
            <button className="icon item" data-content="add" onClick={() => input.onChange(input.value - 1)} type="button">
                <i className="minus icon"></i>
            </button>
            <label htmlFor={input.name} className="sr-only">{label}</label>
            <input id={input.name} {...input} autoComplete="off" type="number" className="item" />
            
            {renderError(meta)}
            <button className="icon item" data-content="subtract" onClick={() => input.onChange(input.value + 1)} type="button">
                <i className="plus icon"></i>
            </button>
        </div>
    );
}

export const textInput = (fieldProps) => {
    const { input, label, meta } = fieldProps;
    const className = `field ${meta.error && meta.touched ? 'error': ''}`;

    return (
        <div className={className}>
            <label htmlFor={input.name}>{label}</label>
            <input id={input.name} {...input} type="text" />
            
            {renderError(meta)}
        </div>
    );
}