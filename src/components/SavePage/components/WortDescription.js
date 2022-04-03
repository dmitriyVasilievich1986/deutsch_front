import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../../reducers/mainReducer'
import className from 'classnames'
import axios from 'axios'
import React from 'react'

function WortDescription() {
    const dispatch = useDispatch()
    const currentWort = useSelector(state => state.main.currentWort)
    const group = useSelector(state => state.main.group)
    const wort = useSelector(state => state.main.wort)

    const [deutschWort, setDeutschWort] = React.useState("")
    const [translate, setTranslate] = React.useState("")
    const [groupID, setGroupID] = React.useState(0)

    React.useEffect(_ => {
        eraserHandler()
    }, [currentWort])

    const saveWort = _ => {
        if (currentWort.id == 0) return
        const newWort = {
            translate: translate,
            wort: deutschWort,
            group: groupID,
        }
        axios.patch(`/api/wort/${currentWort.id}/`, newWort)
            .then(data => {
                const d = data.data
                const wl = wort.map(w => w.id == d.id ? d : w)
                dispatch(setState({ wort: wl, currentWort: d }))
            })
            .catch(e => {
                console.log(e)
            })
    }

    const eraserHandler = _ => {
        const g = currentWort.group == 0 && group.length > 0 ? group[0].id : currentWort.group
        setTranslate(currentWort.translate)
        setDeutschWort(currentWort.wort)
        setGroupID(g)
    }

    if (currentWort.id == 0) return null
    return (
        <div className={className("m2")}>
            <div>
                <div className={className("description_field")}>
                    <div>ID:</div>
                    <div><input className={className("input")} type="text" value={currentWort.id} disabled /></div>
                </div>
                <div className={className("description_field")}>
                    <div>Word:</div>
                    <div><input className={className("input")} type="text" value={deutschWort} onChange={e => setDeutschWort(e.target.value)} /></div>
                </div>
                <div className={className("description_field")}>
                    <div>Translate:</div>
                    <div><input className={className("input")} type="text" value={translate} onChange={e => setTranslate(e.target.value)} /></div>
                </div>
            </div>
            <div className={className("mt2", "mb2")}>
                {group.map(g => (
                    <div
                        className={className("wort_group", {
                            selected: g.id == currentWort.group,
                            active: g.id == groupID,
                        })}
                        onClick={_ => setGroupID(g.id)}
                        key={g.id}
                    >
                        {g.name}
                    </div>
                )
                )}
            </div>
            <img src="/static/i/eraser.png" onClick={eraserHandler} className={className("icon", "mt2")} />
            <img src="/static/i/save.png" onClick={_ => saveWort()} className={className("icon", "mt2")} />
        </div>
    )
}

export default WortDescription