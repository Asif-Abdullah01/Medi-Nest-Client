import React, { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from './../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    //google sign in
    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }


    //register
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //login
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name,photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if(currentUser){
                // get token and store client

                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt',userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                        setLoading(false);
                    }
                })
            }
            else{
                //remove token (if token stored in the client side: local storage, caching, in memory)
                localStorage.removeItem('access-token')
                setLoading(false);
            }
            
        });

        return () => {
            return unSubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;