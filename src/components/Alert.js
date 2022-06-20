import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from 'reduxReducers/mainReducer';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react';


function Alert() {
    const message = useSelector(state => state.main.message);
    const dispatch = useDispatch();

    if (message === null) return null
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={_ => dispatch(setMessage(null))}
            autoHideDuration={2000}
            open={true}
        >
            <MuiAlert
                severity={message?.action || "success"}
                variant="filled"
            >
                {message.text}
            </MuiAlert>
        </Snackbar>
    )
}

export default Alert