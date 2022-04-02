import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelected, initialSelected } from '../reducers/mainReducer'

function Group() {
    const dispatch = useDispatch()
    const selected = useSelector(state => state.main.selected)
    const wort = useSelector(state => state.main.wort)
    const group = useSelector(state => state.main.group)
    const [groupList, setGroupList] = React.useState([initialSelected])

    React.useEffect(_ => {
        setGroupList([initialSelected, ...group])
    }, [group])

    React.useEffect(_ => {
        if (group.length && wort.length) {
            dispatch(setSelected({ selected: initialSelected }))
        }
    }, [group, wort])

    return (
        <div>
            <select
                style={{ width: "150px", height: "30px", margin: "1rem" }}
                value={selected.id}
                onChange={e => dispatch(setSelected({ selected: groupList.filter(g => g.id == e.target.value)[0] }))}
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
        </div>
    )
}

export default Group