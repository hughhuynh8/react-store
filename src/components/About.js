import React from 'react';
import './About.css';
import reactLogo from '../images/icons/react.png';
import firebaseLogo from '../images/icons/firebase.png';
import devicesImg from '../images/about/devices.png';

export default () => {
    return (
        <div className="about">
            <div className="ui vertical stripe intro segment">
                <div className="ui stackable very relaxed center aligned grid container">
                    <div className="row">
                        <div className="twelve wide column">
                            <img className="ui fluid image" src={devicesImg} alt="responsive devices"/>
                            <h1 className="ui header">Beautiful Responsive Design</h1>
                            <p>Semantic UI is a development framework that helps create beautiful, responsive layouts.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ui stripe community vertical segment">
                <div className="ui two column center aligned divided very relaxed stackable grid container">
                    <div className="row">
                        <div className="column">
                            <h2 className="ui icon header">
                                <img className="ui icon image react" src={reactLogo} alt="React logo"/>
                                React Javascript Framework
                            </h2>
                            <p>Well organised Component based interactive UIs.</p>
                            <a className="ui large button" href="https://reactjs.org/">https://reactjs.org/</a>
                        </div>
                        <div className="column">
                            <h2 className="ui icon header">
                                <img className="ui icon image" src={firebaseLogo} alt="Firebase logo"/>
                                Firebase Cloud Database
                            </h2>
                            <p>Real time database that stores and syncs the app data.</p>
                            <a className="ui large button" href="https://firebase.google.com/">https://firebase.google.com/</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
