import React from 'react';
import './GlobalMessage.css';

class GlobalMessage extends React.Component {
    state = {
        isDisconnected: false
    }

    componentDidMount() {
        this.handleConnectionChange();
        window.addEventListener('online', this.handleConnectionChange);
        window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.handleConnectionChange);
        window.removeEventListener('offline', this.handleConnectionChange);
    }


    handleConnectionChange = () => {
        const condition = navigator.onLine ? 'online' : 'offline';
        if (condition === 'online') {
            const webPing = setInterval(
                () => {
                    fetch('//google.com', {
                        mode: 'no-cors',
                    })
                        .then(() => {
                            this.setState({ isDisconnected: false }, () => {
                                return clearInterval(webPing)
                            });
                        }).catch(() => this.setState({ isDisconnected: true }))
                }, 2000);
            return;
        }

        return this.setState({ isDisconnected: true });
    }
    render() {
        const { isDisconnected } = this.state;
        return <div>{ isDisconnected && (
            <div id="globalMessage" class="ui fixed inverted menu">You're currently offline. Products and prices may not be up to date.</div>
        )}</div>
    }
}
export default GlobalMessage;