import React from 'react';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';

import './css/Login.css';

function Login() {

    const signIn = e => {
        auth.signInWithPopup(provider)
        .catch(err => alert(err.message));
    }

    return (
        <div className='login'>
            <h2>Login page</h2>

            <div className='login__logo'>
                <img src='https://www.sie.com/tachyon/sites/15/2021/05/SIE-Blog_Featured-Image_Discord.jpg?resize=1088%2C612&crop_strategy=smart&zoom=1.5' alt='' />
            </div>

            <Button onClick={ signIn }>Sign In</Button>
        </div>
    )
}

export default Login
