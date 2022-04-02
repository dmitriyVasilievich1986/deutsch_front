import { setWort } from '../../../reducers/mainReducer'
import { useSelector, useDispatch } from 'react-redux'
import CopyClipboard from './CopyClipboard'
import HidenWort from './HidenWort'
import React from 'react'

function Wort() {
    const currentWort = useSelector(state => state.main.currentWort)
    const [reverse, setReverse] = React.useState(false)
    const dispatch = useDispatch()

    const showWort = _ => {
        return (
            <div
                style={{ textAlign: "end", cursor: "pointer" }}
                onClick={_ => dispatch(setWort())}
            >
                <p>
                    {reverse ? currentWort.translate : currentWort.wort}
                </p>
            </div>
        )
    }

    if (currentWort === null) {
        return null
    }
    return (
        <div>
            <div style={{ display: "flex", marginTop: "1rem", justifyContent: "center", alignItems: "center" }}>
                <CopyClipboard wort={currentWort.wort} />
                {showWort()}
                <img
                    style={{ cursor: "pointer", margin: "0 1rem" }}
                    onClick={_ => setReverse(!reverse)}
                    src='/static/i/reverse.png'
                    height="30px"
                    width="30px"
                />
                <HidenWort wort={reverse ? currentWort.wort : currentWort.translate} />
            </div>
        </div>
    )
}

export default Wort