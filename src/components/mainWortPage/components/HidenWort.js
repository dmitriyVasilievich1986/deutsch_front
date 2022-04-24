import React from 'react'

function HidenWort(props) {
    const [show, setShow] = React.useState(false)

    const translate = _ => {
        if (!props.wort) return null
        if (show) {
            return <p>{props.wort}</p>
        } else {
            return <p>{Array(5).fill("*").join("")}</p>
        }
    }

    return (
        <div
            style={{
                textAlign: "start",
                cursor: "default",
                minWidth: "150px",
                padding: "0 1rem",
                width: "contain",
            }}
            onMouseLeave={_ => setShow(false)}
            onMouseEnter={_ => setShow(true)}
        >
            {translate()}
        </div>
    )
}

export default HidenWort