import { useSelector, useDispatch } from 'react-redux'
import React from 'react'

function Wort() {
    const wort = useSelector(state => state.main.wort)
    const selected = useSelector(state => state.main.selected)
    const [randWort, setRandWort] = React.useState(null)
    const [reverse, setReverse] = React.useState(false)
    const [show, setShow] = React.useState(false)
    const [wortList, setWortList] = React.useState([])

    const randomizer = _ => {
        const w = selected.id == 0 ? wort : wort.filter(x => x.group == selected.id)
        const r = Math.floor(Math.random() * w.length)
        setWortList(w)
        setRandWort(r)
    }

    React.useEffect(_ => {
        randomizer()
    }, [selected])

    const showTranslate = _ => {
        if (randWort === null) return null
        const w = reverse ? wortList[randWort].wort : wortList[randWort].translate
        if (show) {
            return <p>{w}</p>
        } else {
            return <p>{Array(5).fill("*").join("")}</p>
        }
    }

    const showWort = _ => {
        if (randWort === null || !wort.length) return null
        return (
            <div
                onClick={_ => randomizer()}
                style={{ textAlign: "end", cursor: "pointer" }}
            >
                <p>
                    {reverse ? wortList[randWort].translate : wortList[randWort].wort}
                </p>
            </div>
        )
    }

    if (randWort === null || wortList.length === 0) {
        return null
    }
    return (
        <div>
            <p>слов: {wortList.length}</p>
            <div style={{ display: "flex", marginTop: "1rem", justifyContent: "center", alignItems: "center" }}>
                <img
                    height="15px"
                    width="15px"
                    style={{ cursor: "pointer", margin: "0 1rem" }}
                    onClick={_ => navigator.clipboard.writeText(wortList[randWort].wort)}
                    src='/static/i/copy.png'
                />
                {showWort()}
                <img
                    height="30px"
                    width="30px"
                    style={{ cursor: "pointer", margin: "0 1rem" }}
                    onClick={_ => setReverse(!reverse)}
                    src='/static/i/reverse.png'
                />
                <div
                    style={{ border: "1px solid black", minWidth: "150px", textAlign: "center", backgroundColor: "#ccc", width: "contain", padding: "0 1rem" }}
                    onMouseLeave={_ => setShow(false)}
                    onMouseEnter={_ => setShow(true)}
                >
                    {showTranslate()}
                </div>
            </div>
        </div>
    )
}

export default Wort