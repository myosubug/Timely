import React from 'react';
import {
    TextField, 
} from '@material-ui/core';

var x_button = {
    marginLeft: '10px',
};

export const ConfirmationPage = (props) => {
    //https://www.smashingmagazine.com/2020/08/mastering-props-proptypes-react/
    //https://stackoverflow.com/questions/54622005/component-is-declared-but-never-used
    //https://stackoverflow.com/questions/29791721/how-get-data-from-material-ui-textfield-dropdownmenu-components
    //https://subscription.packtpub.com/book/web_development/9781783551620/7/ch07lvl1sec44/creating-the-button-component

    //something useful for passwords maybe?
    //https://itnext.io/building-a-toggled-mask-password-input-component-w-react-and-material-ui-f55e6bd73434

    function closefunc() {
        alert('close');
    }

    function openfunc() {
        alert('confirm');
    }

    var stringTitle;
    if(props.pagetype === "ban"){
        stringTitle = "🚨 ban user 🚨";
    } else if(props.pagetype === "promote"){
        stringTitle = "👑 promote to admin 👑";
    } else if(props.pagetype === "demote"){
        stringTitle = "😱 demote to user 😱";
    } else{
        stringTitle = "not a option";
    }
    return(
        <div >
            <h4>
                {stringTitle}
                <button style={x_button} onClick={closefunc}>X</button>
            </h4>

            <div>
                <p>Are you sure you want to {props.pagetype} this user:</p>
                <p><b>{props.userselected}</b></p>
                <TextField label="enter password" id="passwordField" ></TextField>
            </div>
            <br></br>

            <div>
                <button style={x_button} onClick={openfunc}>Confirm</button>
                <button style={x_button} onClick={closefunc}>Cancel</button>
            </div>
        </div>
    );
}
export default ConfirmationPage;