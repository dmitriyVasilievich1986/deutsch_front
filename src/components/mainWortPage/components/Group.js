import { setSelected, initialSelected } from '../../../reducers/mainReducer'
import { useSelector, useDispatch } from 'react-redux'
import className from 'classnames'
import React from 'react'

function Group() {
    const selected = useSelector(state => state.main.selected)
    const group = useSelector(state => state.main.group)
    const listRef = React.useRef(null)
    const dispatch = useDispatch()

    const [groupList, setGroupList] = React.useState([initialSelected, ...group])
    const [value, setValue] = React.useState(selected.name)
    const [show, setShow] = React.useState(false)

    const onChangeHandler = e => {
        const v = e.target.value
        if (v == "") {
            setGroupList([initialSelected, ...group])
        } else {
            const newList = group.filter(g => g.name.toLocaleLowerCase().includes(v))
            setGroupList([initialSelected, ...newList])
        }
        setValue(v)
    }

    React.useEffect(_ => {
        const clickPoutsideHandler = e => {
            if (listRef.current && !listRef.current.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener("mousedown", clickPoutsideHandler)

        return _ => { document.removeEventListener("mousedown", clickPoutsideHandler) }
    }, [listRef])

    React.useEffect(_ => {
        if (show) {
            setValue("")
            setGroupList([initialSelected, ...group])
            setShow(true)
        } else {
            const newItem = group.filter(g => g.name.toLocaleLowerCase().includes(value))
            if (newItem.length == 1) {
                dispatch(setSelected({ selected: newItem[0] }))
                setValue(newItem[0].name)
            } else {
                setValue(selected.name)
            }
        }
    }, [show])

    return (
        <div className={className('group_list_wrapper')}>
            <input
                onKeyDown={e => { e.code == "Enter" && setShow(false) }}
                className={className("input")}
                onFocus={_ => setShow(true)}
                onChange={onChangeHandler}
                placeholder='Group name'
                value={value}
                type="text"
            />
            <div className={className("group_list", { show })} ref={listRef}>
                {groupList.map(g => (
                    <div
                        onClick={_ => {
                            dispatch(setSelected({ selected: g }))
                            setShow(false)
                        }}
                        className={className("group_item")}
                        key={g.id}
                    >
                        {g.name}
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Group