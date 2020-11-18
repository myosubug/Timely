import React, { useState } from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import Button from '@material-ui/core/Button';


const Sign = (props) => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignIn = () => {
        if (!isSignIn && isSignUp) {
            setIsSignIn(true);
            setIsSignUp(false);
        }
    }
    const handleSignUp = () => {
        if (!isSignUp && isSignIn) {
            setIsSignIn(false);
            setIsSignUp(true);
        }
    }

    if (isSignIn) {
        return (
            <div>
            <Button type="submit" color="primary"  onClick={handleSignIn}>
                Sign In
              </Button>
            <Button type="submit" color="primary"  onClick={handleSignUp}>
                Sign Up
            </Button>
            <SignIn onCancel={props.onCancel}/>
            </div>
        );
    }
    else {
        return (
            <div>
            <Button type="submit" color="primary" onClick={handleSignIn}>
                Sign In
              </Button>
            <Button type="submit" color="primary" onClick={handleSignUp}>
                Sign Up
            </Button>
            <SignUp onCancel={props.onCancel}/>
            </div>
        );
    }
}

export { Sign };
