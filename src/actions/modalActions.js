import { SELECT_MODAL, CLOSE_MODAL } from './types';

export const selectModal = (selectedModal) => { 
    return {
        type: SELECT_MODAL,
        payload: {selectedModal}
    }
};
export const closeModal = () => { 
    return {
        type: CLOSE_MODAL,
        payload: {selectedModal: null}
    }
};