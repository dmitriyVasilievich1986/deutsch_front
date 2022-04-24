import { setState } from '../../../reducers/mainReducer'
import { useSelector, useDispatch } from 'react-redux'
import className from 'classnames'
import Select from '../../Select'
import axios from 'axios'
import React from 'react'

function Delete(props) {
    const [animation, setAnimation] = React.useState(false)
    let timer = React.useRef(null)

    const downHandler = e => {
        setAnimation(true)
        timer.current = setTimeout(_ => {
            setAnimation(false)
            props.deleteHandler()
            timer.current = null
        }, 2400)
    }

    const upHandler = _ => {
        if (timer.current) {
            clearTimeout(timer.current)
            setAnimation(false)
        }
    }

    return (
        <div className={className("test_class", { animation })}>
            <img
                className={className("icon", "mt2")}
                onMouseDown={downHandler}
                src="/static/i/bin.png"
                onMouseUp={upHandler}
            />
        </div>
    )
}

function WortDescription() {
    const dispatch = useDispatch()
    const currentWort = useSelector(state => state.main.currentWort)
    const wortTheme = useSelector(state => state.main.wortTheme)
    const group = useSelector(state => state.main.group)
    const wort = useSelector(state => state.main.wort)

    const [newDescription, setNewDescription] = React.useState("")
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
        setNewDescription(currentWort.description)
        setTranslate(currentWort.translate)
        setDeutschWort(currentWort.wort)
        setGroupID(g)
    }

    const deleteHandler = _ => {
        const currentID = currentWort.id
        axios.delete(`/api/wort/${currentID}/`)
            .then(_ => {
                const newWort = wort.filter(w => w.id != currentID)
                dispatch(setState({
                    wortTheme: wortTheme.filter(wt => wt.wort != currentID),
                    currentWort: newWort[0],
                    wort: newWort,
                }))
            })
            .catch(e => {
                console.log(e)
            })
    }

    if (currentWort.id == 0) return null
    return (
        <div className={className("m2")}>
            <div style={{ maxWidth: "400px" }}>
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
                <div className={className("description_field")}>
                    <div>Group:</div>
                    <div>
                        <Select
                            value={group.filter(g => g.id == currentWort.group)[0]}
                            changeHandler={newGroup => setGroupID(newGroup.id)}
                            groupList={group}
                        />
                    </div>
                </div>
                Description:
                <textarea
                    onChange={e => setNewDescription(e.target.value)}
                    style={{ width: "100%", resize: "none" }}
                    value={newDescription}
                    rows="3"
                />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src="/static/i/eraser.png" onClick={eraserHandler} className={className("icon", "mt2")} />
                <img src="/static/i/save.png" onClick={_ => saveWort()} className={className("icon", "mt2")} />
                <Delete deleteHandler={deleteHandler} />
            </div>

        </div>
    )
}

export default WortDescription