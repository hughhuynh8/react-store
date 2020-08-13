import React from 'react';
import './ErrorPage.css';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';

export default function ErrorPage() {
    const className = 'error-page';

    useEffect(
        () => {
            // Set up
            document.body.classList.add(className);

            // Clean up
            return () => {
                document.body.classList.remove(className);
            };
        }
    );

    return (
        <div className="ui text container error-page">
            <h1 className="ui inverted header">
                404 page not found
            </h1>
            <h2 className="ui inverted header">This is not the page you're looking for.</h2>
            <Link className="ui huge inverted primary button" to="/">Go to homepage <i className="angle right icon"></i></Link>
        </div>
    );
}