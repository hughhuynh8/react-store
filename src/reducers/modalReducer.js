import { SELECT_MODAL, CLOSE_MODAL } from '../actions/types';

export default (state = {selectedModal: null}, action) => { 
      switch( action.type ) {
            case SELECT_MODAL:
                  return {...state, selectedModal: action.payload.selectedModal };
            case CLOSE_MODAL:
                  return {...state, selectedModal: action.payload.selectedModal };
            default:
                  return state;
      }
};