import React from 'react';
import './GlobalMessage.css';

const GlobalMessage = () => {
    if(!navigator.onLine) {
        return (
            <div id="globalMessage" class="ui fixed inverted menu">You're currently offline. Products and prices may not be up to date.</div>
        );
    }
    return <></>;
}
export default GlobalMessage;