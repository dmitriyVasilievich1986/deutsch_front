import React from 'react'

function CopyClipboard(props) {
    return (
        <img
            onClick={_ => navigator.clipboard.writeText(props.wort)}
            style={{ cursor: "pointer", margin: "0 1rem" }}
            src='/static/i/copy.png'
            height="15px"
            width="15px"
        />
    )
}

export default CopyClipboard