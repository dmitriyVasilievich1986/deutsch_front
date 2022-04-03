import { setState, initialWort } from '../../../reducers/mainReducer'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import className from 'classnames'
import axios from 'axios'

function WortInput(props) {
    const group = useSelector(state => state.main.group)
    const wort = useSelector(state => state.main.wort)
    const dispatch = useDispatch()

    const [newGroup, setNewGroup] = React.useState(group?.[0].id || 0)
    const [newTranslate, setNewTranslate] = React.useState("")
    const [newWort, setNewWort] = React.useState("")

    const saveHandler = _ => {
        dispatch(setState({ loading: true }))
        const data = {
            translate: newTranslate,
            group: newGroup,
            wort: newWort,
        }
        axios.post(`/api/wort/`, data)
            .then(data => {
                const w = data.data
                dispatch(setState({ loading: false, wort: [w, ...wort], currentWort: w }))
            })
            .catch(errorHandler)
    }

    const eraserHandler = _ => {
        setNewGroup(group?.[0].id || 0)
        setNewTranslate("")
        setNewWort("")
    }

    const errorHandler = e => {
        dispatch(setState({ loading: false }))
        console.log(e)
    }

    if (group.length == 0) return null
    return (
        <div className={className("m2")}>
            New word:
            <div className={className("input_row")}>
                <input
                    onChange={e => setNewWort(e.target.value)}
                    className={className("input")}
                    placeholder="word"
                    value={newWort}
                    type="text"
                />
                <div className={className("ml1", "mr2")}>/</div>
                <input
                    onChange={e => setNewTranslate(e.target.value)}
                    className={className("input")}
                    placeholder="translate"
                    value={newTranslate}
                    type="text"
                />
                <img src="/static/i/eraser.png" onClick={eraserHandler} className="icon" />
                <img src="/static/i/save.png" onClick={saveHandler} className="icon" />
            </div>
            <div className={className("mt2", "mb2")}>
                {group.map(g => (
                    <div
                        className={className("wort_group", {
                            selected: g.id == newGroup,
                        })}
                        onClick={_ => setNewGroup(g.id)}
                        key={g.id}
                    >
                        {g.name}
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default WortInput