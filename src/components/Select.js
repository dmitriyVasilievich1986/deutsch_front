import className from 'classnames'
import React from 'react'

function Select(props) {
    const [groupList, setGroupList] = React.useState(props.groupList)
    const [value, setValue] = React.useState(props.value.name)
    const [show, setShow] = React.useState(false)
    const listRef = React.useRef(null)

    React.useEffect(_ => {
        setValue(props.value.name)
    }, [props.value])

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
        let newValue = { name: "" }
        if (show) {
            setGroupList(props.groupList)
        } else {
            const newItem = props.groupList.filter(g => g.name.toLocaleLowerCase().includes(value))
            if (newItem.length == 1) {
                newValue = newItem[0]
                props?.changeHandler && props.changeHandler(newValue)
            } else {
                newValue = props.value
            }
        }
        setValue(newValue.name)
    }, [show])

    const onChangeHandler = e => {
        const v = e.target.value
        if (v == "") {
            setGroupList(props.groupList)
        } else {
            const newList = props.groupList.filter(g => g.name.toLocaleLowerCase().includes(v))
            setGroupList(newList)
        }
        setValue(v)
    }

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
                            setValue(g.name)
                            props?.changeHandler && props.changeHandler(g)
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

export default Select