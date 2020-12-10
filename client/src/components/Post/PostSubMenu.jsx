import React from "react";
import PropTypes from 'prop-types';
import {
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
    MenuItem,
    MenuList,
    IconButton,
    makeStyles,
    Tooltip,
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PromotePost from "../AdminPostPopUps/PromotePost";
import AddTime from "../AdminPostPopUps/AddTime";
import SubTime from "../AdminPostPopUps/SubtractTime";
import RemovePost from "../AdminPostPopUps/RemovePost";
import axios from "axios";
import { SERVER_ADDRESS } from "../../AppConfig";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    paper: {
        marginRight: theme.spacing(2)
    },
    menu: {
        zIndex: 1000,
        position: "absolute"
    }
}));

const PostSubMenu = (props) => {

    PostSubMenu.propTypes = {
        id: PropTypes.string.isRequired
    };

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [addTimeOpen, setAddTimeOpen] = React.useState(false);
    const [subTimeOpen, setSubTimeOpen] = React.useState(false);
    const [promotePostOpen, setPromotePostOpen] = React.useState(false);
    const [removePost, setRemovePostOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    // Takes click event and closes the sub-menu
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };


    // Note: we can make these all anonymous functions if we wanted to

    // Sets the state to open the Promote Post Modal 
    const handleOpenPromotePost = () => {
        setPromotePostOpen(true);
    };

    // Sets the state to close the Promote Post Modal  
    // when the user is done
    const handleClosePromotePost = () => {
        setPromotePostOpen(false);
    };

    // This would be the db call to promote the post based on its id
    // This function would be passed in as a prop to the modal
    const handlePromotePost = () => {
        axios.post(SERVER_ADDRESS + "/posts/promote/" + props.id);
    };

    // Sets the state to open the Add Time Modal 
    const handleOpenAddTimePost = () => {
        setAddTimeOpen(true);
    };

    // Sets the state to open the Subtract Time Modal 
    const handleOpenSubTimePost = () => {
        setSubTimeOpen(true);
    };

    // Sets the state to close the Add Time Modal 
    // when the user is done
    const handleCloseAddTimePost = () => {
        setAddTimeOpen(false);
    };

    // Sets the state to close the Add Time Modal 
    // when the user is done
    const handleCloseSubTimePost = () => {
        setSubTimeOpen(false);
    };

    // This would be the db call to add time to the post based its id
    // This function would be passed in as a prop to the modal
    const handleAddTime = (time) => {
        axios.post(SERVER_ADDRESS + "/posts/time/add", { "id": props.id, "time": time })
    };

    // This would be the db call to add time to the post based its id
    // This function would be passed in as a prop to the modal
    const handleSubtractTime = (time) => {
        axios.post(SERVER_ADDRESS + "/posts/time/subtract", { "id": props.id, "time": time })
    };

    // Sets the state to open the Remove Post Modal
    const handleOpenRemovePost = () => {
        setRemovePostOpen(true);
    };

    // Sets the state to close the Remove Post Modal 
    // when the user is done
    const handleCloseRemovePost = () => {
        setRemovePostOpen(false);
    };

    // This would be the db call to remove the post based on its id
    // This function would be passed in as a prop to the modal
    const handleRemovePost = () => {
        axios.post(SERVER_ADDRESS + "/posts/delete", { "id": props.id });
    };


    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);


    return (
        <div className={classes.root}>
            <div>
                <Tooltip title="Post Actions">
                    <IconButton
                        className="px-0 py-0 focus:outline-none"
                        ref={anchorRef}
                        aria-controls={open ? "menu-list-grow" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        aria-label="settings"
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Tooltip>

                <Popper
                    className={classes.menu}
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === "bottom" ? "center top" : "center bottom"
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="menu-list-grow"
                                    >
                                        <MenuItem onClick={handleOpenPromotePost}>Promote Post</MenuItem>
                                        <MenuItem onClick={handleOpenAddTimePost}>Add Time</MenuItem>
                                        <MenuItem onClick={handleOpenSubTimePost}>Subtract Time</MenuItem>
                                        <MenuItem onClick={handleOpenRemovePost}>Remove Post</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>

            {/* These will only appear when the state is set to true */}
            {/* PROMOTE POST */}
            <PromotePost
                onConfirm={handlePromotePost}
                isOpen={promotePostOpen}
                onClose={handleClosePromotePost}
            />

            {/* ADD TIME */}
            <AddTime
                onConfirm={(time) => handleAddTime(time)}
                isOpen={addTimeOpen}
                onClose={handleCloseAddTimePost}
            />
            {/* SUBTRACT TIME */}
            <SubTime
                onConfirm={(time) => handleSubtractTime(time)}
                isOpen={subTimeOpen}
                onClose={handleCloseSubTimePost}
            />

            {/* REMOVE POST */}
            <RemovePost
                onConfirm={handleRemovePost}
                isOpen={removePost}
                onClose={handleCloseRemovePost}
            />
        </div>
    );
}

export { PostSubMenu };
