import { setState, setMessage } from '../../../reducers/mainReducer';
import { useSelector, useDispatch } from 'react-redux';
import DeleteButton from '../../DeleteButton';
import className from 'classnames';
import Select from '../../Select';
import axios from 'axios';
import React from 'react';


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
            description: newDescription,
            translate: translate,
            wort: deutschWort,
            group: groupID,
        }
        axios.patch(`/api/wort/${currentWort.id}/`, newWort)
            .then(data => {
                const d = data.data
                const wl = wort.map(w => w.id == d.id ? d : w)
                dispatch(setState({
                    message: { text: `Word is changed successfuly` },
                    currentWort: d,
                    wort: wl,
                }))
            })
            .catch(e => {
                dispatch(setMessage({ text: "Word was not changed", action: "error" }))
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
                    message: { text: `Word was deleted successfuly` },
                    wortTheme: wortTheme.filter(wt => wt.wort != currentID),
                    currentWort: newWort[0],
                    wort: newWort,
                }))
            })
            .catch(e => {
                dispatch(setMessage({ text: "Word was not deleted", action: "error" }))
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
                <DeleteButton deleteHandler={deleteHandler} />
            </div>

        </div>
    )
}

export default WortDescription