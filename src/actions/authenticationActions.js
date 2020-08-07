import { SIGN_IN, SIGN_OUT } from './types';

export const signIn = ({userName, email}) => { 
    return {
        type: SIGN_IN,
        payload: {isSignedIn: true, userName, email}
    }
}

export const signOut = () => { 
    return {
        type: SIGN_OUT,
        payload: {isSignedIn: false, userName: '', email: ''}
    }
}