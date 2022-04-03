import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../../reducers/mainReducer'
import React from 'react'

function WortList() {
    const currentWort = useSelector(state => state.main.currentWort)
    const wort = useSelector(state => state.main.wort)
    const [search, setSearch] = React.useState("")
    const dispatch = useDispatch()

    const searchList = _ => {
        if (search == "" || search == " ") return wort
        const l = wort.filter(w => w.wort.includes(search))
        return l
    }

    if (wort.length === 0 || currentWort === null) return null
    return (
        <div style={{ minWidth: "250px", maxWidth: "400px", border: "1px solid black", maxHeight: "500px", overflowY: "auto", flex: "3 400px" }}>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
            <div style={{ padding: "1rem 0 1rem 10px" }}>
                {searchList().map((w, i) => {
                    const color = w.id == currentWort.id ? "green" : "white"
                    return (
                        <div
                            style={{ cursor: "pointer", padding: "10px 5px", backgroundColor: color }}
                            onClick={_ => { dispatch(setState({ currentWort: w })) }}
                            key={i}
                        >
                            {w.wort}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default WortList