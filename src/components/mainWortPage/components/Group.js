import { setSelected, initialSelected } from '../../../reducers/mainReducer'
import { useSelector, useDispatch } from 'react-redux'
import className from 'classnames'
import React from 'react'

function Group() {
    const selected = useSelector(state => state.main.selected)
    const group = useSelector(state => state.main.group)
    const groupList = [initialSelected, ...group]
    const dispatch = useDispatch()

    return (
        <div className={className('m2')}>
            <p>Groups:</p>
            <div className={className('list_wrapper', 'long_list', 'm2')}>
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