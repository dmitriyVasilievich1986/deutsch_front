import { setState } from '../../../reducers/mainReducer'
import { useSelector, useDispatch } from 'react-redux'
import className from 'classnames'
import Select from '../../Select'
import React from 'react'
import axios from 'axios'


function WortInput(props) {
    const currentWort = useSelector(state => state.main.currentWort)
    const group = useSelector(state => state.main.group)
    const wort = useSelector(state => state.main.wort)
    const dispatch = useDispatch()

    const [newTranslate, setNewTranslate] = React.useState("")
    const [newGroup, setNewGroup] = React.useState(group[0])
    const [newWort, setNewWort] = React.useState("")

    const saveHandler = _ => {
        const data = {
            translate: newTranslate,
            group: newGroup.id,
            wort: newWort,
        }
        setNewTranslate("")
        setNewWort("")
        axios.post(`/api/wort/`, data)
            .then(data => {
                const w = data.data
                dispatch(setState({ wort: [w, ...wort], currentWort: w }))
            })
            .catch(errorHandler)
    }

    const eraserHandler = _ => {
        setNewGroup(group[0])
        setNewTranslate("")
        setNewWort("")
    }

    const errorHandler = e => {
        console.log(e)
    }


    return (
        <div style={{ border: "1px solid black", borderRadius: "10px", padding: "2rem", display: "flex", justifyContent: "center", maxWidth: "400px", flexFlow: "column" }}>
            <div style={{ margin: "0 0 2rem 0", textAlign: "center" }}>Create new word</div>
            <div style={{ width: "100%" }}>
                <div className={className("description_field")}>
                    <div>Word:</div>
                    <div><input className={className("input")} type="text" value={newWort} onChange={e => setNewWort(e.target.value)} /></div>
                </div>
                <div className={className("description_field")}>
                    <div>Translate:</div>
                    <div><input className={className("input")} type="text" value={newTranslate} onChange={e => setNewTranslate(e.target.value)} /></div>
                </div>
                <div className={className("description_field")}>
                    <div>Group:</div>
                    <div>
                        <Select
                            changeHandler={newGroup => setNewGroup(newGroup)}
                            groupList={group}
                            value={newGroup}
                        />
                    </div>
                </div>
                <div style={{ display: "flex", marginTop: "1rem" }}>
                    <img src="/static/i/eraser.png" onClick={eraserHandler} className="icon" />
                    <img src="/static/i/save.png" onClick={saveHandler} className="icon" />
                </div>
            </div>
        </div>
    )
}

export default WortInput