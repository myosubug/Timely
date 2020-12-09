import React, { useState } from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

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
        <div className="flex justify-center">
          <img width="220px" draggable="false" src="https://i.imgur.com/ATuMhih.png" alt="Timely"></img>
        </div>
        <div>
          <SignIn onCancel={props.onCancel} setLoggedIn={props.setLoggedIn}/>
          <div className="flex justify-center pb-5 pt-5">
              <button onClick={handleSignUp}>
                <p className="text-lg">Don't have an account? Click here</p>
              </button>
            </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div>

        <div className="flex justify-center">
          <img width="220px" draggable="false" src="https://i.imgur.com/ATuMhih.png" alt="Timely"></img>
        </div>
        <div>
          <SignUp onCancel={props.onCancel} setLoggedIn={props.setLoggedIn}/>
          <div className="flex justify-center pb-5 pt-5">
              <button onClick={handleSignIn}>
                <p className="text-lg">Already have an account? Click here</p>
              </button>
            </div>
        </div>
      </div>
    );
  }
}

export { Sign };
