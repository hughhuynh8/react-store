import React from 'react';

export default function Loading() {
    return (
        <div className="ui loading">
            <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
            </div>
        </div>
    );
}