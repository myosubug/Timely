import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField, Button, DialogContentText
} from '@material-ui/core';

/* var x_button = {
    marginLeft: '10px',
}; */

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },

    entireText: {
        textAlign: 'center',
        maxWidth: '1g'
    }
  }));

export const ConfirmationPage = (props) => {
    const classes = useStyles();
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
        <div className={classes.entireText}>
            <h4>
                {stringTitle}
                {/* <Button size="tiny" onClick={closefunc} color="secondary" variant="contained"><b>x</b></Button> */}
                {/* <button style={x_button} onClick={closefunc}>X</button> */}
            </h4>

            <div>
                <DialogContentText>Are you sure you want to {props.pagetype} this user:</DialogContentText>
                <DialogContentText><b>{props.userselected}</b></DialogContentText>
                {/* <p>Are you sure you want to {props.pagetype} this user:</p>
                <p><b>{props.userselected}</b></p> */}
                <TextField label="admin password" id="passwordField"></TextField>
            </div>
            <br></br>

            <div className ={classes.root}>
                <Button size="small" onClick={openfunc} color="secondary" variant="contained">Confirm</Button>
                <Button size="small" onClick={closefunc} color="primary" variant="contained">Cancel</Button>
                {/* <button style={x_button} onClick={openfunc}>Confirm</button>
                <button style={x_button} onClick={closefunc}>Cancel</button> */}
            </div>
        </div>
    );
}
export default ConfirmationPage;