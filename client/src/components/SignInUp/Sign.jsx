import React, { useState } from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    tabs: {
        margin: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center'
      },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(2, 0, 2),
    },
    buttonStyle: {
        background: '#7ED3D6',
        '&:hover': {
            background: "#53b7bb",
          },
        margin: '16px 15px 0px 15px',
        width: '150px',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '30px'
      }
  }));



const Sign = (props) => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [isSignUp, setIsSignUp] = useState(false);
    const classes = useStyles();

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
                <div className={classes.tabs}>
                    <Button className={classes.buttonStyle} type="submit" color="primary" onClick={handleSignIn}>
                        Sign In
                    </Button>
                    <Button className={classes.buttonStyle} type="submit" color="primary" onClick={handleSignUp}>
                        Sign Up
                    </Button>
                </div>
                <SignIn onCancel={props.onCancel} setLoggedIn={props.setLoggedIn} />
            </div>
        );
    }
    else {
        return (
            <div>
                <div className={classes.tabs}>
                    <Button className={classes.buttonStyle} type="submit" color="primary" onClick={handleSignIn}>
                        Sign In
                    </Button>
                    <Button className={classes.buttonStyle} type="submit" color="primary" onClick={handleSignUp}>
                        Sign Up
                    </Button>
                </div>
                <SignUp onCancel={props.onCancel} setLoggedIn={props.setLoggedIn} />
            </div>
        );
    }
}

export { Sign };
