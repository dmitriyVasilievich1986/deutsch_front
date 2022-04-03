import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../../reducers/mainReducer'
import axios from 'axios'
import React from 'react'

function WortDescription() {
    const dispatch = useDispatch()
    const currentWort = useSelector(state => state.main.currentWort)
    const [translate, setTranslate] = React.useState(currentWort.translate)
    const [deutschWort, setDeutschWort] = React.useState(currentWort.wort)
    const group = useSelector(state => state.main.group)
    const wort = useSelector(state => state.main.wort)
    const [id, setID] = React.useState(currentWort.id)
    const [groupID, setGroupID] = React.useState(currentWort.id)

    React.useEffect(_ => {
        setTranslate(currentWort.translate)
        setDeutschWort(currentWort.wort)
        setGroupID(currentWort.group)
        setID(currentWort.id)
    }, [currentWort])

    const saveWort = _ => {
        const newWort = {
            translate: translate,
            wort: deutschWort,
            group: groupID,
        }
        axios.patch(`/api/wort/${id}/`, newWort)
            .then(data => {
                const d = data.data
                const wl = wort.map(w => w.id == d.id ? d : w)
                dispatch(setState({ wort: wl, currentWort: d }))
            })
            .catch(e => {
                console.log(e)
            })
    }

    const saveNewWort = _ => {
        const newWort = {
            translate: translate,
            wort: deutschWort,
            group: groupID,
            theme: null,
        }
        axios.post(`/api/wort/`, newWort)
            .then(data => {
                const d = data.data
                const wl = [d, ...wort]
                dispatch(setState({ wort: wl, currentWort: d }))
            })
            .catch(e => {
                console.log(e)
            })
    }
    const deleteWort = _ => {
        axios.delete(`/api/wort/${id}/`)
            .then(_ => {
                const wl = wort.filter(w => w.id != id)
                const d = wl?.[0] || null
                dispatch(setState({ wort: wl, currentWort: d }))
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div style={{ flex: "3 400px" }}>
            <div>
                <div>ID: {id}</div>
                <div>Значение: <input type="text" value={deutschWort} onChange={e => setDeutschWort(e.target.value)} /></div>
                <div>Перевод: <input type="text" value={translate} onChange={e => setTranslate(e.target.value)} /></div>
            </div>
            <div style={{ margin: "1rem 0", width: "150px" }}>
                {group.map(g => {
                    let color = "white"
                    if (g.id == currentWort.group) {
                        color = "green"
                    } else if (g.id == groupID) {
                        color = "red"
                    }
                    return (
                        <div
                            style={{ backgroundColor: color, cursor: "pointer" }}
                            onClick={_ => setGroupID(g.id)}
                            key={g.id}
                        >
                            {g.name}
                        </div>
                    )
                })}
            </div>
            <button onClick={_ => saveWort()}>Save</button>
            <button onClick={_ => saveNewWort()}>New</button>
            <button onClick={_ => deleteWort()}>Delete</button>
        </div>
    )
}

export default WortDescription