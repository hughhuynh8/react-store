import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 

import './Modal.css';

// Modal is a reusable component that shows a modal when selectedModal is given a value
// selectedModal = the name of the modal that is opened from another component
// that other component will need to handle the logic to show <Modal> only when selectedModal === modal name given by other component
class Modal extends React.Component {
    render() {
        let classes = '';
        if(this.props.modal.selectedModal !== null) {
            classes = "visible active";
        }
        return ReactDOM.createPortal(
            <>
                <div className={`ui dimmer screen ${classes}`} onClick={this.props.onDismiss}></div>    {/* create a fake screen dimmer to fix semantic-ui modal scroll issue on mobile */}
                <div className={`ui dimmer modals ${classes}`} onClick={this.props.onDismiss}>
                    <div className={`ui standard modal ${classes}`} onClick={(e) => e.stopPropagation()}>
                        <div className="header">{this.props.title}</div>
                        <div className="content">{this.props.content}</div>
                        <div className="actions">{this.props.actions}</div>
                    </div>
                </div>
            </>,
            document.querySelector('#modal')
        );
    }
 
}

const mapStateToProps = (state) => {
    return { modal: state.modal };
}
export default connect(mapStateToProps)(Modal);
