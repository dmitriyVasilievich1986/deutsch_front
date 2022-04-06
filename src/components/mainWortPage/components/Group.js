import { setSelected, initialSelected, setWort } from '../../../reducers/mainReducer'
import { useSelector, useDispatch } from 'react-redux'
import className from 'classnames'
import React from 'react'
import axios from 'axios'

function Group() {
    const selected = useSelector(state => state.main.selected)
    const group = useSelector(state => state.main.group)
    const wort = useSelector(state => state.main.wort)
    const groupList = [initialSelected, ...group]
    const dispatch = useDispatch()

    return (
        <div className='m2'>
            <p>Groups:</p>
            <div className='list_wrapper m2'>
                {groupList.map((g, i) => (
                    <div
                        className={className("wort", { active: g.id == selected.id })}
                        onClick={_ => dispatch(setSelected({ selected: g }))}
                        key={i}
                    >
                        {g.name}
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default Group