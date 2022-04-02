import { setSelected, initialSelected, setGroup, setWort } from '../../../reducers/mainReducer'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import axios from 'axios'

function Group() {
    const dispatch = useDispatch()
    const selected = useSelector(state => state.main.selected)
    const wort = useSelector(state => state.main.wort)
    const group = useSelector(state => state.main.group)
    const [groupList, setGroupList] = React.useState([initialSelected])

    React.useEffect(_ => {
        axios.get("/api/group/")
            .then(data => {
                const g = data.data
                dispatch(setGroup({ group: g }))
                setGroupList([initialSelected, ...g])
            })
            .catch(e => console.log(e))
    }, [])

    React.useEffect(_ => {
        const path = selected.id == 0 ? "/api/wort/" : `/api/group/${selected.id}/`
        axios.get(path)
            .then(data => {
                const w = selected.id == 0 ? data.data : data.data.wort
                dispatch(setWort({ wort: w }))
            })
            .catch(e => console.log(e))
    }, [selected])

    const wortCount = _ => {
        if (wort.length) {
            return `количество слов: ${wort.length}`
        }
        return null
    }

    const changeHandler = e => {
        const s = groupList.filter(g => g.id == e.target.value)[0]
        dispatch(setSelected({ selected: s }))
    }

    return (
        <div>
            <select
                style={{ width: "150px", height: "30px", margin: "1rem" }}
                onChange={changeHandler}
                value={selected.id}
            >
                {groupList.map((g, i) => (
                    <option
                        value={g.id}
                        key={i}
                    >
                        {g.name}
                    </option>
                ))}
            </select>
            {wortCount()}
        </div>
    )
}

export default Group