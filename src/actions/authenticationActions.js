import { SIGN_IN, SIGN_IN_GUEST, SIGN_OUT, SIGN_IN_ERROR, SIGN_OUT_ERROR } from './types';


export const signIn = () => { 
    return async (dispatch, getState, { getFirebase }) => {
        try{
            const firebase = getFirebase();
            var provider = new firebase.auth.GoogleAuthProvider();
            const user = await firebase.auth().signInWithPopup(provider);
            console.log("Login successful");
            dispatch ({
                type: SIGN_IN,
                payload: {isSignedIn: true, userName: user.user.displayName, email: user.user.email}
            })
        }
        catch(err) {
            console.log("Login error", err);
            dispatch ({
                type: SIGN_IN_ERROR,
                payload: {isSignedIn: false, err}
            })
        }
    }
}

// guest user can get his username and email saved but isSignedIn=false
export const signInGuest = (userName, email) => { 
    return {
        type: SIGN_IN_GUEST,
        payload: {isSignedIn: false, userName, email}
    }
}

export const signOut = () => {
    return async (dispatch, getState, { getFirebase }) => {
        try{
            const firebase = getFirebase();
            await firebase.auth().signOut();
            console.log("Logout successful");
            dispatch ({
                type: SIGN_OUT,
                payload: {isSignedIn: false, userName: '', email: ''}
            })
        }
        catch(err) {
            console.log("Logout error", err);
            dispatch ({
                type: SIGN_OUT_ERROR,
                payload: {isSignedIn: false, err}
            })
        }
    }
}